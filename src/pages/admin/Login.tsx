import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, Loader2, Shield, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';

// Hardcoded local admin credentials for offline/development use
const LOCAL_ADMIN = {
  email: import.meta.env.VITE_ADMIN_EMAIL || 'sahoolaxmipriya9560@gmail.com',
  password: 'Focus@Admin2026',
  user: {
    id: 'local-admin-001',
    name: 'Dr. Admin',
    email: 'sahoolaxmipriya9560@gmail.com',
    role: 'ADMIN',
  },
  token: 'local-dev-token-focus-clinic',
};

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const { login } = useAuth();
  const { toast } = useToast();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

  React.useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${API_URL}/health`, {
          method: 'GET',
          mode: 'cors',
          signal: AbortSignal.timeout(3000),
        });
        if (res.ok) setBackendStatus('online');
        else setBackendStatus('offline');
      } catch {
        setBackendStatus('offline');
      }
    };
    checkBackend();
  }, [API_URL]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation delay for premium feel
    await new Promise(r => setTimeout(r, 1000));

    if (backendStatus === 'online') {
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          const userObj = {
            id: data.user?.id || 'backend-user',
            name: data.user?.name || 'Admin User',
            email: data.user?.email || email,
            role: data.user?.role || 'ADMIN'
          };
          login(data.token, userObj);
          toast({ title: "Verification Successful", description: "Identity confirmed. Accessing Secure Console." });
          setIsLoading(false);
          return;
        }
      } catch { /* Fall through */ }
    }

    if (email.trim().toLowerCase() === LOCAL_ADMIN.email.toLowerCase() && password === LOCAL_ADMIN.password) {
      login(LOCAL_ADMIN.token, LOCAL_ADMIN.user);
      toast({
        title: "Access Granted",
        description: "Welcome to the Clinic Management Console.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "Invalid credentials. Please verify your identity and try again.",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      <SEO noindex title="Admin Login | Focus Ultrasound" />
      
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,216,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-medical-teal/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="glass-card overflow-hidden border-white/10 shadow-2xl rounded-[2.5rem]">
          <CardHeader className="space-y-6 text-center pt-16 pb-10 bg-gradient-to-b from-primary/10 to-transparent">
            <motion.div 
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-[2rem] flex items-center justify-center mx-auto text-white shadow-glow-primary transform hover:scale-105 transition-transform duration-500"
            >
              <Shield className="w-12 h-12 fill-white/20" />
            </motion.div>
            
            <div className="space-y-2">
              <CardTitle className="text-4xl font-display font-black tracking-tighter text-white">CLINIC PORTAL</CardTitle>
              <CardDescription className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Secure Management Access</CardDescription>
            </div>
            
            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                {backendStatus === 'online' ? (
                  <motion.div 
                    key="online"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Cloud Systems Operational
                  </motion.div>
                ) : (
                  <motion.div 
                    key="sync"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-black uppercase tracking-widest"
                  >
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Offline Sync Mode
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardHeader>

          <CardContent className="p-12 pt-4">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Identity</label>
                <div className="relative group">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@focusultrasound.in"
                    className="h-16 pl-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary focus:ring-primary/20 transition-all font-bold text-white placeholder:text-slate-600"
                  />
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Secure Key</label>
                <div className="relative group">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="h-16 pl-14 rounded-2xl bg-white/5 border-white/10 focus:border-primary focus:ring-primary/20 transition-all font-bold text-white placeholder:text-slate-600"
                  />
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-18 rounded-[1.5rem] text-sm font-black uppercase tracking-[0.3em] shadow-glow btn-premium group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Verifying Identity...</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-3">
                    Access Console <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
            
            <div className="mt-12 text-center">
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-loose">
                 Authorized Personnel Only.<br />
                 Unauthorized access attempts are monitored and recorded.
               </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
