import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, X, RotateCcw, CheckCircle, AlertCircle, Smartphone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface PhotoCaptureProps {
  issueType: string;
  onPhotoCaptured: (photo: File, issueType: string) => void;
  onClose: () => void;
}

const PhotoCapture = ({ issueType, onPhotoCaptured, onClose }: PhotoCaptureProps) => {
  const { t } = useI18n();
  const [captureMode, setCaptureMode] = useState<'select' | 'camera' | 'preview'>('select');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [isCameraSupported, setIsCameraSupported] = useState(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice || isTouchDevice);
    };
    
    checkMobile();
  }, []);

  // Check if camera is supported
  useEffect(() => {
    const checkCameraSupport = async () => {
      try {
        // Check if getUserMedia is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setIsCameraSupported(false);
          return;
        }

        // Check if there are video input devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some(device => device.kind === 'videoinput');
        setIsCameraSupported(hasCamera);
      } catch (err) {
        setIsCameraSupported(false);
      }
    };
    
    checkCameraSupport();
  }, []);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
        setCaptureMode('preview');
        setError('');
      };
      reader.readAsDataURL(file);
    } else {
      setError(t('photo.error_invalid_image'));
    }
  };

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Check if we're in HTTPS or localhost
      if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        setError(t('photo.error_https_required'));
        setIsLoading(false);
        return;
      }
      
      const constraints = {
        video: {
          facingMode: isMobile ? 'environment' : 'user', // Use back camera on mobile
          width: { ideal: isMobile ? 1280 : 1920 },
          height: { ideal: isMobile ? 720 : 1080 },
          aspectRatio: { ideal: 16/9 }
        }
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().then(() => {
            setCaptureMode('camera');
            setIsLoading(false);
          }).catch((playErr) => {
            console.error('Video play error:', playErr);
            setError(t('photo.error_preview'));
            setIsLoading(false);
          });
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError(t('photo.error_denied'));
        } else if (err.name === 'NotFoundError') {
          setError(t('photo.error_no_camera'));
        } else if (err.name === 'NotReadableError') {
          setError(t('photo.error_in_use'));
        } else {
          setError(t('photo.error_generic'));
        }
      } else {
        setError(t('photo.error_generic'));
      }
      setIsLoading(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context && video.videoWidth > 0 && video.videoHeight > 0) {
        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob with good quality
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `civic-issue-${issueType.toLowerCase()}-${Date.now()}.jpg`, { 
              type: 'image/jpeg' 
            });
            setPhotoFile(file);
            setPhotoPreview(URL.createObjectURL(blob));
            setCaptureMode('preview');
            setError('');
            
            // Stop camera stream
            if (streamRef.current) {
              streamRef.current.getTracks().forEach(track => track.stop());
              streamRef.current = null;
            }
          } else {
            setError(t('photo.error_capture'));
          }
        }, 'image/jpeg', 0.9);
      } else {
        setError(t('photo.error_not_ready'));
      }
    } else {
      setError(t('photo.error_not_available'));
    }
  };

  const retakePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview('');
    setCaptureMode('select');
    setError('');
  };

  const submitReport = () => {
    if (photoFile) {
      onPhotoCaptured(photoFile, issueType);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-background border border-border/50 shadow-elegant">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{t('photo.header_title',)} {issueType}</h2>
              <p className="text-sm text-muted-foreground">{t('photo.header_subtitle')}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Mode Selection */}
          {captureMode === 'select' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {isCameraSupported && (
                  <Button
                    onClick={startCamera}
                    disabled={isLoading}
                    className="h-16 flex-col bg-gradient-civic hover:opacity-90"
                  >
                    <Camera className="w-6 h-6 mb-2" />
                    <span>{isLoading ? t('photo.starting_camera') : t('photo.take_photo')}</span>
                    {isMobile && (
                      <span className="text-xs opacity-80">{t('photo.back_camera')}</span>
                    )}
                  </Button>
                )}
                
                <Button
                  onClick={openFileDialog}
                  variant="outline"
                  className="h-16 flex-col"
                >
                  <Upload className="w-6 h-6 mb-2" />
                  <span>{t('photo.upload_gallery')}</span>
                  {isMobile && (
                    <span className="text-xs opacity-80">{t('photo.photos_files')}</span>
                  )}
                </Button>
              </div>
              
              {!isCameraSupported && (
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <AlertCircle className="w-4 h-4 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{t('photo.camera_unavailable')}</p>
                </div>
              )}

              {/* Mobile Tips */}
              {isMobile && (
                <div className="text-center p-3 bg-civic-blue/5 border border-civic-blue/20 rounded-lg">
                  <Smartphone className="w-4 h-4 mx-auto mb-2 text-civic-blue" />
                  <p className="text-xs text-civic-blue">{t('photo.tip')}</p>
                </div>
              )}
            </div>
          )}

          {/* Camera Mode */}
          {captureMode === 'camera' && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-64 object-cover"
                  autoPlay
                  playsInline
                  muted
                />
                <div className="absolute inset-0 border-4 border-white/20 rounded-lg pointer-events-none"></div>
                {/* Camera overlay for better UX */}
                <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">{t('photo.live_camera')}</div>
              </div>
              
              <div className="flex justify-center space-x-3">
                <Button
                  onClick={capturePhoto}
                  className="bg-gradient-civic hover:opacity-90"
                  size="lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {t('photo.capture_photo')}
                </Button>
                <Button
                  onClick={retakePhoto}
                  variant="outline"
                  size="lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          )}

          {/* Preview Mode */}
          {captureMode === 'preview' && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Captured photo"
                  className="w-full h-64 object-cover rounded-lg border border-border/50"
                />
                <Badge className="absolute top-2 left-2 bg-civic-green text-white">
                  {issueType}
                </Badge>
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">{t('photo.captured')}</div>
              </div>
              
              <div className="flex justify-center space-x-3">
                <Button
                  onClick={submitReport}
                  className="bg-gradient-civic hover:opacity-90"
                  size="lg"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {t('photo.continue_to_details')}
                </Button>
                <Button
                  onClick={retakePhoto}
                  variant="outline"
                  size="lg"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  {t('photo.retake_photo')}
                </Button>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture={isMobile ? "environment" : undefined}
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {/* Hidden canvas for camera capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </Card>
    </div>
  );
};

export default PhotoCapture;
