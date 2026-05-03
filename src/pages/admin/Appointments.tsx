import React, { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Phone,
  Filter,
  Download,
  WifiOff,
  Calendar as CalendarIcon,
  List,
  MessageSquare,
  Clock,
  RotateCcw,
  Search,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuditLog } from '@/hooks/useAuditLog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';

type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED';

interface AdminAppointment {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  status: AppointmentStatus;
  whatsappStatus: 'SENT' | 'DELIVERED' | 'FAILED' | 'PENDING';
  notes?: string;
}

const DEMO_APPOINTMENTS: AdminAppointment[] = [
  { id: '1', name: 'Priya Sharma', phone: '+91 8287655133', service: 'NT Scan', date: new Date().toISOString(), status: 'CONFIRMED', whatsappStatus: 'DELIVERED' },
  { id: '2', name: 'Anita Verma', phone: '+91 9876543210', service: 'Anomaly Scan', date: new Date(Date.now() + 86400000).toISOString(), status: 'PENDING', whatsappStatus: 'SENT' },
  { id: '3', name: 'Sunita Devi', phone: '+91 8765432100', service: '3D/4D Ultrasound', date: new Date(Date.now() + 172800000).toISOString(), status: 'CONFIRMED', whatsappStatus: 'DELIVERED' },
  { id: '4', name: 'Rekha Gupta', phone: '+91 7654321000', service: 'Growth Scan', date: new Date(Date.now() - 86400000).toISOString(), status: 'COMPLETED', whatsappStatus: 'DELIVERED' },
];

const SCAN_CATEGORIES = [
  'All Scans',
  'NT Scan',
  'Anomaly Scan',
  'Growth Scan',
  '3D/4D Ultrasound',
  'Fetal Echo',
  'Doppler Scan',
  'Level II TIFFA'
];

