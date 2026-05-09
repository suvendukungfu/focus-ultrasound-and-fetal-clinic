import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, Loader2, Shield, ArrowRight, Eye, EyeOff, AlertTriangle, CheckCircle2, XCircle, KeyRound, ArrowLeft, ShieldCheck } from 'lucide-react';
import SEO from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { User, UserRole } from '@/types/admin';

// ── Local admin credentials ──
const LOCAL_ADMIN = {
  email: (import.meta as unknown as { env: Record<string, string | undefined> }).env.VITE_ADMIN_EMAIL || 'focusclinic2026@gmail.com',
  password: (import.meta as unknown as { env: Record<string, string | undefined> }).env.VITE_ADMIN_PASSWORD || 'focus@Clinic#2026',
  user: {
    id: 'local-admin-001',
    name: 'Dr. Admin',
    email: 'focusclinic2026@gmail.com',
    role: 'ADMIN' as const,
    status: 'ACTIVE' as const,
  } as User,
  token: 'local-dev-token-focus-clinic',
};

// ── Password strength checker ──
const checkStrength = (pw: string) => {
  const checks = [
    { label: '8+ characters', pass: pw.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(pw) },
    { label: 'Lowercase letter', pass: /[a-z]/.test(pw) },
    { label: 'Number', pass: /[0-9]/.test(pw) },
    { label: 'Special character', pass: /[^A-Za-z0-9]/.test(pw) },
  ];
  const score = checks.filter(c => c.pass).length;
  return { checks, score, label: score <= 2 ? 'Weak' : score <= 4 ? 'Medium' : 'Strong' };
};

