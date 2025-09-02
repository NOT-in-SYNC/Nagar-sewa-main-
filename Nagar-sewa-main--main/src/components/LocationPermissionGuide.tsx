import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertCircle, X, ExternalLink, Smartphone, Monitor } from "lucide-react";

interface LocationPermissionGuideProps {
  onClose: () => void;
  onRetry: () => void;
}

const LocationPermissionGuide = ({ onClose, onRetry }: LocationPermissionGuideProps) => {
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile'>('desktop');

  const browserInstructions = {
    chrome: {
      name: 'Google Chrome',
      steps: [
        'Click the lock/info icon in the address bar',
        'Click "Site settings"',
        'Change "Location" to "Allow"',
        'Refresh the page and try again'
      ]
    },
    firefox: {
      name: 'Mozilla Firefox',
      steps: [
        'Click the shield icon in the address bar',
        'Click "Site permissions"',
        'Change "Access your location" to "Allow"',
        'Refresh the page and try again'
      ]
    },
    edge: {
      name: 'Microsoft Edge',
      steps: [
        'Click the lock icon in the address bar',
        'Click "Site permissions"',
        'Change "Location" to "Allow"',
        'Refresh the page and try again'
      ]
    },
    safari: {
      name: 'Safari',
      steps: [
        'Go to Safari > Preferences > Websites',
        'Click "Location" in the left sidebar',
        'Change the setting for this website to "Allow"',
        'Refresh the page and try again'
      ]
    }
  };

  const mobileInstructions = {
    android: {
      name: 'Android',
      steps: [
        'Go to Settings > Apps > Your Browser',
        'Tap "Permissions"',
        'Enable "Location" permission',
        'Return to the app and try again'
      ]
    },
    ios: {
      name: 'iOS',
      steps: [
        'Go to Settings > Privacy & Security > Location Services',
        'Make sure Location Services is ON',
        'Find your browser and set it to "While Using"',
        'Return to the app and try again'
      ]
    }
  };

  const detectBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
      return 'chrome';
    } else if (userAgent.includes('firefox')) {
      return 'firefox';
    } else if (userAgent.includes('edg')) {
      return 'edge';
    } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      return 'safari';
    }
    
    return 'chrome'; // Default fallback
  };

  const detectMobile = () => {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
  };

  const currentBrowser = detectBrowser();
  const isMobile = detectMobile();

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-background border border-border/50 shadow-elegant max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Enable Location Access</h2>
                <p className="text-sm text-muted-foreground">Follow these steps to enable location permissions</p>
              </div>
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

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-muted/50 rounded-lg p-1">
            <Button
              variant={activeTab === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('desktop')}
              className="flex-1"
            >
              <Monitor className="w-4 h-4 mr-2" />
              Desktop
            </Button>
            <Button
              variant={activeTab === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('mobile')}
              className="flex-1"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </Button>
          </div>

          {/* Desktop Instructions */}
          {activeTab === 'desktop' && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  Detected browser: <strong>{browserInstructions[currentBrowser].name}</strong>
                </p>
                <Badge variant="outline" className="text-xs">
                  {currentBrowser.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-foreground">Steps to enable location:</h3>
                {browserInstructions[currentBrowser].steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm text-foreground">{step}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Alternative Solution:</p>
                    <p>If you still can't enable location, you can use the "Manual" location entry option in the report form.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Instructions */}
          {activeTab === 'mobile' && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  Detected device: <strong>{isMobile ? 'Mobile Device' : 'Desktop Device'}</strong>
                </p>
                <Badge variant="outline" className="text-xs">
                  {isMobile ? 'MOBILE' : 'DESKTOP'}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Android Instructions */}
                <div className="space-y-3">
                  <h3 className="font-medium text-foreground flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Android
                  </h3>
                  {mobileInstructions.android.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-xs text-foreground">{step}</p>
                    </div>
                  ))}
                </div>

                {/* iOS Instructions */}
                <div className="space-y-3">
                  <h3 className="font-medium text-foreground flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    iOS
                  </h3>
                  {mobileInstructions.ios.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-xs text-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-700">
                    <p className="font-medium mb-1">Important:</p>
                    <p>Make sure your device's GPS is enabled and you're in an area with good GPS signal.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-border/50">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              onClick={onRetry}
              className="bg-gradient-civic hover:opacity-90"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>

          {/* Additional Help */}
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Still having issues? Check your browser's help documentation:
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('https://support.google.com/chrome/answer/142065', '_blank')}
                  className="text-xs"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Chrome Help
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open('https://support.mozilla.org/en-US/kb/how-manage-your-camera-and-microphone-permissions', '_blank')}
                  className="text-xs"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Firefox Help
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LocationPermissionGuide;
