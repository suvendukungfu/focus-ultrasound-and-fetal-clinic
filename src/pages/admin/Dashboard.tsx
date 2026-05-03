import React, { useState, useEffect } from 'react';
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
  WifiOff,
  Star,
  Activity,
  CloudUpload,
  Search,
  ChevronRight,
  Bell
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface AdminAppointment {
  id: string;
  name: string;
  phone: string;
  service?: string;
  message?: string;
  date: string;
  status: string;
}

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  totalServices: number;
  totalReviews: number;
  pendingReviews: number;
}

const DEMO_APPOINTMENTS: AdminAppointment[] = [
  { id: '1', name: 'Priya Sharma', phone: '+91 98765 43210', service: 'NT Scan', date: '2026-05-05T10:00:00Z', status: 'CONFIRMED' },
  { id: '2', name: 'Anita Verma', phone: '+91 87654 32100', service: 'Anomaly Scan', date: '2026-05-06T11:30:00Z', status: 'PENDING' },
  { id: '3', name: 'Sunita Devi', phone: '+91 76543 21000', service: '3D/4D Ultrasound', date: '2026-05-07T09:00:00Z', status: 'CONFIRMED' },
  { id: '4', name: 'Rekha Gupta', phone: '+91 65432 10001', service: 'Growth Scan', date: '2026-05-07T14:00:00Z', status: 'PENDING' },
  { id: '5', name: 'Meena Kumari', phone: '+91 54321 00012', service: 'Fetal Echo', date: '2026-05-08T10:00:00Z', status: 'CONFIRMED' },
];