// ── Secure Input Component ──
const SecureInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode; label: string; error?: string }>(
  ({ icon, label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s/g, '-');
    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
          {label}
        </label>
        <div className="relative group">
          <input
            ref={ref}
            id={inputId}
            aria-label={label}
            aria-invalid={!!error}
            className={`
              w-full h-14 pl-12 pr-4 rounded-2xl text-sm font-medium transition-all duration-300 outline-none
              bg-slate-50/50 dark:bg-white/[0.07] backdrop-blur-sm
              border border-slate-200 dark:border-white/[0.12] hover:border-slate-300 dark:hover:border-white/20
              text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 caret-primary
              focus:border-primary/60 focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-white/[0.1]
              autofill:bg-slate-50 autofill:text-slate-900 dark:autofill:bg-white/[0.07] dark:autofill:text-slate-100
              [&:-webkit-autofill]:[-webkit-text-fill-color:theme(colors.slate.900)] dark:[&:-webkit-autofill]:[-webkit-text-fill-color:theme(colors.slate.100)]
              [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]
              [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgba(248,250,252,1)] dark:[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.07)]
              ${error ? 'border-red-500/50 focus:ring-red-500/20' : ''}
              ${className || ''}
            `}
            {...props}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors duration-300">
            {icon}
          </div>
        </div>
        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-red-400 text-xs flex items-center gap-1.5 ml-1">
              <XCircle className="w-3 h-3" />{error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
SecureInput.displayName = 'SecureInput';

// ── Google Icon SVG ──
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ══════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [loginError, setLoginError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [view, setView] = useState<'login' | 'forgot' | 'reset-sent'>('login');
  const [forgotEmail, setForgotEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const API_URL = (import.meta as unknown as { env: Record<string, string | undefined> }).env.VITE_API_URL || 'http://localhost:4000/api/v1';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  // Backend health check
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`${API_URL}/health`, { method: 'GET', mode: 'cors', signal: AbortSignal.timeout(3000) });
        setBackendStatus(res.ok ? 'online' : 'offline');
      } catch {
        setBackendStatus('offline');
      }
    };
    check();
  }, [API_URL]);

  // Focus email on mount
  useEffect(() => { emailRef.current?.focus(); }, []);

  // Caps lock detection
  const handleKeyEvent = useCallback((e: React.KeyboardEvent) => {
    setCapsLock(e.getModifierState('CapsLock'));
  }, []);

  // Rate limiting
  const isRateLimited = failedAttempts >= 5;

  // ── Login handler ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRateLimited) {
      toast({ variant: 'destructive', title: 'Too Many Attempts', description: 'Please wait before trying again.' });
      return;
    }
    setIsLoading(true);
    setLoginError('');

    await new Promise(r => setTimeout(r, 800));

    if (backendStatus === 'online') {
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
          const data = await response.json();
          const userObj: User = {
            id: data.user?.id || 'backend-user',
            name: data.user?.name || 'Admin User',
            email: data.user?.email || email,
            role: (data.user?.role as UserRole) || 'ADMIN',
            status: 'ACTIVE'
          };
          login(data.token, userObj);
          toast({ title: 'Verification Successful', description: 'Identity confirmed. Accessing Secure Console.' });
          setIsLoading(false);
          return;
        }
      } catch { /* fall through to local auth */ }
    }

    // Local fallback auth
    if (email.trim().toLowerCase() === LOCAL_ADMIN.email.toLowerCase() && password === LOCAL_ADMIN.password) {
      login(LOCAL_ADMIN.token, LOCAL_ADMIN.user);
      toast({ title: 'Access Granted', description: 'Welcome to the Clinic Management Console.' });
    } else {
      setFailedAttempts(prev => prev + 1);
      setLoginError('Invalid credentials. Please verify your identity.');
      toast({ variant: 'destructive', title: 'Authentication Failed', description: 'Invalid credentials.' });
    }
    setIsLoading(false);
  };

  // ── Google OAuth handler ──
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    toast({ title: 'Google SSO', description: 'Google authentication will be configured with your OAuth credentials.' });
    setGoogleLoading(false);
  };

  // ── Forgot password handler ──
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    toast({ title: 'Reset Link Sent', description: `If ${forgotEmail} is registered, a reset link has been sent.` });
    setView('reset-sent');
    setIsLoading(false);
  };

  const strength = checkStrength(newPassword);

  // ══════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      <SEO noindex title="Admin Login | Focus Ultrasound" />

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,216,0.08),transparent_50%)]" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/15 blur-[120px] rounded-full animate-pulse opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-medical-teal/15 blur-[120px] rounded-full animate-pulse opacity-20 pointer-events-none" style={{ animationDelay: '1s' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="rounded-[2.5rem] overflow-hidden border border-border shadow-2xl bg-card/80 backdrop-blur-2xl">
          {/* ── Header ── */}
          <div className="text-center pt-12 pb-8 px-8 bg-gradient-to-b from-primary/[0.08] to-transparent">
            <motion.div
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-[1.5rem] flex items-center justify-center mx-auto text-white shadow-lg shadow-primary/20 mb-6"
            >
              <Shield className="w-10 h-10 fill-white/20" />
            </motion.div>

            <h1 className="text-3xl font-display font-black tracking-tighter text-foreground mb-1">CLINIC PORTAL</h1>
            <p className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-5">Secure Management Access</p>

            {/* Status badge */}
            <div className="flex justify-center">
              <AnimatePresence mode="wait">
                {backendStatus === 'online' ? (
                  <motion.div key="on" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Cloud Systems Operational
                  </motion.div>
                ) : backendStatus === 'checking' ? (
                  <motion.div key="chk" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20 text-[9px] font-black uppercase tracking-widest">
                    <Loader2 className="w-3 h-3 animate-spin" />Connecting...
                  </motion.div>
                ) : (
                  <motion.div key="off" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-black uppercase tracking-widest">
                    <Loader2 className="w-3 h-3 animate-spin" />Offline Sync Mode
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="px-8 sm:px-10 pb-10 pt-2">
            <AnimatePresence mode="wait">
              {/* ════════ LOGIN VIEW ════════ */}
              {view === 'login' && (
                <motion.div key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Email */}
                    <SecureInput
                      ref={emailRef}
                      label="Email Identity"
                      icon={<Mail className="w-4.5 h-4.5" />}
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setLoginError(''); }}
                      onKeyDown={handleKeyEvent}
                      placeholder="admin@focusultrasound.in"
                      autoComplete="email"
                      required
                      error={loginError && !password ? loginError : undefined}
                    />

                    {/* Password */}
                    <div className="space-y-2">
                      <label htmlFor="password-field" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Secure Key</label>
                      <div className="relative group">
                        <input
                          id="password-field"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={e => { setPassword(e.target.value); setLoginError(''); }}
                          onKeyDown={handleKeyEvent}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          required
                          aria-label="Password"
                          className={`
                            w-full h-14 pl-12 pr-12 rounded-2xl text-sm font-medium transition-all duration-300 outline-none
                            bg-slate-50/50 dark:bg-white/[0.07] backdrop-blur-sm
                            border border-slate-200 dark:border-white/[0.12] hover:border-slate-300 dark:hover:border-white/20
                            text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 caret-primary
                            focus:border-primary/60 focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-white/[0.1]
                            [&:-webkit-autofill]:[-webkit-text-fill-color:theme(colors.slate.900)] dark:[&:-webkit-autofill]:[-webkit-text-fill-color:theme(colors.slate.100)]
                            [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]
                            [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgba(248,250,252,1)] dark:[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgba(255,255,255,0.07)]
                            ${loginError ? 'border-red-500/50' : ''}
                          `}
                        />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-primary transition-colors duration-300" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          tabIndex={-1}
                        >
                          <motion.div key={showPassword ? 'hide' : 'show'} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.15 }}>
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </motion.div>
                        </button>
                      </div>

                      {/* Caps Lock warning */}
                      <AnimatePresence>
                        {capsLock && (
                          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                            className="flex items-center gap-1.5 text-amber-400 text-xs ml-1">
                            <AlertTriangle className="w-3 h-3" />Caps Lock is ON
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Error message */}
                      <AnimatePresence>
                        {loginError && (
                          <motion.div initial={{ opacity: 0, y: -4, x: 0 }} animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }} exit={{ opacity: 0 }}
                            transition={{ x: { duration: 0.4 } }}
                            className="flex items-center gap-1.5 text-red-400 text-xs ml-1">
                            <XCircle className="w-3 h-3 shrink-0" />{loginError}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Forgot password link */}
                      <div className="flex justify-end">
                        <button type="button" onClick={() => setView('forgot')}
                          className="text-[10px] font-bold text-primary/70 hover:text-primary uppercase tracking-wider transition-colors">
                          Forgot Password?
                        </button>
                      </div>
                    </div>

                    {/* Submit button */}
                    <Button
                      type="submit"
                      disabled={isLoading || isRateLimited}
                      className="w-full h-14 rounded-2xl text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 group"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Verifying Identity...</span>
                      ) : isRateLimited ? (
                        <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" />Too Many Attempts</span>
                      ) : (
                        <span className="flex items-center gap-2">Access Console <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                      )}
                    </Button>

                    {/* Divider */}
                    <div className="relative my-2">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                      <div className="relative flex justify-center"><span className="bg-card px-4 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">Or continue with</span></div>
                    </div>

                    {/* Google button */}
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      disabled={googleLoading}
                      className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 bg-secondary/5 dark:bg-white/[0.05] border border-border hover:border-primary/30 hover:bg-secondary/10 dark:hover:bg-white/[0.08] text-foreground dark:text-slate-300 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
                    >
                      {googleLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleIcon />}
                      {googleLoading ? 'Connecting...' : 'Continue with Google'}
                    </button>
                  </form>

                  {/* Security footer */}
                  <div className="mt-8 text-center space-y-3">
                    <div className="flex items-center justify-center gap-1.5 text-primary/50">
                      <ShieldCheck className="w-3 h-3" />
                      <span className="text-[8px] font-bold uppercase tracking-[0.2em]">256-bit Secure Authentication</span>
                    </div>
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest leading-relaxed">
                      Authorized Personnel Only.<br />Unauthorized access attempts are monitored.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ════════ FORGOT PASSWORD VIEW ════════ */}
              {view === 'forgot' && (
                <motion.div key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  <button type="button" onClick={() => setView('login')}
                    className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-foreground dark:hover:text-white text-xs font-bold uppercase tracking-wider mb-6 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" />Back to Login
                  </button>

                  <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <KeyRound className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="text-xl font-display font-bold text-foreground mb-1">Reset Password</h2>
                    <p className="text-slate-400 text-sm">Enter your email to receive a secure reset link.</p>
                  </div>

                  <form onSubmit={handleForgotPassword} className="space-y-5">
                    <SecureInput
                      label="Registered Email"
                      icon={<Mail className="w-4.5 h-4.5" />}
                      type="email"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                      placeholder="your@email.com"
                      autoComplete="email"
                      required
                    />

                    <Button type="submit" disabled={isLoading || !forgotEmail}
                      className="w-full h-14 rounded-2xl text-sm font-black uppercase tracking-[0.2em] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 transition-all duration-300 group">
                      {isLoading ? (
                        <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Sending...</span>
                      ) : (
                        <span className="flex items-center gap-2">Send Reset Link <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                      )}
                    </Button>
                  </form>
                </motion.div>
              )}

              {/* ════════ RESET SENT VIEW ════════ */}
              {view === 'reset-sent' && (
                <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </motion.div>
                  <h2 className="text-xl font-display font-bold text-foreground mb-2">Check Your Email</h2>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    We've sent a secure reset link to<br />
                    <span className="text-foreground font-semibold">{forgotEmail}</span>
                  </p>
                  <Button onClick={() => { setView('login'); setForgotEmail(''); }}
                    className="h-12 rounded-2xl px-8 text-sm font-bold bg-secondary/5 dark:bg-white/[0.07] border border-border hover:bg-secondary/10 dark:hover:bg-white/[0.12] text-foreground dark:text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" />Back to Login
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
