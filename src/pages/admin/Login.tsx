import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, Loader2, Wifi, WifiOff } from 'lucide-react';
import SEO from '@/components/SEO';

// Hardcoded local admin credentials for offline/development use
const LOCAL_ADMIN = {
  email: 'admin@focusclinic.com',
  password: 'admin123',
  user: {
    id: 'local-admin-001',
    name: 'Dr. Admin',
    email: 'admin@focusclinic.com',
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

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001/api/v1';

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
          login(data.token, data.user);
          toast({ title: "Login Successful", description: "Welcome to the Admin Dashboard." });
          setIsLoading(false);
          return;
        }
      } catch {
        // Backend call failed — fall through to local auth
      }
    }

    // --- Local / offline authentication ---
    if (email === LOCAL_ADMIN.email && password === LOCAL_ADMIN.password) {
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
          ? "Use admin@focusclinic.com / admin123 for offline access."
          : "Invalid email or password. Please try again.",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <SEO noindex title="Admin Login | Focus Ultrasound" />
      <Card className="w-full max-w-md shadow-2xl border-border/50 bg-card/50 backdrop-blur-md rounded-3xl overflow-hidden">
        <CardHeader className="space-y-2 text-center pt-10 pb-8 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
            <Lock className="w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-display font-bold text-foreground">Admin Portal</CardTitle>
          <CardDescription className="text-muted-foreground">Sign in to manage Focus Clinic</CardDescription>
          <div className="flex justify-center mt-2">
            {backendStatus === 'checking' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground animate-pulse">
                <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Checking connection...
              </span>
            )}
            {backendStatus === 'online' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                <Wifi className="w-3 h-3 mr-2" /> API Online
              </span>
            )}
            {backendStatus === 'offline' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 border border-amber-500/20">
                <WifiOff className="w-3 h-3 mr-2" /> Offline Mode
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Email Address</label>
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@focusclinic.com"
                  className="h-12 pl-12 rounded-xl bg-background"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold ml-1">Password</label>
              <div className="relative">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="h-12 pl-12 rounded-xl bg-background"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-lg font-bold shadow-glow mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Login to Dashboard'
              )}
            </Button>
          </form>

          {backendStatus === 'offline' && (
            <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-sm">
              <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Offline Login Credentials</p>
              <p className="text-amber-600 dark:text-amber-500 font-mono text-xs">
                Email: admin@focusclinic.com<br />
                Password: admin123
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
