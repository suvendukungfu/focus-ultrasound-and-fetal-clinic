import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  WifiOff
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AdminAppointment {
  id: string;
  name: string;
  phone: string;
  service?: string;
  serviceId?: string;
  date: string;
  status: string;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  trend: string;
  color: string;
}

// Demo data used when API is unreachable
const DEMO_APPOINTMENTS: AdminAppointment[] = [
  { id: '1', name: 'Priya Sharma', phone: '+91 98765 43210', service: 'NT Scan', date: '2026-05-05T10:00:00Z', status: 'CONFIRMED' },
  { id: '2', name: 'Anita Verma', phone: '+91 87654 32100', service: 'Anomaly Scan', date: '2026-05-06T11:30:00Z', status: 'PENDING' },
  { id: '3', name: 'Sunita Devi', phone: '+91 76543 21000', service: '3D/4D Ultrasound', date: '2026-05-07T09:00:00Z', status: 'CONFIRMED' },
  { id: '4', name: 'Rekha Gupta', phone: '+91 65432 10001', service: 'Growth Scan', date: '2026-05-07T14:00:00Z', status: 'PENDING' },
  { id: '5', name: 'Meena Kumari', phone: '+91 54321 00012', service: 'Fetal Echo', date: '2026-05-08T10:00:00Z', status: 'CONFIRMED' },
  { id: '6', name: 'Kavita Singh', phone: '+91 43210 00123', service: 'Digital X-Ray', date: '2026-05-09T15:00:00Z', status: 'PENDING' },
  { id: '7', name: 'Rashmi Yadav', phone: '+91 32100 01234', service: 'NT Scan', date: '2026-05-10T11:00:00Z', status: 'CONFIRMED' },
  { id: '8', name: 'Pooja Tiwari', phone: '+91 21000 12345', service: 'Anomaly Scan', date: '2026-05-11T10:30:00Z', status: 'CANCELLED' },
];

const Dashboard = () => {
  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001/api/v1';

  const { data: appointments, isError } = useQuery<AdminAppointment[]>({
    queryKey: ['appointments-stats'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(4000),
      });
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json() as Promise<AdminAppointment[]>;
    },
    retry: 1,
    retryDelay: 1000,
  });

  // Use real data if available, otherwise fall back to demo
  const displayData = appointments && appointments.length > 0 ? appointments : DEMO_APPOINTMENTS;
  const isDemo = !appointments || appointments.length === 0;

  const stats = React.useMemo(() => {
    const total = displayData.length;
    const uniquePatients = new Set(displayData.map((a) => a.phone)).size;
    const confirmed = displayData.filter((a) => a.status === 'CONFIRMED').length;
    const pending = displayData.filter((a) => a.status === 'PENDING').length;
    return { total, uniquePatients, confirmed, pending };
  }, [displayData]);

  const chartData = [
    { name: 'Mon', appointments: 4 },
    { name: 'Tue', appointments: 7 },
    { name: 'Wed', appointments: 5 },
    { name: 'Thu', appointments: 8 },
    { name: 'Fri', appointments: 12 },
    { name: 'Sat', appointments: 9 },
    { name: 'Sun', appointments: 3 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">Clinic Dashboard</h1>
        <p className="text-muted-foreground">Overview of your clinic's performance and appointment flow.</p>
        {isDemo && (
          <Badge variant="secondary" className="mt-3 gap-2 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800">
            <WifiOff className="w-3 h-3" /> Showing demo data — backend is offline
          </Badge>
        )}
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Appointments" value={stats.total} icon={Calendar} trend="+12%" color="bg-blue-500" />
        <StatCard title="Unique Patients" value={stats.uniquePatients} icon={Users} trend="+5%" color="bg-purple-500" />
        <StatCard title="Confirmed" value={stats.confirmed} icon={CheckCircle} trend="+18%" color="bg-green-500" />
        <StatCard title="Pending Review" value={stats.pending} icon={Clock} trend="-2%" color="bg-amber-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-3xl border-border/50 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div>
              <CardTitle className="text-xl font-display font-bold">Appointment Volume</CardTitle>
              <CardDescription>Weekly trend of clinic visits</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span>Upward Trend</span>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] px-6 pb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAppts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '16px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="appointments"
                  stroke="hsl(var(--primary))"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorAppts)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/50 shadow-sm bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-display font-bold">Recent Activity</CardTitle>
            <CardDescription>Latest appointment requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {displayData.slice(0, 5).map((appt) => (
              <div key={appt.id} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  appt.status === 'CONFIRMED' ? 'bg-green-100 text-green-600' :
                  appt.status === 'CANCELLED' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{appt.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{appt.service || appt.serviceId || 'General'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold">{new Date(appt.date).toLocaleDateString()}</p>
                  <p className="text-[10px] text-muted-foreground">{appt.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, color }: StatCardProps) => (
  <Card className="rounded-3xl border-border/50 shadow-sm bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 -mr-8 -mt-8 rounded-full`} />
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} text-white shadow-lg`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">
          <TrendingUp className="w-3 h-3" />
          <span>{trend}</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-display font-bold text-foreground">{value}</h3>
          <span className="text-xs text-muted-foreground font-medium">total</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;
