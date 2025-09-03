import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Trophy, 
  Star, 
  Gift, 
  Award, 
  Crown,
  Target,
  Zap,
  Medal,
  Coins
} from "lucide-react";
import { useState } from "react";

const rewardTiers = [
  {
    level: "Community Helper",
    icon: Star,
    points: "0 - 100 points",
    color: "civic-blue",
    benefits: [
      "Digital badge on profile",
      "Monthly newsletter access",
      "Basic reporting features"
    ]
  },
  {
    level: "Civic Champion",
    icon: Medal,
    points: "100 - 500 points",
    color: "civic-green", 
    benefits: [
      "Priority report processing",
      "Exclusive community events",
      "Advanced analytics dashboard",
      "Custom profile themes"
    ]
  },
  {
    level: "City Guardian",
    icon: Trophy,
    points: "500 - 1000 points",
    color: "civic-orange",
    benefits: [
      "Monthly city hall recognition",
      "Direct line to department heads",
      "Beta feature access",
      "Annual appreciation dinner"
    ]
  },
  {
    level: "Urban Legend",
    icon: Crown,
    points: "1000+ points",
    color: "civic-purple",
    benefits: [
      "Lifetime achievement award",
      "Advisory board invitation",
      "Mentorship opportunities",
      "Legacy hall of fame entry"
    ]
  }
];

const pointsSystem = [
  { action: "Photo report submission", points: "10 pts", icon: "📸" },
  { action: "Issue resolution verification", points: "15 pts", icon: "✅" },
  { action: "Community validation", points: "5 pts", icon: "👥" },
  { action: "High-priority issue report", points: "25 pts", icon: "🚨" },
  { action: "Follow-up documentation", points: "8 pts", icon: "📝" },
  { action: "Monthly consistency bonus", points: "50 pts", icon: "🎯" }
];

const Rewards = () => {
  const [selectedTier, setSelectedTier] = useState<any>(null);
  return (
    <section id="rewards" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <Badge variant="notice" className="mb-4 text-sm font-medium">
            🎁 Reward System
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get Recognized for Making a Difference
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Earn points, unlock achievements, and receive real-world recognition for your civic contributions.
          </p>
        </div>

        {/* Points System */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">How You Earn Points</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pointsSystem.map((item, index) => (
              <Card 
                key={index}
                className="bg-gradient-card border border-border/50 p-6 hover:shadow-card transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <Badge variant="outline" className="bg-civic-green/10 text-civic-green border-civic-green/30 font-bold">
                    +{item.points}
                  </Badge>
                </div>
                <p className="text-foreground font-medium">{item.action}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">Recognition Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardTiers.map((tier, index) => (
              <Card 
                key={index}
                className={`relative bg-gradient-card border border-border/50 hover:border-${tier.color}/30 p-6 hover:shadow-elegant transition-all duration-300 animate-scale-in group`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-${tier.color}/10 flex items-center justify-center group-hover:bg-${tier.color}/20 transition-colors`}>
                    <tier.icon className={`w-8 h-8 text-${tier.color}`} />
                  </div>
                  
                  <h4 className="text-lg font-bold text-foreground mb-2">{tier.level}</h4>
                  <Badge variant="outline" className="mb-4 text-xs">
                    {tier.points}
                  </Badge>
                  
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${tier.color}`}></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {index === 3 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-civic text-primary-foreground px-3 py-1 text-xs font-bold shadow-lg">
                      <Crown className="w-3 h-3 mr-1" />
                      ELITE
                    </Badge>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-hero rounded-3xl p-8 max-w-3xl mx-auto border border-border/30">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Zap className="w-8 h-8 text-civic-orange" />
              <h3 className="text-2xl font-bold text-foreground">Ready to Start Earning?</h3>
            </div>
            <p className="text-muted-foreground mb-8">
              Join thousands of citizens making their communities better while earning recognition and rewards.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="bg-gradient-civic hover:opacity-90 transition-opacity px-8 py-4"
                  >
                    <Star className="w-5 h-5 mr-2" />
                    Start Earning Points
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Start Your Journey</DialogTitle>
                  </DialogHeader>
                  <div className="p-4">
                    <p className="text-muted-foreground mb-4">Begin earning points by:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-civic-orange" />
                        <span>Reporting civic issues (+10 points)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-civic-green" />
                        <span>Verifying other reports (+5 points)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-civic-blue" />
                        <span>Following up on resolutions (+15 points)</span>
                      </li>
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90 px-8 py-4"
                onClick={() => document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Gift className="w-5 h-5 mr-2" />
                View Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rewards;
