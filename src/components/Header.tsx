import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield, Users, Award } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  
  return (
    <header className="sticky top-0 w-full z-40 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="/algozen.png"
                alt="NagarSewa Logo"
                className="w-10 h-10 rounded-lg object-contain bg-transparent"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-civic-orange rounded-full animate-glow-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">NagarSewa</h1>
              <p className="text-xs text-muted-foreground">सेवा • समुदाय • सुधार</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-civic-blue transition-colors">
              Features
            </a>
            <a href="#rewards" className="text-muted-foreground hover:text-civic-blue transition-colors">
              Rewards
            </a>
            <a href="#success" className="text-muted-foreground hover:text-civic-blue transition-colors">
              Success Stories
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign In to NagarSewa</DialogTitle>
                </DialogHeader>
                <div className="p-4 text-center">
                  <p className="text-muted-foreground mb-4">Choose your sign-in method:</p>
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-civic">Sign in with Aadhaar</Button>
                    <Button variant="outline" className="w-full">Sign in with Mobile</Button>
                    <Button variant="outline" className="w-full">Sign in with Email</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-gradient-civic hover:opacity-90 transition-opacity text-white"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
