import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Camera,
  TrendingUp,
  Users,
  Award
} from "lucide-react";
import { reportStorage, CivicReport } from "@/lib/reportStorage";
import { addDemoData } from "@/lib/reportStorage";

const MyReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<CivicReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    byStatus: { reported: 0, 'in-progress': 0, resolved: 0 },
    byType: {} as Record<string, number>,
    recent: 0
  });

  // Load reports and stats
  useEffect(() => {
    const initializeData = async () => {
      await loadReports();
      await loadStats();
      
      // Add demo data if no reports exist
      if (reports.length === 0) {
        try {
          addDemoData();
          setTimeout(async () => {
            await loadReports();
            await loadStats();
          }, 1000);
        } catch (error) {
          console.error('Error adding demo data:', error);
        }
      }
    };
    
    initializeData();
  }, []);

  // Simulate real-time progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      simulateProgressUpdates();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [reports]);

  const loadReports = async () => {
    try {
      const allReports = await reportStorage.getAllReports();
      setReports(allReports);
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statistics = await reportStorage.getStatistics();
      setStats(statistics);
    } catch (error) {
      console.error('Failed to load statistics:', error);
    }
  };

  const simulateProgressUpdates = async () => {
    // Randomly update some reports to simulate real-time progress
    const reportsToUpdate = reports.filter(report => 
      report.status === 'reported' && Math.random() < 0.1 // 10% chance
    );

    for (const report of reportsToUpdate) {
      if (Math.random() < 0.7) {
        await reportStorage.updateReportStatus(report.id, 'in-progress');
      }
    }

    // Update some in-progress reports to resolved
    const inProgressReports = reports.filter(report => 
      report.status === 'in-progress' && Math.random() < 0.15 // 15% chance
    );

    for (const report of inProgressReports) {
      await reportStorage.updateReportStatus(report.id, 'resolved');
    }

    // Reload data after updates
    loadReports();
    loadStats();
  };

  const getStatusColor = (status: CivicReport['status']) => {
    switch (status) {
      case 'reported': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: CivicReport['status']) => {
    switch (status) {
      case 'reported': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <TrendingUp className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getProgressValue = (status: CivicReport['status']) => {
    switch (status) {
      case 'reported': return 25;
      case 'in-progress': return 75;
      case 'resolved': return 100;
      default: return 0;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return formatDate(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-civic-blue mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your reports...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-border/30 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/app')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to App
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">My Reports</h1>
                <p className="text-sm text-muted-foreground">Track your civic engagement progress</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => navigate('/app')}
                className="bg-gradient-civic hover:opacity-90"
              >
                <FileText className="w-4 h-4 mr-2" />
                New Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Reports</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-900">{stats.byStatus.reported}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">In Progress</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.byStatus['in-progress']}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Resolved</p>
                  <p className="text-3xl font-bold text-green-900">{stats.byStatus.resolved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Your Reports</h2>
            <div className="text-sm text-muted-foreground">
              {reports.length} report{reports.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {reports.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Reports Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start making a difference by reporting issues in your community.
                </p>
                <Button
                  onClick={() => navigate('/app')}
                  className="bg-gradient-civic hover:opacity-90"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Create Your First Report
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <CardTitle className="text-lg">{report.issueType}</CardTitle>
                          <Badge className={`${getStatusColor(report.status)} border`}>
                            <span className="flex items-center space-x-1">
                              {getStatusIcon(report.status)}
                              <span className="capitalize">{report.status.replace('-', ' ')}</span>
                            </span>
                          </Badge>
                          <Badge className={`${getSeverityColor(report.severity)} border`}>
                            {report.severity} priority
                          </Badge>
                        </div>
                        <CardDescription className="text-base">
                          {report.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Progress</span>
                        <span className="text-sm text-muted-foreground">{getProgressValue(report.status)}%</span>
                      </div>
                      <Progress 
                        value={getProgressValue(report.status)} 
                        className="h-2"
                      />
                    </div>

                    {/* Report Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate">{report.location.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Submitted {getTimeAgo(report.submittedAt)}</span>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Report ID and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Report ID: <span className="font-mono font-medium">{report.id}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last updated: {getTimeAgo(report.updatedAt)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Community Impact */}
        <Card className="mt-8 bg-gradient-to-r from-civic-blue/5 to-civic-green/5 border-civic-blue/20">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Users className="w-6 h-6 text-civic-blue" />
                <h3 className="text-lg font-semibold text-foreground">Community Impact</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Your reports are making a real difference in your community. 
                Keep up the great work!
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-civic-orange" />
                  <span className="text-muted-foreground">Community Contributor</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-civic-green" />
                  <span className="text-muted-foreground">Active Citizen</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyReports;
