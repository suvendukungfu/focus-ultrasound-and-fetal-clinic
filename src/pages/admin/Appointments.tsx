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
  XCircle,
  Phone,
  Filter,
  Download,
  WifiOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface AdminAppointment {
  id: string;
  name: string;
  phone: string;
  service?: { name: string } | string;
  notes?: string;
  message?: string; // for backward compatibility if any
  date: string;
  status: string;
}

// Demo data for offline mode
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

const Appointments = () => {
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

  // Local state for demo mode status updates
  const [localOverrides, setLocalOverrides] = useState<Record<string, string>>({});

  const { data: appointments } = useQuery<AdminAppointment[]>({
    queryKey: ['admin-appointments'],
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

  const getLocalAppointments = () => {
    try {
      return JSON.parse(localStorage.getItem('local_appointments') || '[]');
    } catch {
      return [];
    }
  };

  const localAppointments = getLocalAppointments();
  const fallbackAppointments = [...localAppointments, ...DEMO_APPOINTMENTS];

  const displayData = (appointments && appointments.length > 0 ? appointments : fallbackAppointments).map(
    appt => ({ ...appt, status: localOverrides[appt.id] || appt.status })
  );
  const isDemo = !appointments || appointments.length === 0;

  const handleStatusUpdate = async (id: string, status: string) => {
    if (!isDemo) {
      // Try real API
      try {
        const response = await fetch(`${API_URL}/appointments/${id}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        });
        if (response.ok) {
          queryClient.invalidateQueries({ queryKey: ['admin-appointments'] });
          toast({ title: "Status Updated", description: `Appointment ${status.toLowerCase()}.` });
          return;
        }
      } catch { /* fall through */ }
    }

    try {
      const storedAppts = JSON.parse(localStorage.getItem('local_appointments') || '[]');
      const updated = storedAppts.map((l: AdminAppointment) => l.id === id ? { ...l, status } : l);
      localStorage.setItem('local_appointments', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update local storage', e);
    }

    // Local/demo mode update
    setLocalOverrides(prev => ({ ...prev, [id]: status }));
    toast({ title: "Status Updated", description: `Appointment marked as ${status.toLowerCase()}.` });
  };

  const handleExportCSV = () => {
    if (displayData.length === 0) {
      toast({ title: "No Data", description: "There are no appointments to export.", variant: "destructive" });
      return;
    }

    const headers = ['ID', 'Patient Name', 'Phone', 'Service', 'Date', 'Status'];
    const rows = displayData.map(appt => [
      appt.id,
      `"${appt.name}"`,
      `"${appt.phone}"`,
      `"${appt.service || 'General'}"`,
      `"${new Date(appt.date).toISOString()}"`,
      appt.status
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `appointments_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Export Successful", description: "Appointments exported to CSV." });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">Appointments</h1>
          <p className="text-muted-foreground">Manage and track all patient visit requests.</p>
          {isDemo && (
            <Badge variant="secondary" className="mt-2 gap-2 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800">
              <WifiOff className="w-3 h-3" /> Demo data — changes are local only
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="rounded-xl gap-2" onClick={handleExportCSV}>
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="w-[200px] py-4">Patient</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Visit Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((appt) => (
                <TableRow key={appt.id} className="hover:bg-muted/30 transition-colors border-border">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold uppercase">
                        {appt.name.charAt(0)}
                      </div>
                      <span className="font-semibold">{appt.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Phone className="w-3.5 h-3.5" />
                      {appt.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 px-2 py-0.5 rounded-lg text-xs font-medium">
                      {typeof appt.service === 'object' ? appt.service.name : (appt.service || 'General')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{new Date(appt.date).toLocaleDateString()}</span>
                      <span className="text-[10px] text-muted-foreground">{new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`px-2 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      appt.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                      appt.status === 'CANCELLED' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                      'bg-amber-500/10 text-amber-600 border-amber-500/20'
                    }`}>
                      {appt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl p-1 border-border shadow-lg">
                        <DropdownMenuItem
                          className="rounded-lg gap-2 cursor-pointer focus:bg-green-50 focus:text-green-600"
                          onClick={() => handleStatusUpdate(appt.id, 'CONFIRMED')}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Confirm
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="rounded-lg gap-2 cursor-pointer focus:bg-red-50 focus:text-red-600"
                          onClick={() => handleStatusUpdate(appt.id, 'CANCELLED')}
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointments;
