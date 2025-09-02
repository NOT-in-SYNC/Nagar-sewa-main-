import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Users, CheckCircle, Award, TrendingUp } from "lucide-react";

const milestones = [
  {
    icon: Users,
    label: "Citizens Registered",
    value: "2,847",
    growth: "+324 this month",
    color: "civic-blue"
  },
  {
    icon: CheckCircle,
    label: "Issues Resolved",
    value: "1,923",
    growth: "+156 this week",
    color: "civic-green"
  },
  {
    icon: TrendingUp,
    label: "Reports Submitted",
    value: "3,456",
    growth: "+89 today",
    color: "civic-orange"
  },
  {
    icon: Award,
    label: "Rewards Distributed",
    value: "4,512",
    growth: "+67 this week",
    color: "civic-purple"
  }
];

const leaderboard = [
  { name: "Rajesh Patel", points: 1250, reports: 45, badge: "Community Champion" },
  { name: "Priya Sharma", points: 980, reports: 38, badge: "Civic Hero" },
  { name: "Amit Kumar", points: 875, reports: 32, badge: "Active Reporter" },
  { name: "Sneha Joshi", points: 743, reports: 28, badge: "Community Helper" },
  { name: "Vikram Singh", points: 692, reports: 25, badge: "Civic Volunteer" }
];

const Milestones = () => {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            Community Impact
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Making Vadodara Better Together
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            See the real-time impact of our civic reporting platform across the city
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {milestones.map((milestone, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border border-border/50 p-6 text-center hover:shadow-card transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-${milestone.color}/10 mx-auto mb-4`}>
                <milestone.icon className={`w-8 h-8 text-${milestone.color}`} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{milestone.value}</div>
              <div className="text-sm font-medium text-muted-foreground mb-2">{milestone.label}</div>
              <Badge variant="outline" className={`text-xs bg-${milestone.color}/5 text-${milestone.color} border-${milestone.color}/20`}>
                {milestone.growth}
              </Badge>
            </Card>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Community Leaderboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leaderboard.map((user, index) => (
              <Card 
                key={index}
                className={`bg-gradient-card border border-border/50 p-4 hover:shadow-card transition-all duration-300 ${
                  index === 0 ? 'ring-2 ring-civic-orange/50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-civic-orange text-white' :
                    index === 1 ? 'bg-civic-blue/20 text-civic-blue' :
                    index === 2 ? 'bg-civic-green/20 text-civic-green' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">{user.name}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{user.points} pts</span>
                      <span>•</span>
                      <span>{user.reports} reports</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="mt-2 text-xs">
                  {user.badge}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Milestones;