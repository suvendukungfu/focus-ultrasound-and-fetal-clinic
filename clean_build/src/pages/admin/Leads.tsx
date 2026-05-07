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
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tighter text-foreground mb-1">INQUIRY CONSOLE</h1>
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Live Lead Management
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl border-border/50 gap-2 font-bold text-xs uppercase tracking-widest px-6 h-12 shadow-sm bg-card/50 backdrop-blur-sm">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="btn-premium px-6">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>
      </header>

      <Card className="rounded-3xl border-border/50 shadow-premium overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="font-bold text-xs uppercase tracking-widest text-muted-foreground py-6 pl-8">Patient</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Inquiry Details</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Source</TableHead>
                  <TableHead className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Status</TableHead>
                  <TableHead className="text-right pr-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-muted/20 transition-colors border-border/50 group">
                    <TableCell className="py-6 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-foreground">{lead.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            {lead.email || 'No email'}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Phone className="w-3.5 h-3.5" />
                        {lead.phone}
                      </div>
                      <p className="text-xs text-muted-foreground max-w-[200px] truncate" title={lead.message}>
                        {lead.message || 'No message'}
                      </p>
                    </div>
                  </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] uppercase font-bold px-2 py-0.5 border-primary/20 text-primary">
                        {lead.source}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        lead.status === 'NEW' ? 'bg-blue-500/10 text-blue-600 border-blue-200' :
                        lead.status === 'CONTACTED' ? 'bg-amber-500/10 text-amber-600 border-amber-200' :
                        'bg-emerald-500/10 text-emerald-600 border-emerald-200'
                      } border`}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
                        title="WhatsApp Patient"
                        onClick={() => {
                          const msg = encodeURIComponent(`Hello ${lead.name}, I'm reaching out from Focus Ultrasound regarding your inquiry.`);
                          window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
                        }}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl p-1 border-border shadow-lg">
                          <DropdownMenuItem
                            className="rounded-lg gap-2 cursor-pointer focus:bg-amber-50 focus:text-amber-600"
                            onClick={() => handleStatusUpdate(lead.id, 'CONTACTED')}
                          >
                            <Phone className="w-4 h-4" />
                            Mark Contacted
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="rounded-lg gap-2 cursor-pointer focus:bg-green-50 focus:text-green-600"
                            onClick={() => handleStatusUpdate(lead.id, 'BOOKED')}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Convert to Appointment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leads;
