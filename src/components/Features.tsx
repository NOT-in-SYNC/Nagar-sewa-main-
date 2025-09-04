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
import { useI18n } from "@/lib/i18n";

const features = [
  {
    icon: Camera,
    titleKey: "features.smart_photo",
    descKey: "features.smart_photo_desc",
    badgeKey: "features.badge_core",
    color: "civic-blue"
  },
  {
    icon: MapPin,
    titleKey: "features.precise_gps",
    descKey: "features.precise_gps_desc",
    badgeKey: "features.badge_essential",
    color: "civic-green"
  },
  {
    icon: Zap,
    titleKey: "features.realtime",
    descKey: "features.realtime_desc",
    badgeKey: "features.badge_fast",
    color: "civic-orange"
  },
  {
    icon: Shield,
    titleKey: "features.verified",
    descKey: "features.verified_desc",
    badgeKey: "features.badge_trusted",
    color: "civic-purple"
  },
  {
    icon: BarChart3,
    titleKey: "features.analytics",
    descKey: "features.analytics_desc",
    badgeKey: "features.badge_insights",
    color: "civic-blue"
  },
  {
    icon: Bell,
    titleKey: "features.status_updates",
    descKey: "features.status_updates_desc",
    badgeKey: "features.badge_updates",
    color: "civic-green"
  },
  {
    icon: Clock,
    titleKey: "features.priority_routing",
    descKey: "features.priority_routing_desc",
    badgeKey: "features.badge_smart",
    color: "civic-orange"
  },
  {
    icon: Users,
    titleKey: "features.community_engagement",
    descKey: "features.community_engagement_desc",
    badgeKey: "features.badge_social",
    color: "civic-purple"
  },
  {
    icon: CheckCircle,
    titleKey: "features.resolution_tracking",
    descKey: "features.resolution_tracking_desc",
    badgeKey: "features.badge_transparent",
    color: "civic-blue"
  }
];

const Features = () => {
  const { t } = useI18n();
  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            {t("features.header_badge")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("features.header_title")}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t("features.header_subtitle")}
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
                      {t(feature.titleKey)}
                    </h3>
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-background/50 border-border/30"
                    >
                      {t(feature.badgeKey)}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-hero rounded-3xl p-8 max-w-2xl mx-auto border border-border/30">
            <h3 className="text-2xl font-bold text-foreground mb-4">{t("features.cta_title")}</h3>
            <p className="text-muted-foreground mb-6">
              {t("features.cta_subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="text-sm text-muted-foreground">
                {t("features.cta_bullets")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