const STATUS_CONFIG: Record<AppointmentStatus, { label: string, color: string, icon: any }> = {
  PENDING: { label: 'Pending', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20', icon: Clock },
  CONFIRMED: { label: 'Confirmed', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', icon: CheckCircle },
  RESCHEDULED: { label: 'Rescheduled', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20', icon: RotateCcw },
  COMPLETED: { label: 'Completed', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20', icon: CheckCircle },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-500/10 text-red-600 border-red-500/20', icon: XCircle },
};

const Appointments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { logAction } = useAuditLog();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [scanFilter, setScanFilter] = useState<string>('All Scans');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState('list');

  const { data: appointments, isLoading } = useQuery<AdminAppointment[]>({
    queryKey: ['admin-appointments'],
    queryFn: async () => {
      // In real scenario, fetch from API. For now, we use demo + local
      return DEMO_APPOINTMENTS;
    },
    refetchInterval: 10000, // Realtime updates simulation
  });

  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];
    return appointments.filter(appt => {
      const matchesSearch = appt.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            appt.phone.includes(searchTerm);
      const matchesStatus = statusFilter === 'ALL' || appt.status === statusFilter;
      const matchesScan = scanFilter === 'All Scans' || appt.service === scanFilter;
      return matchesSearch && matchesStatus && matchesScan;
    });
  }, [appointments, searchTerm, statusFilter, scanFilter]);

  const handleStatusUpdate = (id: string, newStatus: AppointmentStatus) => {
    logAction({
      userId: user?.id || 'system',
      userName: user?.name || 'System',
      action: `APPOINTMENT_STATUS_${newStatus}`,
      module: 'APPOINTMENTS',
      details: `Changed appointment ${id} status to ${newStatus}`,
      severity: newStatus === 'CANCELLED' ? 'WARNING' : 'INFO'
    });
    
    toast({
      title: "Status Updated",
      description: `Appointment is now ${newStatus.toLowerCase()}.`,
    });
    // In real app, call API
  };

  const sendWhatsApp = (phone: string, name: string) => {
    const text = encodeURIComponent(`Hello ${name}, this is Focus Ultrasound Clinic. We are confirming your appointment.`);
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${text}`, '_blank');
    toast({ title: "WhatsApp Redirect", description: "Opening WhatsApp conversation..." });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-display font-black tracking-tight text-foreground">APPOINTMENTS</h1>
          <div className="flex items-center gap-3">
             <Badge variant="secondary" className="bg-medical-soft text-medical-teal border-medical-teal/20 font-bold px-3">
               {filteredAppointments.length} Total Requests
             </Badge>
             <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-500">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               Live Tracking Active
             </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Tabs value={view} onValueChange={setView} className="bg-muted/30 p-1 rounded-2xl border border-border/50">
            <TabsList className="bg-transparent border-none">
              <TabsTrigger value="list" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-sm px-4">
                <List className="w-4 h-4 mr-2" /> List
              </TabsTrigger>
              <TabsTrigger value="calendar" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-sm px-4">
                <CalendarIcon className="w-4 h-4 mr-2" /> Calendar
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" className="rounded-xl gap-2 border-border/50 hover:bg-primary/5">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name or phone..." 
            className="pl-11 rounded-2xl border-border/50 bg-card/30 backdrop-blur-md h-12 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[160px] rounded-2xl border-border/50 bg-card/30 h-12">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-border/50 shadow-elevated">
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="CONFIRMED">Confirmed</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={scanFilter} onValueChange={setScanFilter}>
            <SelectTrigger className="w-full md:w-[180px] rounded-2xl border-border/50 bg-card/30 h-12">
              <SelectValue placeholder="Scan Type" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-border/50 shadow-elevated">
              {SCAN_CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={view} className="w-full">
        <TabsContent value="list" className="mt-0 outline-none">
          {/* Desktop Table View - Hidden on Mobile */}
          <div className="hidden md:block">
            <Card className="rounded-[2.5rem] border-border/50 shadow-soft overflow-hidden bg-card/30 backdrop-blur-xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow className="hover:bg-transparent border-border/50">
                        <TableHead className="py-5 pl-8">Patient Info</TableHead>
                        <TableHead>Contact / WhatsApp</TableHead>
                        <TableHead>Requested Service</TableHead>
                        <TableHead>Visit Schedule</TableHead>
                        <TableHead>Workflow Status</TableHead>
                        <TableHead className="text-right pr-8">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence mode="popLayout">
                        {filteredAppointments.map((appt, idx) => {
                          const status = STATUS_CONFIG[appt.status];
                          const StatusIcon = status.icon;
                          return (
                            <motion.tr
                              key={appt.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ delay: idx * 0.05 }}
                              className="hover:bg-primary/5 transition-all border-border/50 group"
                            >
                              <TableCell className="py-6 pl-8">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-black shadow-inner border border-white/40 group-hover:scale-110 transition-transform">
                                    {appt.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{appt.name}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">ID: {appt.id}</span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-muted-foreground font-bold">
                                    <Phone className="w-4 h-4" /> {appt.phone}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className={`rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-tighter ${
                                      appt.whatsappStatus === 'DELIVERED' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-50 text-slate-500 border-slate-200'
                                    }`}>
                                      <MessageSquare className="w-3 h-3 mr-1.5" />
                                      WhatsApp {appt.whatsappStatus}
                                    </Badge>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col gap-1">
                                  <span className="font-bold text-slate-800">{appt.service}</span>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Advanced Diagnostic</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col bg-muted/40 p-2 rounded-xl border border-border/50 max-w-[140px]">
                                  <span className="text-sm font-bold text-foreground">{new Date(appt.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mt-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${status.color} group-hover:shadow-sm`}>
                                  <StatusIcon className="w-3 h-3 mr-2" />
                                  {status.label}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right pr-8">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-primary/10 hover:shadow-glow transition-all">
                                      <MoreHorizontal className="w-6 h-6 text-muted-foreground" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-64 rounded-2xl border-border/50 shadow-elevated p-2 backdrop-blur-2xl bg-card/95">
                                    <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground mb-1 ml-2">Workflow Actions</DropdownMenuLabel>
                                    <DropdownMenuItem 
                                      className="rounded-xl gap-3 py-3 cursor-pointer focus:bg-emerald-50 focus:text-emerald-600 font-bold"
                                      onClick={() => handleStatusUpdate(appt.id, 'CONFIRMED')}
                                    >
                                      <CheckCircle className="w-4 h-4" /> Confirm Appointment
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      className="rounded-xl gap-3 py-3 cursor-pointer focus:bg-blue-50 focus:text-blue-600 font-bold"
                                      onClick={() => handleStatusUpdate(appt.id, 'RESCHEDULED')}
                                    >
                                      <RotateCcw className="w-4 h-4" /> Reschedule
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      className="rounded-xl gap-3 py-3 cursor-pointer focus:bg-primary/10 focus:text-primary font-bold"
                                      onClick={() => sendWhatsApp(appt.phone, appt.name)}
                                    >
                                      <MessageSquare className="w-4 h-4" /> Message on WhatsApp
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="my-2 bg-border/50" />
                                    <DropdownMenuItem 
                                      className="rounded-xl gap-3 py-3 cursor-pointer focus:bg-red-50 focus:text-red-600 text-red-500 font-bold"
                                      onClick={() => handleStatusUpdate(appt.id, 'CANCELLED')}
                                    >
                                      <XCircle className="w-4 h-4" /> Cancel Appointment
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </motion.tr>
                          );
                        })}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Card View - Shown on Mobile Only */}
          <div className="md:hidden space-y-4 pb-20">
            <AnimatePresence mode="popLayout">
              {filteredAppointments.map((appt, idx) => {
                const status = STATUS_CONFIG[appt.status];
                const StatusIcon = status.icon;
                return (
                  <motion.div
                    key={appt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="rounded-3xl border-border/50 bg-card/30 backdrop-blur-xl overflow-hidden group shadow-soft">
                      <CardContent className="p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black border border-white/40">
                              {appt.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground">{appt.name}</h3>
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">ID: {appt.id}</p>
                            </div>
                          </div>
                          <Badge className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${status.color}`}>
                            <StatusIcon className="w-3 h-3 mr-1.5" />
                            {status.label}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="bg-muted/30 p-3 rounded-2xl border border-border/50">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Service</p>
                            <p className="text-xs font-bold text-slate-800">{appt.service}</p>
                          </div>
                          <div className="bg-muted/30 p-3 rounded-2xl border border-border/50">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Time</p>
                            <p className="text-xs font-bold text-slate-800">
                              {new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-2">
                           <div className="flex items-center gap-2">
                             <Button 
                              variant="outline" 
                              size="sm" 
                              className="rounded-xl h-10 border-border/50 bg-card/50"
                              onClick={() => sendWhatsApp(appt.phone, appt.name)}
                             >
                               <MessageSquare className="w-4 h-4 mr-2 text-emerald-500" />
                               WhatsApp
                             </Button>
                           </div>
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="rounded-xl h-10 bg-primary/5 px-4 font-bold text-xs uppercase tracking-widest">
                                Actions <MoreHorizontal className="w-4 h-4 ml-2" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-2xl border-border/50 shadow-elevated p-2">
                              <DropdownMenuItem onClick={() => handleStatusUpdate(appt.id, 'CONFIRMED')} className="rounded-xl font-bold gap-3 py-2.5">
                                <CheckCircle className="w-4 h-4 text-emerald-500" /> Confirm
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(appt.id, 'RESCHEDULED')} className="rounded-xl font-bold gap-3 py-2.5">
                                <RotateCcw className="w-4 h-4 text-blue-500" /> Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="my-1 bg-border/50" />
                              <DropdownMenuItem onClick={() => handleStatusUpdate(appt.id, 'CANCELLED')} className="rounded-xl font-bold gap-3 py-2.5 text-red-500">
                                <XCircle className="w-4 h-4" /> Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                           </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-0 outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
            <Card className="lg:col-span-4 rounded-[2.5rem] border-border/50 shadow-soft bg-card/30 backdrop-blur-xl p-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="w-full"
              />
              <div className="mt-8 space-y-4">
                <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2 px-2">
                  <div className="w-2 h-2 rounded-full bg-medical-teal" />
                  Quick Stats
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/40 border border-white/60 p-4 rounded-2xl shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Confirmed</p>
                    <p className="text-2xl font-display font-black text-emerald-600">12</p>
                  </div>
                  <div className="bg-white/40 border border-white/60 p-4 rounded-2xl shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Waitlist</p>
                    <p className="text-2xl font-display font-black text-amber-600">08</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-8 rounded-[2.5rem] border-border/50 shadow-soft bg-card/30 backdrop-blur-xl overflow-hidden">
               <CardHeader className="border-b border-border/50 px-8 py-6 bg-muted/20">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <CardTitle className="text-xl font-bold flex items-center gap-3">
                     Schedule for {selectedDate?.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                   </CardTitle>
                   <Button variant="ghost" size="sm" className="rounded-xl font-bold text-xs uppercase tracking-widest text-primary hover:bg-primary/10">
                     View All Slots <ChevronRight className="w-4 h-4 ml-1" />
                   </Button>
                 </div>
               </CardHeader>
               <CardContent className="p-0">
                  <div className="p-6 sm:p-8 space-y-4">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appt, i) => (
                        <div key={appt.id} className="group relative bg-white/40 hover:bg-white/60 border border-white/60 rounded-3xl p-5 flex flex-col sm:flex-row items-center gap-6 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1">
                          <div className="flex flex-col items-center justify-center bg-medical-soft text-medical-teal w-20 h-20 rounded-2xl shadow-inner border border-medical-teal/10 shrink-0">
                            <span className="text-xl font-black">{new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }).split(':')[0]}</span>
                            <span className="text-[10px] font-black uppercase opacity-60">HRS</span>
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-1">
                              <h5 className="font-black text-lg group-hover:text-primary transition-colors">{appt.name}</h5>
                              <Badge className={`rounded-full text-[9px] uppercase tracking-tighter self-center sm:self-auto ${STATUS_CONFIG[appt.status].color}`}>
                                {appt.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">{appt.service}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 bg-primary/5 hover:bg-primary hover:text-white transition-all shadow-glow hidden sm:flex">
                             <ArrowRight className="w-5 h-5" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
                         <CalendarIcon className="w-16 h-16" />
                         <p className="font-bold">No appointments scheduled for this date.</p>
                      </div>
                    )}
                  </div>
               </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

    </div>
  );
};

export default Appointments;
