import React, { useState, useEffect } from 'react';
import { Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Star, 
  LogOut, 
  Users,
  Menu,
  X,
  Search,
  Bell,
  Command as CommandIcon,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import PulseFeed from './PulseFeed';
import { CommandPalette } from './CommandPalette';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard', color: 'text-medical-teal' },
    { icon: Calendar, label: 'Appointments', path: '/admin/appointments', color: 'text-medical-teal' },
    { icon: Users, label: 'Inquiries', path: '/admin/leads', color: 'text-medical-teal' },
    { icon: Star, label: 'Reviews', path: '/admin/reviews', color: 'text-amber-500' },
    { icon: Users, label: 'Users', path: '/admin/users', color: 'text-blue-500' },
    ...(user?.role === 'SUPER_ADMIN' ? [{ icon: ShieldCheck, label: 'Audit Logs', path: '/admin/audit', color: 'text-red-500' }] : []),
  ];

  return (
    <div className="flex h-[100dvh] bg-[#F8FAFC] dark:bg-slate-950 overflow-hidden font-sans">
      <CommandPalette />
      <PulseFeed />
      
      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-md"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 lg:relative
        ${isSidebarOpen ? 'w-80 translate-x-0' : 'w-24 -translate-x-full lg:translate-x-0'}
        bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-r border-slate-200/50 dark:border-slate-800/50 
        transition-all duration-500 ease-in-out flex flex-col shadow-2xl lg:shadow-none
      `}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-glow-primary">
              <Zap className="w-6 h-6 text-white fill-white/20" />
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-display font-black text-xl text-slate-900 dark:text-white tracking-tighter leading-none">FOCUS</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mt-1">ADMIN CONSOLE</span>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4">
          <Button 
            variant="outline" 
            className={`w-full justify-start gap-3 rounded-2xl border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/50 h-12 text-muted-foreground hover:text-primary transition-all duration-300 ${!isSidebarOpen && 'px-0 justify-center'}`}
            onClick={() => {
               // Trigger command palette simulation if possible, or just focus
            }}
          >
            <Search className="w-4 h-4" />
            {isSidebarOpen && <span className="text-sm font-bold flex-1 text-left">Search...</span>}
            {isSidebarOpen && <Badge variant="secondary" className="bg-white/50 text-[10px] font-black px-1.5 py-0">⌘ K</Badge>}
          </Button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => { if(window.innerWidth < 1024) setIsSidebarOpen(false); }}
                className={`group relative flex items-center gap-4 px-4 py-4 rounded-[1.5rem] transition-all duration-500 overflow-hidden ${
                  isActive 
                    ? 'bg-primary text-white shadow-glow-primary scale-[1.02]' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark z-0"
                  />
                )}
                <item.icon className={`w-5 h-5 relative z-10 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : item.color}`} />
                {isSidebarOpen && (
                  <span className="font-bold text-sm tracking-tight relative z-10 flex-1">{item.label}</span>
                )}
                {isActive && isSidebarOpen && (
                   <ChevronRight className="w-4 h-4 text-white/50 relative z-10" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <Link to="/admin/profile" className={`flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 transition-all hover:border-primary/30 group/profile ${!isSidebarOpen && 'flex-col p-2'}`}>
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-black shadow-lg group-hover/profile:scale-105 transition-transform">
                {user?.name?.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-500" />
              </div>
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-black text-slate-900 dark:text-white truncate group-hover/profile:text-primary transition-colors">{user?.name}</p>
                <p className="text-[9px] font-black uppercase tracking-widest text-primary truncate opacity-80">{user?.role?.replace('_', ' ')}</p>
              </div>
            )}
          </Link>
          <Button 
            variant="ghost" 
            className={`w-full justify-start gap-4 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl h-12 transition-all duration-300 ${!isSidebarOpen && 'justify-center px-0'}`}
            onClick={logout}
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            {isSidebarOpen && <span className="font-bold text-xs uppercase tracking-widest">Sign Out</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Floating Toggle for Sidebar */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="hidden lg:flex absolute left-4 top-8 z-30 w-12 h-12 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-elevated hover:bg-white dark:hover:bg-slate-800 transition-all group"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 group-hover:scale-110" />}
        </Button>

        {/* Mobile Top Bar */}
        <header className="lg:hidden h-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between px-6 shrink-0 relative z-30">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex flex-col">
              <span className="font-display font-black text-base tracking-tighter leading-none">FOCUS</span>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary">ADMIN</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800">
               <Bell className="w-4 h-4" />
            </Button>
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center text-sm font-black shadow-glow-primary">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
          <div className="max-w-[1600px] mx-auto pb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