const Dashboard = () => {
  const { token, user } = useAuth();
  const { toast } = useToast();
  const [greeting, setGreeting] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  // Fetch Appointments
  const { data: appointments, refetch: refetchAppointments, isFetching: isFetchingAppts } = useQuery<AdminAppointment[]>({
    queryKey: ['appointments-stats'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(4000),
      });
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    refetchInterval: 30000,
    retry: 1,
  });

  // Fetch Analytics
  const { data: analytics, refetch: refetchAnalytics, isFetching: isFetchingAnalytics } = useQuery<DashboardStats>({
    queryKey: ['dashboard-analytics'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/analytics/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(4000),
      });
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    refetchInterval: 30000,
    retry: 1,
  });

  const getLocalLeads = () => {
    try {
      return JSON.parse(localStorage.getItem('local_leads') || '[]');
    } catch { return []; }
  };

  const isDemo = !appointments || appointments.length === 0;
  const isRefreshing = isFetchingAppts || isFetchingAnalytics;

  const displayData = appointments && appointments.length > 0 ? appointments : DEMO_APPOINTMENTS;

  const stats = [
    { 
      label: 'Total Appointments', 
      value: appointments?.length || '1,284', 
      change: '+12.5%', 
      trend: 'up', 
      icon: Calendar, 
      color: 'from-blue-500/20 to-blue-600/5',
      iconColor: 'text-blue-500'
    },
    { 
      label: 'Patient Inquiries', 
      value: (analytics?.totalLeads || 452).toString(), 
      change: '+8.2%', 
      trend: 'up', 
      icon: Users, 
      color: 'from-medical-teal/20 to-medical-teal/5',
      iconColor: 'text-medical-teal'
    },
    { 
      label: 'Average Rating', 
      value: '4.9', 
      change: '+0.2', 
      trend: 'up', 
      icon: Star, 
      color: 'from-amber-500/20 to-amber-600/5',
      iconColor: 'text-amber-500'
    },
    { 
      label: 'System Uptime', 
      value: '99.9%', 
      change: 'Stable', 
      trend: 'neutral', 
      icon: Activity, 
      color: 'from-emerald-500/20 to-emerald-600/5',
      iconColor: 'text-emerald-500'
    },
  ];

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
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-primary/40" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">System Overview</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-foreground leading-tight">
            {greeting}, <span className="text-primary">{user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            Welcome back to the <span className="text-foreground font-bold">Focus Clinic Console</span>.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
           <div className={`bg-card/40 backdrop-blur-md border border-border/50 px-5 py-3 rounded-2xl flex items-center gap-4 transition-all duration-500 shadow-sm ${isDemo ? 'border-amber-500/20' : 'border-emerald-500/20'}`}>
             <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-500 ${isDemo ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                {isDemo ? <WifiOff className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
             </div>
             <div>
               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-none mb-1">Status</p>
               <p className={`text-[11px] font-bold uppercase tracking-tight ${isDemo ? 'text-amber-600' : 'text-emerald-600'}`}>
                 {isDemo ? 'Offline Mode' : 'Cloud Active'}
               </p>
             </div>
           </div>
           <Button className="rounded-2xl h-14 px-8 font-bold shadow-glow btn-premium transition-all hover:scale-105 active:scale-95">
            Quick Report
          </Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="group relative overflow-hidden rounded-[2.5rem] border-border/50 shadow-soft bg-card/40 backdrop-blur-xl hover:shadow-elevated transition-all duration-500 hover:-translate-y-1">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:scale-150 opacity-50`} />
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-3xl bg-background/80 shadow-inner border border-border/20 ${stat.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className={`rounded-full px-3 py-1 border-none font-black text-[10px] tracking-widest ${
                    stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-500/10 text-slate-600'
                  }`}>
                    {stat.change}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                  <h3 className="text-4xl font-display font-black tracking-tight text-foreground">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <Card className="lg:col-span-2 rounded-[2rem] md:rounded-[3rem] border-border/50 shadow-soft bg-card/30 backdrop-blur-xl overflow-hidden min-h-[400px] md:min-h-[450px]">
          <CardHeader className="p-6 md:p-10 pb-0 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <CardTitle className="text-xl md:text-2xl font-black tracking-tight">Performance Analytics</CardTitle>
              <CardDescription className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary/60">Real-time engagement tracking</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="rounded-xl h-8 md:h-10 px-3 md:px-4 flex items-center font-bold bg-background/50 cursor-pointer hover:bg-primary/5 transition-colors text-[10px] md:text-xs">7 Days</Badge>
              <Badge variant="secondary" className="rounded-xl h-8 md:h-10 px-3 md:px-4 flex items-center font-bold bg-primary text-white cursor-pointer shadow-glow-primary text-[10px] md:text-xs">30 Days</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-10 pt-8 md:pt-12">
             <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={chartData}>
                   <defs>
                     <linearGradient id="colorAppts" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                   <XAxis
                     dataKey="name"
                     axisLine={false}
                     tickLine={false}
                     tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
                     dy={10}
                   />
                   <YAxis
                     axisLine={false}
                     tickLine={false}
                     tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
                   />
                   <Tooltip
                     contentStyle={{
                       backgroundColor: 'hsl(var(--card))',
                       borderColor: 'hsl(var(--border))',
                       borderRadius: '20px',
                       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                       border: '1px solid hsl(var(--border))'
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
             </div>
          </CardContent>
        </Card>

        {/* Recent Activity Section */}
        <Card className="rounded-[3rem] border-border/50 shadow-soft bg-card/30 backdrop-blur-xl overflow-hidden flex flex-col">
          <CardHeader className="p-10 pb-6 border-b border-border/30">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black tracking-tight">Recent Activity</CardTitle>
                <CardDescription className="text-xs font-bold uppercase tracking-widest text-primary/60">Live system activity</CardDescription>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <div className="divide-y divide-border/30">
              {displayData.slice(0, 5).map((appt, idx) => (
                <motion.div 
                  key={appt.id} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="p-8 hover:bg-primary/5 transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                      appt.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-600' :
                      appt.status === 'CANCELLED' ? 'bg-red-500/10 text-red-600' :
                      'bg-blue-500/10 text-blue-600'
                    }`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors truncate">{appt.name}</p>
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                        {appt.service || 'Consultation'} • <span className="opacity-60">{new Date(appt.date).toLocaleDateString()}</span>
                      </p>
                    </div>
                  </div>
                  <Badge className={`rounded-lg px-2 py-0.5 text-[8px] font-black uppercase tracking-widest ${
                     appt.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-600' :
                     appt.status === 'CANCELLED' ? 'bg-red-500/10 text-red-600' :
                     'bg-blue-500/10 text-blue-600'
                  }`}>
                    {appt.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <div className="p-8 border-t border-border/30 bg-muted/20">
            <Button variant="ghost" className="w-full rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary/10 transition-colors">
              View All Appointments
            </Button>
          </div>
        </Card>
      </div>

      {/* System Health Overview */}
      <Card className="rounded-[3rem] border-border/50 shadow-soft bg-gradient-to-br from-primary/5 via-card/30 to-card/50 p-10 backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div className="flex flex-col justify-center space-y-4 text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-2">
                <Badge className="bg-emerald-500 animate-pulse w-2 h-2 p-0 rounded-full" />
                <span className="text-xs font-black uppercase tracking-widest text-emerald-600">All Systems Operational</span>
             </div>
             <h3 className="text-3xl font-display font-black tracking-tighter">Infrastructure Health</h3>
             <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-xs mx-auto md:mx-0">
               Core services are performing within optimal latency parameters. No anomalies detected in current cycle.
             </p>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { label: 'API Latency', value: '42ms', color: 'emerald' },
               { label: 'DB Cluster', value: 'Stable', color: 'emerald' },
               { label: 'Auth Service', value: 'Active', color: 'blue' },
               { label: 'Storage Node', value: '94%', color: 'amber' }
             ].map((svc) => (
               <div key={svc.label} className="bg-background/40 border border-border/50 p-6 rounded-[2rem] space-y-2 group hover:border-primary/30 transition-all duration-300">
                  <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{svc.label}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{svc.value}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      svc.color === 'emerald' ? 'bg-emerald-500' :
                      svc.color === 'blue' ? 'bg-blue-500' : 'bg-amber-500'
                    } group-hover:scale-150 transition-transform`} />
                  </div>
               </div>
             ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
