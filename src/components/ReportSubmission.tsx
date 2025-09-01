import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Camera, Clock, CheckCircle, AlertCircle, Loader2, RefreshCw, MapPinOff, HelpCircle } from "lucide-react";
import { reportStorage, CivicReport } from "@/lib/reportStorage";
import LocationPermissionGuide from "./LocationPermissionGuide";

interface ReportSubmissionProps {
  photo: File;
  issueType: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  source: 'gps' | 'manual' | 'default';
}

const ReportSubmission = ({ photo, issueType, onClose, onSuccess }: ReportSubmissionProps) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [locationError, setLocationError] = useState<string>('');
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [showLocationGuide, setShowLocationGuide] = useState(false);

  useEffect(() => {
    // Create preview URL for the photo
    const previewUrl = URL.createObjectURL(photo);
    setPhotoPreview(previewUrl);

    // Get current location
    getCurrentLocation();

    // Cleanup preview URL on unmount
    return () => URL.revokeObjectURL(previewUrl);
  }, [photo]);

  const getCurrentLocation = async () => {
    setIsLocationLoading(true);
    setLocationError('');
    
    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        setLocationError('Geolocation is not supported by your browser');
        setLocation({
          latitude: 22.3072, // Default to Vadodara coordinates
          longitude: 73.1812,
          address: 'Vadodara, Gujarat (Default Location)',
          source: 'default'
        });
        return;
      }

      // Get current position with timeout
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Location request timed out'));
        }, 15000); // 15 second timeout

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            clearTimeout(timeoutId);
            resolve(pos);
          },
          (err) => {
            clearTimeout(timeoutId);
            reject(err);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          }
        );
      });

      const { latitude, longitude } = position.coords;
      
      // Try to get address from coordinates (reverse geocoding)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        
        if (response.ok) {
          const data = await response.json();
          setLocation({
            latitude,
            longitude,
            address: data.display_name || 'Location captured',
            source: 'gps'
          });
        } else {
          setLocation({
            latitude,
            longitude,
            address: 'Location captured',
            source: 'gps'
          });
        }
      } catch (err) {
        setLocation({
          latitude,
          longitude,
          address: 'Location captured',
          source: 'gps'
        });
      }
    } catch (err) {
      console.warn('Location access failed:', err);
      
      let errorMessage = 'Unable to get your location';
      let defaultLocation: LocationData | null = null;

      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Please try again.';
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage = 'Location access failed. Please try again.';
        }
      } else if (err instanceof Error && err.message === 'Location request timed out') {
        errorMessage = 'Location request timed out. Please try again.';
      }

      setLocationError(errorMessage);
      
      // Set default location to Vadodara
      defaultLocation = {
        latitude: 22.3072,
        longitude: 73.1812,
        address: 'Vadodara, Gujarat (Default Location)',
        source: 'default'
      };
      
      setLocation(defaultLocation);
    } finally {
      setIsLocationLoading(false);
    }
  };

  const handleManualLocationSubmit = () => {
    if (manualAddress.trim()) {
      setLocation({
        latitude: 22.3072, // Default coordinates for manual address
        longitude: 73.1812,
        address: manualAddress.trim(),
        source: 'manual'
      });
      setShowManualLocation(false);
      setLocationError('');
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      setError('Please provide a description of the issue.');
      return;
    }

    if (!location) {
      setError('Please allow location access or provide a manual location.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Create report data
      const reportData = {
        issueType,
        description: description.trim(),
        photo,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address
        },
        status: 'reported' as const,
        severity
      };

      // Store the report
      const reportId = await reportStorage.storeReport(reportData);
      
      // Success - show confirmation
      onSuccess();
    } catch (err) {
      console.error('Failed to submit report:', err);
      setError('Failed to submit report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-civic-orange text-white';
      case 'low': return 'bg-civic-green text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getLocationSourceIcon = (source: string) => {
    switch (source) {
      case 'gps': return <MapPin className="w-4 h-4 text-civic-green" />;
      case 'manual': return <MapPin className="w-4 h-4 text-civic-blue" />;
      case 'default': return <MapPinOff className="w-4 h-4 text-muted-foreground" />;
      default: return <MapPin className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getLocationSourceText = (source: string) => {
    switch (source) {
      case 'gps': return 'GPS Location';
      case 'manual': return 'Manual Entry';
      case 'default': return 'Default Location';
      default: return 'Unknown Source';
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-background border border-border/50 shadow-elegant max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Submit Report</h2>
              <p className="text-muted-foreground">Review and submit your civic issue report</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Photo and Details */}
              <div className="space-y-4">
                {/* Photo Preview */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Issue Photo</Label>
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Issue photo"
                      className="w-full h-48 object-cover rounded-lg border border-border/50"
                    />
                    <Badge className="absolute top-2 left-2 bg-civic-green text-white">
                      {issueType}
                    </Badge>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>Size: {formatFileSize(photo.size)}</span>
                      <span>Type: {photo.type}</span>
                    </div>
                  </div>
                </div>

                {/* Issue Type */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Issue Type</Label>
                  <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                    <Camera className="w-4 h-4 text-civic-blue" />
                    <span className="font-medium capitalize">{issueType}</span>
                  </div>
                </div>

                {/* Severity Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Issue Severity</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['low', 'medium', 'high'] as const).map((sev) => (
                      <Button
                        key={sev}
                        variant={severity === sev ? "default" : "outline"}
                        size="sm"
                        className={severity === sev ? getSeverityColor(sev) : ""}
                        onClick={() => setSeverity(sev)}
                      >
                        {sev.charAt(0).toUpperCase() + sev.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    High severity issues get priority attention
                  </p>
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="space-y-4">
                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-sm font-medium mb-2 block">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail. Include any relevant information like size, impact, or safety concerns..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[100px]"
                    maxLength={500}
                  />
                  <div className="mt-1 text-xs text-muted-foreground text-right">
                    {description.length}/500 characters
                  </div>
                </div>

                {/* Location */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm font-medium">Location</Label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={getCurrentLocation}
                        disabled={isLocationLoading}
                        className="h-6 px-2 text-xs"
                      >
                        <RefreshCw className={`w-3 h-3 mr-1 ${isLocationLoading ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowManualLocation(!showManualLocation)}
                        className="h-6 px-2 text-xs"
                      >
                        Manual
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowLocationGuide(true)}
                        className="h-6 px-2 text-xs"
                      >
                        <HelpCircle className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {isLocationLoading ? (
                    <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Getting location...</span>
                    </div>
                  ) : location ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                        {getLocationSourceIcon(location.source)}
                        <span className="text-sm">{location.address}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <div className="flex items-center justify-between">
                          <span>Coordinates: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</span>
                          <Badge variant="outline" className="text-xs">
                            {getLocationSourceText(location.source)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-lg text-center">
                      <span className="text-sm text-muted-foreground">No location available</span>
                    </div>
                  )}

                  {/* Manual Location Input */}
                  {showManualLocation && (
                    <div className="mt-3 space-y-2">
                      <Input
                        placeholder="Enter address manually..."
                        value={manualAddress}
                        onChange={(e) => setManualAddress(e.target.value)}
                        className="text-sm"
                      />
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={handleManualLocationSubmit}
                          disabled={!manualAddress.trim()}
                          className="flex-1"
                        >
                          Set Location
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowManualLocation(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Location Error Display */}
                  {locationError && (
                    <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <p className="text-xs text-amber-700">{locationError}</p>
                      </div>
                      <div className="mt-2 text-xs text-amber-600">
                        <p><strong>To enable location:</strong></p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>Check browser location permissions</li>
                          <li>Allow location access when prompted</li>
                          <li>Or use manual location entry above</li>
                        </ul>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowLocationGuide(true)}
                          className="mt-2 h-6 px-2 text-xs text-amber-700 hover:text-amber-800"
                        >
                          <HelpCircle className="w-3 h-3 mr-1" />
                          Get Help
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Reported At</Label>
                  <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                    <Clock className="w-4 h-4 text-civic-orange" />
                    <span className="text-sm">{new Date().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-border/50">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !description.trim() || !location}
                className="bg-gradient-civic hover:opacity-90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Report
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Location Permission Guide Modal */}
      {showLocationGuide && (
        <LocationPermissionGuide
          onClose={() => setShowLocationGuide(false)}
          onRetry={getCurrentLocation}
        />
      )}
    </>
  );
};

export default ReportSubmission;
