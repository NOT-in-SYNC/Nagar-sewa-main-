import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Thermometer, Eye, EyeOff } from "lucide-react";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Demo data for Vadodara
const vadodaraReports = [
  { id: 1, lat: 22.3072, lng: 73.1812, type: 'pothole', status: 'reported', description: 'Large pothole on RC Dutt Road', severity: 'high' },
  { id: 2, lat: 22.2957, lng: 73.2084, type: 'garbage', status: 'in-progress', description: 'Garbage accumulation near Alkapuri', severity: 'medium' },
  { id: 3, lat: 22.3178, lng: 73.1896, type: 'streetlight', status: 'resolved', description: 'Broken streetlight on Sayajigunj', severity: 'low' },
  { id: 4, lat: 22.2869, lng: 73.1812, type: 'water', status: 'reported', description: 'Water leakage on Fatehgunj Road', severity: 'high' },
  { id: 5, lat: 22.3325, lng: 73.1754, type: 'pothole', status: 'reported', description: 'Multiple potholes on Harni Road', severity: 'high' },
  { id: 6, lat: 22.2756, lng: 73.1954, type: 'garbage', status: 'in-progress', description: 'Overflowing bins at Mandvi', severity: 'medium' },
  { id: 7, lat: 22.3145, lng: 73.1693, type: 'streetlight', status: 'resolved', description: 'Faulty streetlight near Pratap Gunj', severity: 'low' },
  { id: 8, lat: 22.2987, lng: 73.2123, type: 'water', status: 'reported', description: 'Burst water pipe at Karelibaug', severity: 'high' },
];

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const heatmapRef = useRef<L.LayerGroup | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map centered on Vadodara
    map.current = L.map(mapRef.current).setView([22.3072, 73.1812], 12);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Initialize marker layer
    markersRef.current = L.layerGroup().addTo(map.current);
    heatmapRef.current = L.layerGroup();

    // Add markers
    vadodaraReports.forEach(report => {
      const color = 
        report.status === 'resolved' ? '#059669' :
        report.status === 'in-progress' ? '#D97706' : '#DC2626';
      
      const icon = L.divIcon({
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        className: 'custom-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([report.lat, report.lng], { icon })
        .bindPopup(`
          <div class="p-2">
            <h4 class="font-semibold text-sm">${report.type.charAt(0).toUpperCase() + report.type.slice(1)} Issue</h4>
            <p class="text-xs text-gray-600 mt-1">${report.description}</p>
            <div class="mt-2 flex items-center space-x-2">
              <span class="px-2 py-1 text-xs rounded" style="background-color: ${color}20; color: ${color};">
                ${report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </span>
              <span class="text-xs text-gray-500">Severity: ${report.severity}</span>
            </div>
          </div>
        `)
        .on('click', () => setSelectedReport(report));

      markersRef.current?.addLayer(marker);
    });

    // Create heatmap circles for demo
    vadodaraReports.forEach(report => {
      const intensity = report.severity === 'high' ? 0.8 : report.severity === 'medium' ? 0.5 : 0.3;
      const radius = report.severity === 'high' ? 500 : report.severity === 'medium' ? 300 : 200;
      
      const circle = L.circle([report.lat, report.lng], {
        color: '#DC2626',
        fillColor: '#DC2626',
        fillOpacity: intensity * 0.3,
        radius: radius,
        weight: 2
      });

      heatmapRef.current?.addLayer(circle);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const toggleHeatmap = () => {
    if (!map.current || !heatmapRef.current) return;
    
    if (showHeatmap) {
      map.current.removeLayer(heatmapRef.current);
    } else {
      map.current.addLayer(heatmapRef.current);
    }
    setShowHeatmap(!showHeatmap);
  };

  const getStatusStats = () => {
    const stats = vadodaraReports.reduce((acc, report) => {
      acc[report.status] = (acc[report.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return stats;
  };

  const stats = getStatusStats();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            <MapPin className="w-4 h-4 mr-2" />
            Live Map
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Vadodara Issues Map
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Real-time visualization of civic issues across Vadodara city
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-card border border-border/50 p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{stats.reported || 0}</div>
            <div className="text-sm text-muted-foreground">New Reports</div>
          </Card>
          <Card className="bg-gradient-card border border-border/50 p-4 text-center">
            <div className="text-2xl font-bold text-civic-orange">{stats['in-progress'] || 0}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </Card>
          <Card className="bg-gradient-card border border-border/50 p-4 text-center">
            <div className="text-2xl font-bold text-civic-green">{stats.resolved || 0}</div>
            <div className="text-sm text-muted-foreground">Resolved</div>
          </Card>
        </div>

        {/* Map Container */}
        <div className="relative">
          <div className="absolute top-4 right-4 z-[1000] space-y-2">
            <Button
              onClick={toggleHeatmap}
              variant={showHeatmap ? "default" : "outline"}
              size="sm"
              className="bg-background/90 backdrop-blur-sm"
            >
              {showHeatmap ? <EyeOff className="w-4 h-4 mr-2" /> : <Thermometer className="w-4 h-4 mr-2" />}
              {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
            </Button>
          </div>
          
          <div 
            ref={mapRef} 
            className="w-full h-[600px] rounded-2xl border border-border/50 shadow-card"
          />
          
          <div className="absolute bottom-4 left-4 z-[1000] bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border/50">
            <div className="text-xs font-medium text-foreground mb-2">Legend:</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <span className="text-muted-foreground">New Issues</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-civic-orange rounded-full"></div>
                <span className="text-muted-foreground">In Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-civic-green rounded-full"></div>
                <span className="text-muted-foreground">Resolved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Report Details */}
        {selectedReport && (
          <Card className="mt-8 bg-gradient-card border border-border/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Selected Report Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium text-foreground capitalize">{selectedReport.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="outline" className="mt-1">
                  {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
                </Badge>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium text-foreground">{selectedReport.description}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default Map;