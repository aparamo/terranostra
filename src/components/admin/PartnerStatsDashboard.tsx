'use client';

import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {RefreshCw, Users, TrendingUp, Calendar} from 'lucide-react';
import {partnerTrackingService} from '@/services/partnerTracking';

interface PartnerStats {
  partner: string;
  count: number;
}

interface DashboardStats {
  totalVisitors: number;
  totalClicks: number;
  partnerStats: PartnerStats[];
  recentActivity: Array<{
    id: number;
    visitor: string;
    partner: string;
    timestamp: string;
    action: string;
  }>;
}

export default function PartnerStatsDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = async () => {
    try {
      setLoading(true);

      // Get partner statistics
      const partnerStats = await partnerTrackingService.getPartnerStats();

      // For now, we'll create mock data since we need to implement the full stats API
      const mockStats: DashboardStats = {
        totalVisitors: partnerStats.reduce((acc, stat) => acc + stat.count, 0),
        totalClicks: partnerStats.reduce((acc, stat) => acc + stat.count, 0),
        partnerStats,
        recentActivity: [
          {
            id: 1,
            visitor: 'visitor_abc123...',
            partner: 'caro',
            timestamp: new Date().toISOString(),
            action: 'Partner selection'
          },
          {
            id: 2,
            visitor: 'visitor_def456...',
            partner: 'adri',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            action: 'Partner selection'
          }
        ]
      };

      setStats(mockStats);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-500">No statistics available</div>
    );
  }

  const getPartnerLabel = (partner: string) => {
    switch (partner) {
      case 'caro':
        return 'Caro';
      case 'adri':
        return 'Adri';
      case 'neither':
        return 'General';
      default:
        return partner;
    }
  };

  const getPartnerColor = (partner: string) => {
    switch (partner) {
      case 'caro':
        return 'bg-emerald-500';
      case 'adri':
        return 'bg-cyan-500';
      case 'neither':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard de Socios
        </h2>
        <Button
          onClick={refreshStats}
          disabled={refreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`}
          />
          Actualizar
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Visitantes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisitors}</div>
            <p className="text-xs text-muted-foreground">Visitantes únicos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clics</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClicks}</div>
            <p className="text-xs text-muted-foreground">
              Interacciones totales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Última Actividad
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.recentActivity.length > 0
                ? new Date(
                    stats.recentActivity[0].timestamp
                  ).toLocaleDateString('es-ES')
                : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">Última interacción</p>
          </CardContent>
        </Card>
      </div>

      {/* Partner Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas por Socio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.partnerStats.map((stat) => (
              <div
                key={stat.partner}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${getPartnerColor(stat.partner)}`}
                  ></div>
                  <span className="font-medium">
                    {getPartnerLabel(stat.partner)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{stat.count}</div>
                  <div className="text-sm text-muted-foreground">
                    {((stat.count / stats.totalClicks) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${getPartnerColor(activity.partner)}`}
                  ></div>
                  <div>
                    <div className="font-medium text-sm">
                      {activity.visitor}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getPartnerLabel(activity.partner)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleString('es-ES')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
