import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, Award, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-civic-blue/5 via-background to-civic-green/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-background/80 backdrop-blur-sm border border-border/50 shadow-elegant">
        <div className="p-8 text-center">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-civic rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-2">
              NagarSewa
            </h1>
            <p className="text-xl text-muted-foreground">
              सेवा • समुदाय • सुधार
            </p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Welcome to Nagar Seva, your civic engagement platform for making cities better. 
              Report issues, track progress, and contribute to community improvement.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <MapPin className="w-5 h-5 text-civic-blue" />
                <span className="text-sm text-foreground">Report Issues</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Users className="w-5 h-5 text-civic-green" />
                <span className="text-sm text-foreground">Community Impact</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Award className="w-5 h-5 text-civic-orange" />
                <span className="text-sm text-foreground">Track Progress</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="space-y-4">
            <Button
              onClick={handleContinue}
              size="lg"
              className="bg-gradient-civic hover:opacity-90 transition-opacity px-8 py-4 text-lg font-semibold shadow-elegant"
            >
              Continue
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Join thousands of citizens making real change happen
            </p>
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              Empowering communities through civic engagement and transparent governance
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Landing;
