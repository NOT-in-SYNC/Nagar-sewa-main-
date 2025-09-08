import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Filter,
  RefreshCw
} from "lucide-react";
import { reportStorage, CivicReport, addDemoData } from "@/lib/reportStorage";

const MyReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<CivicReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'reported' | 'in-progress' | 'resolved'>('all');

  useEffect(() => {
    // Initialize demo data if no reports exist
    if (reportStorage.getCount() === 0) {
      addDemoData();
    }
    loadReports();
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(loadReports, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadReports = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      const allReports = await reportStorage.getAllReports();
      setReports(allReports);
      
      // Simulate real-time status updates for demo purposes
      simulateStatusUpdates(allReports);
    } catch (error) {
      console.error('Failed to load reports:', error);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadReports(true);
  };

  const simulateStatusUpdates = async (reports: CivicReport[]) => {
    // Simulate status progression for demo reports
    for (const report of reports) {
      if (report.status === 'reported' && Math.random() < 0.1) {
        // 10% chance to move from reported to in-progress
        await reportStorage.updateReportStatus(report.id, 'in-progress');
      } else if (report.status === 'in-progress' && Math.random() < 0.05) {
        // 5% chance to move from in-progress to resolved
        await reportStorage.updateReportStatus(report.id, 'resolved');
      }
    }
  };

  const getStatusIcon = (status: CivicReport['status']) => {
    switch (status) {
      case 'reported':
        return <FileText className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: CivicReport['status']) => {
    switch (status) {
      case 'reported':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressValue = (status: CivicReport['status']) => {
    switch (status) {
      case 'reported':
        return 25;
      case 'in-progress':
        return 75;
      case 'resolved':
        return 100;
      default:
        return 0;
    }
  };

  const getSeverityColor = (severity: CivicReport['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredReports = reports.filter(report => 
    filter === 'all' || report.status === filter
  );

  const getStatistics = () => {
    const total = reports.length;
    const byStatus = reports.reduce((acc, report) => {
      acc[report.status] = (acc[report.status] || 0) + 1;
      return acc;
    }, {} as Record<CivicReport['status'], number>);

    return { total, byStatus };
  };

  const stats = getStatistics();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-civic-blue/5 via-background to-civic-green/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-civic-blue/5 via-background to-civic-green/5">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Reports</h1>
              <p className="text-muted-foreground">Track the progress of your civic issue reports</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-civic rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reported</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.byStatus.reported || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.byStatus['in-progress'] || 0}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.byStatus.resolved || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'all', label: 'All Reports', count: reports.length },
            { key: 'reported', label: 'Reported', count: stats.byStatus.reported || 0 },
            { key: 'in-progress', label: 'In Progress', count: stats.byStatus['in-progress'] || 0 },
            { key: 'resolved', label: 'Resolved', count: stats.byStatus.resolved || 0 }
          ].map(({ key, label, count }) => (
            <Button
              key={key}
              variant={filter === key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(key as any)}
              className={filter === key ? "bg-gradient-civic" : ""}
            >
              <Filter className="w-4 h-4 mr-2" />
              {label} ({count})
            </Button>
          ))}
        </div>

        {/* Reports List */}
        {filteredReports.length === 0 ? (
          <Card className="bg-gradient-card border-border/50">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Reports Found</h3>
              <p className="text-muted-foreground mb-6">
                {filter === 'all' 
                  ? "You haven't submitted any reports yet. Start by reporting a civic issue!"
                  : `No reports with status "${filter}" found.`
                }
              </p>
              {filter === 'all' && (
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-gradient-civic hover:opacity-90"
                >
                  Report an Issue
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <CardTitle className="text-lg font-semibold text-foreground">
                          {report.issueType}
                        </CardTitle>
                        <Badge className={`${getStatusColor(report.status)} border`}>
                          {getStatusIcon(report.status)}
                          <span className="ml-1 capitalize">{report.status.replace('-', ' ')}</span>
                        </Badge>
                        <Badge className={`${getSeverityColor(report.severity)} border`}>
                          {report.severity} Priority
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{report.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium text-foreground">{getProgressValue(report.status)}%</span>
                        </div>
                        <Progress 
                          value={getProgressValue(report.status)} 
                          className={`h-2 ${
                            report.status === 'resolved' ? '[&>div]:bg-green-500' :
                            report.status === 'in-progress' ? '[&>div]:bg-yellow-500' :
                            '[&>div]:bg-blue-500'
                          }`}
                        />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className={report.status === 'reported' ? 'text-blue-600 font-medium' : ''}>Reported</span>
                          <span className={report.status === 'in-progress' ? 'text-yellow-600 font-medium' : ''}>In Progress</span>
                          <span className={report.status === 'resolved' ? 'text-green-600 font-medium' : ''}>Resolved</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center ml-4">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Separator className="mb-4" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-civic-blue" />
                      <span className="text-muted-foreground">{report.location.address}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-civic-green" />
                      <span className="text-muted-foreground">
                        Submitted: {report.submittedAt.toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-civic-orange" />
                      <span className="text-muted-foreground">
                        Last Updated: {report.updatedAt.toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-civic-purple" />
                      <span className="text-muted-foreground">
                        Report ID: {report.id}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Real-time Update Indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-background/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-civic-green rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Real-time updates enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReports;
