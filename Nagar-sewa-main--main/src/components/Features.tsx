import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  MapPin, 
  Zap, 
  Shield, 
  BarChart3, 
  Bell,
  Clock,
  Users,
  CheckCircle
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Smart Photo Capture",
    description: "AI-enhanced photo capture with automatic issue categorization and quality optimization",
    badge: "Core Feature",
    color: "civic-blue"
  },
  {
    icon: MapPin,
    title: "Precise GPS Tracking",
    description: "Millimeter-accurate location tagging ensures reports reach the right departments instantly",
    badge: "Essential",
    color: "civic-green"
  },
  {
    icon: Zap,
    title: "Real-time Processing",
    description: "Issues are routed to relevant authorities within seconds using intelligent categorization",
    badge: "Fast",
    color: "civic-orange"
  },
  {
    icon: Shield,
    title: "Verified Reports",
    description: "Built-in fraud detection and community verification ensure report authenticity",
    badge: "Trusted",
    color: "civic-purple"
  },
  {
    icon: BarChart3,
    title: "Impact Analytics",
    description: "Track your contributions and see community-wide improvements with detailed insights",
    badge: "Insights",
    color: "civic-blue"
  },
  {
    icon: Bell,
    title: "Status Updates",
    description: "Receive notifications when your reports are reviewed, assigned, and resolved",
    badge: "Updates",
    color: "civic-green"
  },
  {
    icon: Clock,
    title: "Priority Routing",
    description: "Emergency issues get fast-tracked while routine reports follow standard workflows",
    badge: "Smart",
    color: "civic-orange"
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Connect with neighbors, validate reports, and collaborate on neighborhood improvements",
    badge: "Social",
    color: "civic-purple"
  },
  {
    icon: CheckCircle,
    title: "Resolution Tracking",
    description: "Follow your report's journey from submission to completion with transparent updates",
    badge: "Transparent",
    color: "civic-blue"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need to Make a Difference
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our platform combines cutting-edge technology with intuitive design to make civic engagement effortless and impactful.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group bg-gradient-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-card p-6 animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${feature.color}/10 group-hover:bg-${feature.color}/20 transition-colors`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-background/50 border-border/30"
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-hero rounded-3xl p-8 max-w-2xl mx-auto border border-border/30">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Community?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of citizens already making a difference with CivicReport.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="text-sm text-muted-foreground">
                ⚡ Free to use • 🔒 Privacy protected • 📱 Works everywhere
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;