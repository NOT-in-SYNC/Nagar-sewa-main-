export interface CivicReport {
  id: string;
  issueType: string;
  description: string;
  photo: File;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  status: 'reported' | 'in-progress' | 'resolved';
  severity: 'low' | 'medium' | 'high';
  submittedAt: Date;
  updatedAt: Date;
}

class ReportStorage {
  private reports: Map<string, CivicReport> = new Map();
  private nextId = 1;

  // Store a new report
  async storeReport(reportData: Omit<CivicReport, 'id' | 'submittedAt' | 'updatedAt'>): Promise<string> {
    const id = `CR${this.nextId.toString().padStart(4, '0')}`;
    const now = new Date();
    
    const report: CivicReport = {
      ...reportData,
      id,
      submittedAt: now,
      updatedAt: now
    };

    this.reports.set(id, report);
    this.nextId++;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return id;
  }

  // Get a report by ID
  async getReport(id: string): Promise<CivicReport | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return this.reports.get(id) || null;
  }

  // Get all reports
  async getAllReports(): Promise<CivicReport[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return Array.from(this.reports.values()).sort((a, b) => 
      b.submittedAt.getTime() - a.submittedAt.getTime()
    );
  }

  // Update report status
  async updateReportStatus(id: string, status: CivicReport['status']): Promise<boolean> {
    const report = this.reports.get(id);
    if (!report) return false;

    report.status = status;
    report.updatedAt = new Date();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return true;
  }

  // Get reports by status
  async getReportsByStatus(status: CivicReport['status']): Promise<CivicReport[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return Array.from(this.reports.values())
      .filter(report => report.status === status)
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  // Get reports by issue type
  async getReportsByType(issueType: string): Promise<CivicReport[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return Array.from(this.reports.values())
      .filter(report => report.issueType.toLowerCase() === issueType.toLowerCase())
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }

  // Get statistics
  async getStatistics(): Promise<{
    total: number;
    byStatus: Record<CivicReport['status'], number>;
    byType: Record<string, number>;
    recent: number; // reports in last 7 days
  }> {
    const reports = Array.from(this.reports.values());
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const byStatus = reports.reduce((acc, report) => {
      acc[report.status] = (acc[report.status] || 0) + 1;
      return acc;
    }, {} as Record<CivicReport['status'], number>);

    const byType = reports.reduce((acc, report) => {
      acc[report.issueType] = (acc[report.issueType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recent = reports.filter(report => report.submittedAt > sevenDaysAgo).length;

    return {
      total: reports.length,
      byStatus,
      byType,
      recent
    };
  }

  // Clear all reports (for demo purposes)
  clearAll(): void {
    this.reports.clear();
    this.nextId = 1;
  }

  // Get demo data count
  getCount(): number {
    return this.reports.size;
  }
}

// Export a singleton instance
export const reportStorage = new ReportStorage();

// Add some demo data for testing
export const addDemoData = () => {
  const demoReports: Omit<CivicReport, 'id' | 'submittedAt' | 'updatedAt'>[] = [
    {
      issueType: 'Pothole',
      description: 'Large pothole on RC Dutt Road causing traffic issues',
      photo: new File([''], 'demo-pothole.jpg', { type: 'image/jpeg' }),
      location: {
        latitude: 22.3072,
        longitude: 73.1812,
        address: 'RC Dutt Road, Vadodara'
      },
      status: 'reported',
      severity: 'high'
    },
    {
      issueType: 'Garbage',
      description: 'Overflowing garbage bins near Alkapuri market',
      photo: new File([''], 'demo-garbage.jpg', { type: 'image/jpeg' }),
      location: {
        latitude: 22.2957,
        longitude: 73.2084,
        address: 'Alkapuri Market, Vadodara'
      },
      status: 'in-progress',
      severity: 'medium'
    },
    {
      issueType: 'Street Light',
      description: 'Broken streetlight on Sayajigunj main road',
      photo: new File([''], 'demo-streetlight.jpg', { type: 'image/jpeg' }),
      location: {
        latitude: 22.3178,
        longitude: 73.1896,
        address: 'Sayajigunj Main Road, Vadodara'
      },
      status: 'resolved',
      severity: 'low'
    }
  ];

  demoReports.forEach(report => {
    reportStorage.storeReport(report);
  });
};
