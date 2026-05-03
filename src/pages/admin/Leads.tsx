import React, { useState } from 'react';
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
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  MoreHorizontal,
  CheckCircle,
  MessageSquare,
  Phone,
  Filter,
  Download,
  WifiOff,
  User,
  Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface AdminLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source: string;
  status: string;
  createdAt: string;
}

const DEMO_LEADS: AdminLead[] = [
  { id: 'l1', name: 'Priya Sharma', phone: '+91 9876543210', email: 'priya@example.com', message: 'Looking for Anomaly scan appointment next week.', source: 'website', status: 'NEW', createdAt: new Date().toISOString() },
  { id: 'l2', name: 'Anita Verma', phone: '+91 8765432100', email: 'anita@example.com', message: 'Do you have slots for 3D/4D ultrasound?', source: 'google_ads', status: 'CONTACTED', createdAt: new Date(Date.now() - 86400000).toISOString() },
];

const Leads = () => {
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

  const [localOverrides, setLocalOverrides] = useState<Record<string, string>>({});

  const { data: leads, isLoading, isError } = useQuery<AdminLead[]>({
    queryKey: ['admin-leads'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/leads`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(4000),
      });
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json() as Promise<AdminLead[]>;
    },
    refetchInterval: 30000, // Live updates every 30 seconds
    retry: 1,
  });

  const getLocalLeads = () => {
    try {
      return JSON.parse(localStorage.getItem('local_leads') || '[]');
    } catch {
      return [];
    }
  };

  const localLeads = getLocalLeads();
  const fallbackLeads = [...localLeads, ...DEMO_LEADS];
  
  const displayData = (leads && leads.length > 0 ? leads : fallbackLeads).map(
    lead => ({ ...lead, status: localOverrides[lead.id] || lead.status })
  );
  const isDemo = !leads || leads.length === 0;

  const handleStatusUpdate = async (id: string, status: string) => {
    if (!isDemo) {
      try {
        const response = await fetch(`${API_URL}/leads/${id}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        });
        if (response.ok) {
          queryClient.invalidateQueries({ queryKey: ['admin-leads'] });
          toast({ title: "Status Updated", description: `Lead marked as ${status.toLowerCase()}.` });
          return;
        }
      } catch { /* fall through */ }
    }

    try {
      const storedLeads = JSON.parse(localStorage.getItem('local_leads') || '[]');
      const updated = storedLeads.map((l: AdminLead) => l.id === id ? { ...l, status } : l);
      localStorage.setItem('local_leads', JSON.stringify(updated));

      if (status === 'BOOKED') {
        const leadToConvert = storedLeads.find((l: AdminLead) => l.id === id) || DEMO_LEADS.find(l => l.id === id);
        if (leadToConvert) {
          const storedAppts = JSON.parse(localStorage.getItem('local_appointments') || '[]');
          if (!storedAppts.find((a: { id: string }) => a.id === `appt-${leadToConvert.id}`)) {
            const newAppt = {
              id: `appt-${leadToConvert.id}`,
              name: leadToConvert.name,
              phone: leadToConvert.phone,
              service: leadToConvert.message && (leadToConvert.message.toLowerCase().includes('scan') || leadToConvert.message.toLowerCase().includes('ultrasound')) ? 'Ultrasound' : 'General Appointment',
              date: new Date(Date.now() + 86400000).toISOString(),
              status: 'CONFIRMED'
            };
            localStorage.setItem('local_appointments', JSON.stringify([newAppt, ...storedAppts]));
          }
        }
      }
    } catch (e) {
      console.error('Failed to update local storage', e);
    }

    setLocalOverrides(prev => ({ ...prev, [id]: status }));
    toast({ title: "Status Updated", description: `Lead marked as ${status.toLowerCase()} (local).` });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tighter text-foreground mb-1">INQUIRY CONSOLE</h1>
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live Lead Management
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="rounded-2xl border-border/50 gap-2 font-bold text-xs uppercase tracking-widest px-6 h-12 shadow-sm bg-card/50 backdrop-blur-sm hover:bg-primary/5 transition-all">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="btn-premium px-6 h-12 shadow-glow">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>
      </header>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <Card className="rounded-[2.5rem] border-border/50 shadow-premium overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground py-6 pl-8">Patient</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Inquiry Details</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Source</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right pr-8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="popLayout">
                    {displayData.map((lead, idx) => (
                      <motion.tr 
                        key={lead.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-muted/20 transition-colors border-border/50 group"
                      >
                        <TableCell className="py-6 pl-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-black shadow-inner border border-white/40 group-hover:scale-110 transition-transform">
                              {lead.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{lead.name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                <Mail className="w-3.5 h-3.5" />
                                {lead.email || 'No email provided'}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                              <Phone className="w-4 h-4 text-primary" />
                              {lead.phone}
                            </div>
                            <p className="text-xs text-muted-foreground max-w-[240px] italic line-clamp-1" title={lead.message}>
                              "{lead.message || 'No specific inquiry message provided.'}"
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] uppercase font-black tracking-widest px-3 py-1 border-primary/20 text-primary bg-primary/5 rounded-full">
                            {lead.source.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            lead.status === 'NEW' ? 'bg-blue-500/10 text-blue-600 border-blue-200 shadow-sm' :
                            lead.status === 'CONTACTED' ? 'bg-amber-500/10 text-amber-600 border-amber-200' :
                            'bg-emerald-500/10 text-emerald-600 border-emerald-200'
                          } border transition-all`}>
                            {lead.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-10 w-10 rounded-2xl text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 hover:shadow-glow transition-all"
                              title="WhatsApp Patient"
                              onClick={() => {
                                const msg = encodeURIComponent(`Hello ${lead.name}, I'm reaching out from Focus Ultrasound regarding your inquiry.`);
                                window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
                              }}
                            >
                              <MessageSquare className="w-5 h-5" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-primary/5">
                                  <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2 border-border/50 shadow-elevated backdrop-blur-xl bg-card/95">
                                <DropdownMenuItem
                                  className="rounded-xl gap-3 py-3 cursor-pointer font-bold focus:bg-amber-50 focus:text-amber-600"
                                  onClick={() => handleStatusUpdate(lead.id, 'CONTACTED')}
                                >
                                  <Phone className="w-4 h-4" /> Mark as Contacted
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="rounded-xl gap-3 py-3 cursor-pointer font-bold focus:bg-emerald-50 focus:text-emerald-600"
                                  onClick={() => handleStatusUpdate(lead.id, 'BOOKED')}
                                >
                                  <CheckCircle className="w-4 h-4" /> Convert to Appointment
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-6 pb-24">
        <AnimatePresence mode="popLayout">
          {displayData.map((lead, idx) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="rounded-[2rem] border-border/50 shadow-soft bg-card/50 backdrop-blur-md overflow-hidden group">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black border border-white/40 shadow-inner">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">{lead.name}</h3>
                        <Badge variant="outline" className="text-[9px] uppercase tracking-tighter px-2 py-0 border-primary/20 text-primary">
                          {lead.source}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      lead.status === 'NEW' ? 'bg-blue-500/10 text-blue-600 border-blue-200' :
                      lead.status === 'CONTACTED' ? 'bg-amber-500/10 text-amber-600 border-amber-200' :
                      'bg-emerald-500/10 text-emerald-600 border-emerald-200'
                    } border`}>
                      {lead.status}
                    </Badge>
                  </div>

                  <div className="space-y-3 bg-muted/30 p-4 rounded-2xl border border-border/50">
                    <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                      <Phone className="w-4 h-4 text-primary" />
                      {lead.phone}
                    </div>
                    <p className="text-xs text-muted-foreground italic line-clamp-2">
                      "{lead.message || 'No inquiry details provided.'}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <Button 
                      variant="outline" 
                      className="rounded-xl flex-1 h-12 border-border/50 bg-card/50 font-bold gap-2 text-emerald-600"
                      onClick={() => {
                        const msg = encodeURIComponent(`Hello ${lead.name}, I'm reaching out from Focus Ultrasound regarding your inquiry.`);
                        window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
                      }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      WhatsApp
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-primary/5">
                          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-border/50 shadow-elevated">
                        <DropdownMenuItem
                          className="rounded-xl gap-3 py-3 font-bold"
                          onClick={() => handleStatusUpdate(lead.id, 'CONTACTED')}
                        >
                          <Phone className="w-4 h-4 text-amber-500" /> Mark Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="rounded-xl gap-3 py-3 font-bold"
                          onClick={() => handleStatusUpdate(lead.id, 'BOOKED')}
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-500" /> Convert to Appt
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Leads;
