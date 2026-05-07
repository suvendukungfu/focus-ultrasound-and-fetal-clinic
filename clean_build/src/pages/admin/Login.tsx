import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, Loader2, Wifi, WifiOff } from 'lucide-react';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

// Hardcoded local admin credentials for offline/development use
const LOCAL_ADMIN = {
  email: 'admin@focusultrasound.in',
  password: 'Focus@Admin2026',
  user: {
    id: 'local-admin-001',
    name: 'Dr. Admin',
    email: 'admin@focusultrasound.in',
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

    // --- Try backend first ---
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
          toast({ title: "Login Successful", description: "Welcome to the Admin Dashboard." });
          setIsLoading(false);
          return;
        }
      } catch {
        // Network error - fall through to local auth
      }
    }

    // --- Local / offline authentication ---
    if (email.trim().toLowerCase() === LOCAL_ADMIN.email.toLowerCase() && password === LOCAL_ADMIN.password) {
      login(LOCAL_ADMIN.token, LOCAL_ADMIN.user);
      toast({
        title: "Login Successful",
        description: backendStatus === 'offline'
          ? "Running in offline mode with demo data."
          : "Welcome to the Admin Dashboard.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: backendStatus === 'offline'
          ? "Use admin@focusultrasound.in / Focus@Admin2026 for offline access."
          : "Invalid email or password. Please try again.",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <SEO noindex title="Admin Login | Focus Ultrasound" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card overflow-hidden">
          <CardHeader className="space-y-4 text-center pt-12 pb-8 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto text-primary shadow-xl shadow-primary/20 transform hover:rotate-3 transition-transform duration-500">
              <Lock className="w-10 h-10" />
            </div>
            <div>
              <CardTitle className="text-4xl font-display font-black tracking-tighter text-foreground mb-1">ADMIN PORTAL</CardTitle>
              <CardDescription className="text-primary font-bold uppercase tracking-[0.2em] text-xs">Secure Management Access</CardDescription>
            </div>
            
            <div className="flex justify-center">
              {backendStatus === 'online' ? (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-black uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Systems Operational
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-widest">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Synchronizing...
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Identity</label>
                <div className="relative group">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@focusultrasound.in"
                    className="h-14 pl-12 rounded-2xl bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all font-bold"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Secure Key</label>
                <div className="relative group">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="h-14 pl-12 rounded-2xl bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all font-bold"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-16 rounded-2xl text-lg font-bold shadow-glow btn-premium group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    VERIFYING...
                  </>
                ) : (
                  <span className="flex items-center gap-2">
                    SIGN IN TO CONSOLE
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
