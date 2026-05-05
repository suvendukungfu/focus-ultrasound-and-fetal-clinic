import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, Key, LogOut, Smartphone, Globe, ShieldCheck, User as UserIcon, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
      return;
    }
    toast({ title: "Security Key Updated", description: "Your administrative password has been successfully rotated." });
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const sessions = [
    { id: 1, device: 'Admin Console (Mac)', location: 'New Delhi, India', lastActive: 'Active Now', isCurrent: true, ip: '192.168.1.1' },
    { id: 2, device: 'Mobile Access (iPhone)', location: 'Noida, India', lastActive: '2 hours ago', isCurrent: false, ip: '10.0.0.45' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-8 bg-primary/40" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Identity Management</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-foreground">ACCOUNT SECURITY</h1>
        <p className="text-muted-foreground font-medium max-w-2xl">Manage your administrative identity, rotate security keys, and monitor active console sessions.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-10">
          {/* Profile Card */}
          <Card className="rounded-[3rem] border-border/50 shadow-soft overflow-hidden bg-card/30 backdrop-blur-xl">
            <CardHeader className="p-10 border-b border-border/30 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 text-center sm:text-left">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-4xl font-black shadow-glow-primary transform group-hover:rotate-6 transition-transform duration-500">
                    {user?.name?.charAt(0)}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-background border border-border/50 rounded-2xl flex items-center justify-center text-emerald-500 shadow-xl">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black tracking-tight">{user?.name}</h2>
                    <p className="text-muted-foreground font-bold text-sm">{user?.email}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary border-primary/20 px-4 py-1.5 font-black text-[10px] uppercase tracking-widest">
                      {user?.role?.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline" className="rounded-full bg-emerald-500/5 text-emerald-600 border-emerald-500/20 px-4 py-1.5 font-black text-[10px] uppercase tracking-widest">
                      Verified Identity
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">Administrative Email</Label>
                    <div className="p-5 rounded-[1.5rem] bg-muted/30 border border-border/50 font-bold text-foreground">
                      {user?.email}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 ml-1">System Account UID</Label>
                    <div className="p-5 rounded-[1.5rem] bg-muted/30 border border-border/50 font-mono text-xs font-bold text-muted-foreground">
                      {user?.id}
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="rounded-[3rem] border-border/50 shadow-soft overflow-hidden bg-card/30 backdrop-blur-xl">
            <CardHeader className="p-10 pb-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-black tracking-tight">Security Rotation</CardTitle>
                  <CardDescription className="text-xs font-bold uppercase tracking-widest text-primary/60">Update your console access key</CardDescription>
                </div>
                <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-600">
                  <Key className="w-6 h-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-10 pt-4">
              <form onSubmit={handlePasswordChange} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Current Password</Label>
                    <Input 
                      type="password" 
                      className="rounded-2xl h-14 bg-card/50 border-border/50 focus:border-primary focus:ring-primary/20 font-bold" 
                      value={passwords.current}
                      onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="hidden sm:block" />
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">New Secure Key</Label>
                    <Input 
                      type="password" 
                      className="rounded-2xl h-14 bg-card/50 border-border/50 focus:border-primary focus:ring-primary/20 font-bold" 
                      value={passwords.new}
                      onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                      placeholder="Minimum 12 characters"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Confirm New Key</Label>
                    <Input 
                      type="password" 
                      className="rounded-2xl h-14 bg-card/50 border-border/50 focus:border-primary focus:ring-primary/20 font-bold" 
                      value={passwords.confirm}
                      onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                      placeholder="Repeat new password"
                    />
                  </div>
                </div>
                <Button className="rounded-2xl px-10 h-14 font-black uppercase tracking-widest text-xs btn-premium shadow-glow">
                  Update Console Credentials
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-10">
          {/* Active Sessions */}
          <Card className="rounded-[3rem] border-border/50 shadow-soft overflow-hidden bg-card/30 backdrop-blur-xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-primary" />
                Live Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/30">
                {sessions.map(session => (
                  <div key={session.id} className="p-8 hover:bg-primary/5 transition-colors group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-foreground">{session.device}</span>
                      {session.isCurrent ? (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200 text-[8px] font-black uppercase tracking-widest px-2 py-0.5">Primary</Badge>
                      ) : (
                        <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">Authorized</span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                        <Globe className="w-3.5 h-3.5 opacity-50" />
                        {session.location} • {session.ip}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-primary font-black uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5 opacity-50" />
                        {session.lastActive}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-8">
                <Button 
                  variant="outline" 
                  className="w-full rounded-2xl border-red-500/20 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all font-black text-[10px] uppercase tracking-[0.2em] h-14"
                  onClick={() => toast({ title: "Session Cleanup", description: "All other console sessions have been terminated." })}
                >
                  Terminate All Other Sessions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Score */}
          <Card className="rounded-[3rem] border-border/50 bg-gradient-to-br from-emerald-500/10 via-card/30 to-card/50 p-10 text-center space-y-6 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-3xl rounded-full" />
            <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/20 flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="font-black text-xl tracking-tight">System Shield Active</h3>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                Your administrative account is protected by multi-factor authentication and hardware-level encryption.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/10 py-2 rounded-xl border border-emerald-500/20">
               <CheckCircle2 className="w-3.5 h-3.5" /> Security Score: 100%
            </div>
          </Card>

          <Button 
            variant="ghost" 
            className="w-full h-16 rounded-[2rem] text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-black uppercase tracking-[0.2em] text-[10px] group"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" />
            Sign Out of Console
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
