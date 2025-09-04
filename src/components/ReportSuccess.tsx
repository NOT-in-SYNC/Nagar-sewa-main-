import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, Clock, Share2, Home, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface ReportSuccessProps {
  issueType: string;
  reportId: string;
  onClose: () => void;
  onNewReport: () => void;
}

const ReportSuccess = ({ issueType, reportId, onClose, onNewReport }: ReportSuccessProps) => {
  const { t } = useI18n();
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('success.share_title',),
          text: t('success.share_text',).replace('{issueType}', issueType),
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(
          `${t('success.share_text').replace('{issueType}', issueType)} ${window.location.href}`
        );
        // You could show a toast notification here
        alert(t('success.link_copied'));
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  const handleViewReport = () => {
    // In a real app, this would navigate to a report detail page
    // For now, we'll just show an alert
    alert(t('success.report_details_placeholder').replace('{reportId}', reportId));
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-background border border-border/50 shadow-elegant">
        <div className="p-6 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-civic-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-civic-green" />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-semibold text-foreground mb-2">{t('success.title')}</h2>
          <p className="text-muted-foreground mb-6">{t('success.subtitle')}</p>

          {/* Report Details */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('success.report_id')}</span>
              <Badge variant="outline" className="font-mono text-xs">
                #{reportId}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('success.issue_type')}</span>
              <Badge className="bg-civic-blue text-white capitalize">
                {issueType}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('success.submitted')}</span>
              <span className="text-sm font-medium">{new Date().toLocaleString()}</span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-civic-green/5 border border-civic-green/20 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-civic-green mb-2">{t('success.next_steps_title')}</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• {t('success.next_step1')}</li>
              <li>• {t('success.next_step2')}</li>
              <li>• {t('success.next_step3')}</li>
              <li>• {t('success.next_step4')}</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={handleViewReport} variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              {t('success.view_details')}
            </Button>
            
            <Button onClick={handleShare} variant="outline" className="w-full">
              <Share2 className="w-4 h-4 mr-2" />
              {t('success.share_with_community')}
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={onNewReport} variant="outline" className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                {t('success.report_another')}
              </Button>
              
              <Button onClick={onClose} className="w-full bg-gradient-civic hover:opacity-90">
                <Home className="w-4 h-4 mr-2" />
                {t('success.back_to_home')}
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-3 bg-civic-blue/5 border border-civic-blue/20 rounded-lg">
            <p className="text-xs text-civic-blue">{t('success.pro_tip')}</p>
          </div>

          <p className="text-xs text-muted-foreground mt-6">{t('success.footer_note')}</p>
        </div>
      </Card>
    </div>
  );
};

export default ReportSuccess;
