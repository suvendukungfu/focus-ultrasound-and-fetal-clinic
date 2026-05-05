import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Shield, Clock, Search, Filter, AlertTriangle, Info, AlertOctagon } from 'lucide-react';
import { AuditEntry } from '@/hooks/useAuditLog';

const AuditLog = () => {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
    setLogs(storedLogs);
  }, []);

  const filteredLogs = logs.filter(log => 
    log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return <Badge className="bg-red-500/10 text-red-600 border-red-200 uppercase text-[10px]"><AlertOctagon className="w-3 h-3 mr-1" /> Critical</Badge>;
      case 'WARNING': return <Badge className="bg-amber-500/10 text-amber-600 border-amber-200 uppercase text-[10px]"><AlertTriangle className="w-3 h-3 mr-1" /> Warning</Badge>;
      default: return <Badge className="bg-blue-500/10 text-blue-600 border-blue-200 uppercase text-[10px]"><Info className="w-3 h-3 mr-1" /> Info</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-display font-black tracking-tight text-foreground text-gradient">FORENSIC AUDIT</h1>
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Immutable System Ledger
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search forensic records..." 
              className="pl-12 rounded-2xl h-12 border-border/50 bg-card/50 backdrop-blur-sm focus:ring-primary/20 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Desktop Audit View */}
      <div className="hidden lg:block">
        <Card className="rounded-[2.5rem] border-border/50 shadow-premium overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground py-6 pl-8">Event Timeline</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Actor</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Operation</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Subsystem</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Security</TableHead>
                    <TableHead className="pr-8 font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Forensic Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-60 text-center">
                        <div className="flex flex-col items-center gap-3 text-muted-foreground">
                          <Shield className="w-12 h-12 opacity-20" />
                          <p className="font-bold uppercase tracking-widest text-xs">No audit records found in current scope.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-primary/5 transition-colors border-border/50 group">
                        <TableCell className="py-6 pl-8">
                          <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold font-mono">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary text-xs font-black shadow-inner border border-white/40">
                              {log.userName.charAt(0)}
                            </div>
                            <span className="font-bold text-foreground group-hover:text-primary transition-colors">{log.userName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-border/50 text-slate-700 dark:text-slate-300">
                            {log.action}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[9px] uppercase font-black tracking-[0.1em] px-3 py-1 border-primary/20 text-primary bg-primary/5 rounded-full">
                            {log.module}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getSeverityBadge(log.severity)}
                        </TableCell>
                        <TableCell className="max-w-xs truncate pr-8 font-medium text-sm text-slate-600 dark:text-slate-400 italic">
                          "{log.details}"
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Audit View */}
      <div className="lg:hidden space-y-4 pb-24">
        {filteredLogs.length === 0 ? (
          <Card className="rounded-[2rem] border-dashed border-2 border-border/50 bg-transparent h-40 flex items-center justify-center">
            <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">No records</p>
          </Card>
        ) : (
          filteredLogs.map((log) => (
            <Card key={log.id} className="rounded-3xl border-border/50 shadow-soft bg-card/50 backdrop-blur-md overflow-hidden">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black border border-white/40 shadow-inner">
                      {log.userName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground leading-tight">{log.userName}</h4>
                      <p className="text-[10px] font-mono text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  {getSeverityBadge(log.severity)}
                </div>

                <div className="space-y-3 bg-muted/30 p-4 rounded-2xl border border-border/50">
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-[9px] font-black uppercase tracking-widest text-primary">
                      {log.action}
                    </code>
                    <Badge variant="outline" className="text-[8px] uppercase tracking-widest px-2 py-0 border-primary/20 text-primary">
                      {log.module}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground italic line-clamp-2 leading-relaxed">
                    "{log.details}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AuditLog;
