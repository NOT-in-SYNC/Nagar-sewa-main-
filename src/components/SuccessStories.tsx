import { CheckCircle, Clock, MapPin } from "lucide-react";

const successStories = [
  {
    id: 1,
    title: "Downtown Pothole Repairs",
    description: "15 major potholes fixed on Main Street within 48 hours",
    location: "Downtown District",
    timeframe: "2 days",
    impact: "Improved safety for 2,000+ daily commuters",
    icon: "🛣️"
  },
  {
    id: 2,
    title: "Park Lighting Restoration", 
    description: "Broken streetlights in Central Park restored",
    location: "Central Park Area",
    timeframe: "3 days", 
    impact: "Enhanced evening safety for families",
    icon: "💡"
  },
  {
    id: 3,
    title: "Garbage Collection Optimization",
    description: "Overflowing bins replaced with larger capacity units",
    location: "Residential Zone B",
    timeframe: "1 week",
    impact: "Cleaner streets for 500+ households",
    icon: "🗑️"
  },
  {
    id: 4,
    title: "Sidewalk Accessibility Improvements",
    description: "Cracked sidewalks repaired with accessibility ramps",
    location: "Shopping District",
    timeframe: "5 days",
    impact: "Better accessibility for wheelchair users",
    icon: "♿"
  },
  {
    id: 5,
    title: "Traffic Signal Maintenance",
    description: "Malfunctioning traffic lights at major intersection fixed",
    location: "5th & Oak Street",
    timeframe: "Same day",
    impact: "Restored traffic flow for 10,000+ vehicles daily",
    icon: "🚦"
  },
  {
    id: 6,
    title: "Community Garden Cleanup",
    description: "Illegal dumping site transformed into community space",
    location: "Eastside Neighborhood",
    timeframe: "2 weeks",
    impact: "New green space for 300+ residents",
    icon: "🌱"
  }
];

const SuccessStories = () => {
  return (
    <section id="success" className="py-20 bg-gradient-hero overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Real Impact, Real Results
          </h2>
          <p className="text-xl text-muted-foreground">
            See how citizen reports are making our communities better, one issue at a time
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex animate-scroll-left space-x-6 w-fit">
          {[...successStories, ...successStories].map((story, index) => (
            <div
              key={`${story.id}-${index}`}
              className="flex-shrink-0 w-96 bg-gradient-card backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{story.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {story.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-civic-blue" />
                      <span className="text-muted-foreground">{story.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-civic-orange" />
                      <span className="text-muted-foreground">Resolved in {story.timeframe}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-civic-green" />
                      <span className="text-muted-foreground">{story.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-civic-green bg-civic-green/10 px-3 py-1 rounded-full">
                    ✓ Completed
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Report #CR{story.id.toString().padStart(4, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;