import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Camera, MapPin, Smartphone, FileText } from "lucide-react";
import heroCityscape from "@/assets/hero-cityscape.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhotoCapture from "./PhotoCapture";
import ReportSubmission from "./ReportSubmission";
import ReportSuccess from "./ReportSuccess";

interface ReportData {
  photo: File;
  issueType: string;
}

const Hero = () => {
  const navigate = useNavigate();
  const [isReportingOpen, setIsReportingOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<'select' | 'photo' | 'submission' | 'success'>('select');
  const [selectedIssueType, setSelectedIssueType] = useState<string>('');
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [reportId, setReportId] = useState<string>('');

  const handleIssueTypeSelect = (issueType: string) => {
    setSelectedIssueType(issueType);
    setCurrentStep('photo');
  };

  const handlePhotoCaptured = (photo: File, issueType: string) => {
    setReportData({ photo, issueType });
    setCurrentStep('submission');
  };

  const handleReportSuccess = () => {
    // Generate a random report ID for demo purposes
    const id = Math.random().toString(36).substr(2, 9).toUpperCase();
    setReportId(id);
    setCurrentStep('success');
  };

  const handleCloseReporting = () => {
    setIsReportingOpen(false);
    setCurrentStep('select');
    setSelectedIssueType('');
    setReportData(null);
    setReportId('');
  };

  const handleNewReport = () => {
    setCurrentStep('select');
    setSelectedIssueType('');
    setReportData(null);
    setReportId('');
  };

  const renderReportingContent = () => {
    switch (currentStep) {
      case 'select':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Report a Civic Issue</DialogTitle>
            </DialogHeader>
            <div className="p-4 space-y-4">
              <p className="text-muted-foreground">Choose your issue type to get started:</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { type: 'Pothole', icon: Camera },
                  { type: 'Garbage', icon: Camera },
                  { type: 'Street Light', icon: Camera },
                  { type: 'Water Issue', icon: Camera }
                ].map((issue, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex-col hover:border-primary/50 hover:bg-primary/5 transition-all"
                    onClick={() => handleIssueTypeSelect(issue.type)}
                  >
                    <issue.icon className="w-6 h-6 mb-2" />
                    <span className="text-sm">{issue.type}</span>
                  </Button>
                ))}
              </div>
            </div>
          </>
        );

      case 'photo':
        return (
          <PhotoCapture
            issueType={selectedIssueType}
            onPhotoCaptured={handlePhotoCaptured}
            onClose={handleCloseReporting}
          />
        );

      case 'submission':
        return reportData ? (
          <ReportSubmission
            photo={reportData.photo}
            issueType={reportData.issueType}
            onClose={handleCloseReporting}
            onSuccess={handleReportSuccess}
          />
        ) : null;

      case 'success':
        return (
          <ReportSuccess
            issueType={reportData?.issueType || ''}
            reportId={reportId}
            onClose={handleCloseReporting}
            onNewReport={handleNewReport}
          />
        );

      default:
        return null;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroCityscape})` }}
      >
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-civic-blue/20 via-transparent to-civic-green/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-civic-green rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">Trusted by 50,000+ citizens nationwide</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Report Issues,
            <br />
            <span className="bg-gradient-civic bg-clip-text text-transparent">
              Transform Cities
            </span>
          </h1>

          {/* Subtitle with better visibility */}
          <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-border/30">
            <p className="text-xl md:text-2xl text-foreground font-medium max-w-3xl mx-auto leading-relaxed">
              Empower your community with instant civic reporting. Snap, report, and watch your city become better, one issue at a time.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Dialog open={isReportingOpen} onOpenChange={setIsReportingOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-gradient-civic hover:opacity-90 transition-opacity px-8 py-4 text-lg font-semibold shadow-elegant"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Start Reporting
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full">
                {renderReportingContent()}
              </DialogContent>
            </Dialog>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90 px-8 py-4 text-lg"
              onClick={() => navigate('/my-reports')}
            >
              <FileText className="w-5 h-5 mr-2" />
              My Reports
            </Button>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Camera,
                title: "Snap & Report",
                description: "Take a photo and instantly report civic issues"
              },
              {
                icon: MapPin,
                title: "Auto-Location",
                description: "GPS automatically tags your exact location"
              },
              {
                icon: Users,
                title: "Community Impact",
                description: "Join thousands making real change happen"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gradient-card backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-card transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-civic rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
