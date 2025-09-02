import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Milestones from "@/components/Milestones";
import Map from "@/components/Map";
import Rewards from "@/components/Rewards";
import SuccessStories from "@/components/SuccessStories";
import Footer from "@/components/Footer";

const MainApp = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("nagarSevaUser") || "User";

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("nagarSevaAuth");
    localStorage.removeItem("nagarSevaUser");
    
    // Redirect to landing page
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      {/* Custom Header with Logout */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/algozen.png"
                  alt="Algozen Logo"
                  className="w-10 h-10 rounded-lg object-contain"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-civic-green rounded-full animate-glow-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Nagar Seva</h1>
                <p className="text-xs text-muted-foreground">Welcome, {username}</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#rewards" className="text-muted-foreground hover:text-primary transition-colors">
                Rewards
              </a>
              <a href="#success" className="text-muted-foreground hover:text-primary transition-colors">
                Success Stories
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <Hero />
        <Features />
        <div id="milestones">
          <Milestones />
        </div>
        <Map />
        <Rewards />
        <div id="leaderboard">
          <SuccessStories />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainApp;
