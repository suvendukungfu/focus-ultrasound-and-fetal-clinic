import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Shield, User as UserIcon, Mail, MoreHorizontal, UserPlus, Trash2, Key, UserCheck, UserX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, UserRole } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_USERS: User[] = [
  { id: '1', name: 'Dr. Admin', email: 'admin@focus-clinic.com', role: 'SUPER_ADMIN', lastLogin: '2026-05-01T10:00:00Z', status: 'ACTIVE' },
  { id: '2', name: 'Clinic Staff', email: 'staff@focus-clinic.com', role: 'STAFF', lastLogin: '2026-04-30T15:30:00Z', status: 'ACTIVE' },
  { id: '3', name: 'Reception Desk', email: 'reception@focus-clinic.com', role: 'RECEPTIONIST', lastLogin: '2026-04-29T09:15:00Z', status: 'ACTIVE' },
];

const UsersPage = () => {
  const { user: currentUser, hasPermission } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'STAFF' as UserRole,
  });

  const canManageUsers = hasPermission('MANAGE_USERS');

  const handleOpenDialog = (userToEdit?: User) => {
    if (userToEdit) {
      setEditingUser(userToEdit);
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role,
      });
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'STAFF' });
    }
    setIsDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
      toast({ title: "User Updated", description: `${formData.name}'s profile has been updated.` });
    } else {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        status: 'ACTIVE',
        lastLogin: new Date().toISOString(),
      };
      setUsers(prev => [...prev, newUser]);
      toast({ title: "User Created", description: `${formData.name} has been added to the system.` });
    }
    setIsDialogOpen(false);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
        toast({ 
          title: newStatus === 'ACTIVE' ? "User Enabled" : "User Disabled", 
          description: `${u.name} has been ${newStatus.toLowerCase()}.` 
        });
        return { ...u, status: newStatus as 'ACTIVE' | 'DISABLED' };
      }
      return u;
    }));
  };

  const handleDeleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast({ title: "User Removed", description: "The user has been deleted from the system." });
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'ADMIN': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'STAFF': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'RECEPTIONIST': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  if (!canManageUsers) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Shield className="w-16 h-16 text-muted-foreground/20" />
        <h2 className="text-2xl font-bold">Access Restricted</h2>
        <p className="text-muted-foreground">You do not have permission to manage users.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tighter text-foreground mb-1 text-gradient">IDENTITY ACCESS</h1>
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Security & Permissions
          </div>
        </div>
        <Button onClick={() => handleOpenDialog()} className="rounded-2xl gap-2 btn-premium px-8 h-12 shadow-glow w-full md:w-auto">
          <UserPlus className="w-4 h-4" />
          Provision User
        </Button>
      </header>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <Card className="rounded-[2.5rem] border-border/50 shadow-premium overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground py-6 pl-8">Identity</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Access Rights</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Account Status</TableHead>
                    <TableHead className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground">Last Auth</TableHead>
                    <TableHead className="text-right pr-8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="popLayout">
                    {users.map((u, index) => (
                      <motion.tr
                        key={u.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-muted/20 transition-colors border-border/50 group"
                      >
                        <TableCell className="py-6 pl-8">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 ${u.status === 'ACTIVE' ? 'bg-gradient-to-br from-medical-teal to-primary shadow-medical-glow' : 'bg-slate-400'}`}>
                              <UserIcon className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{u.name}</span>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                <Mail className="w-3.5 h-3.5" />
                                {u.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`gap-1.5 px-4 py-1.5 rounded-full font-black text-[10px] tracking-[0.1em] uppercase ${getRoleBadgeColor(u.role)} shadow-sm`}>
                            <Shield className="w-3.5 h-3.5" />
                            {u.role.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`rounded-full px-4 py-1.5 font-black text-[10px] tracking-[0.1em] uppercase border ${u.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-100'}`}>
                            {u.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground">{new Date(u.lastLogin || '').toLocaleDateString()}</span>
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Authorized</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-primary/10 transition-all">
                                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 rounded-2xl border-border/50 shadow-elevated p-2 backdrop-blur-xl bg-card/95">
                              <DropdownMenuItem onClick={() => handleOpenDialog(u)} className="cursor-pointer rounded-xl gap-3 py-3 font-bold focus:bg-primary/5">
                                <UserIcon className="w-4 h-4 text-primary" /> Edit Credentials
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer rounded-xl gap-3 py-3 font-bold focus:bg-primary/5">
                                <Key className="w-4 h-4 text-amber-500" /> Rotate Password
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="my-2 bg-border/50" />
                              <DropdownMenuItem 
                                onClick={() => toggleUserStatus(u.id)}
                                className={`cursor-pointer rounded-xl gap-3 py-3 font-bold ${u.status === 'ACTIVE' ? 'text-amber-600 focus:bg-amber-50' : 'text-emerald-600 focus:bg-emerald-50'}`}
                              >
                                {u.status === 'ACTIVE' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                                {u.status === 'ACTIVE' ? 'Suspend Access' : 'Restore Access'}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteUser(u.id)}
                                className="cursor-pointer rounded-xl gap-3 py-3 font-bold text-red-500 focus:bg-red-50 focus:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" /> Revoke Identity
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

      {/* Mobile User Card View */}
      <div className="lg:hidden space-y-6 pb-24">
        <AnimatePresence mode="popLayout">
          {users.map((u, index) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="rounded-[2rem] border-border/50 shadow-soft bg-card/50 backdrop-blur-md overflow-hidden group">
                <CardContent className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${u.status === 'ACTIVE' ? 'bg-gradient-to-br from-medical-teal to-primary shadow-medical-glow' : 'bg-slate-400'}`}>
                        <UserIcon className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground leading-tight">{u.name}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                          <Mail className="w-3.5 h-3.5" />
                          {u.email}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 p-3 rounded-2xl border border-border/50 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-black mb-1">Access Level</span>
                      <Badge variant="outline" className={`px-3 py-0.5 rounded-full font-black text-[9px] uppercase border-none ${getRoleBadgeColor(u.role)}`}>
                        {u.role.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-2xl border border-border/50 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-black mb-1">Last Activity</span>
                      <span className="text-xs font-bold text-foreground">{new Date(u.lastLogin || '').toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <Button 
                      variant="outline" 
                      className="rounded-xl flex-1 h-12 border-border/50 bg-card/50 font-bold gap-2 text-primary"
                      onClick={() => handleOpenDialog(u)}
                    >
                      <UserIcon className="w-4 h-4" />
                      Edit Profile
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-primary/5">
                          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-64 rounded-2xl border-border/50 shadow-elevated p-2 backdrop-blur-xl bg-card/95">
                        <DropdownMenuItem className="rounded-xl gap-3 py-3 font-bold focus:bg-primary/5">
                          <Key className="w-4 h-4 text-amber-500" /> Rotate Password
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => toggleUserStatus(u.id)}
                          className={`rounded-xl gap-3 py-3 font-bold ${u.status === 'ACTIVE' ? 'text-amber-600 focus:bg-amber-50' : 'text-emerald-600 focus:bg-emerald-50'}`}
                        >
                          {u.status === 'ACTIVE' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          {u.status === 'ACTIVE' ? 'Suspend Access' : 'Restore Access'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2 bg-border/50" />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteUser(u.id)}
                          className="rounded-xl gap-3 py-3 font-bold text-red-500 focus:bg-red-50 focus:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" /> Revoke Identity
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


      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-[2.5rem] border-border/50 shadow-elevated sm:max-w-[450px] p-8 backdrop-blur-2xl bg-card/90">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold">
              {editingUser ? 'Edit User Profile' : 'Create New User'}
            </DialogTitle>
            <DialogDescription>
              {editingUser ? 'Modify user credentials and permissions.' : 'Add a new member to the clinic administrative team.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest ml-1">Full Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Dr. John Doe"
                className="rounded-2xl border-border/50 bg-background/50 h-12 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest ml-1">Email Address</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email} 
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@focus-clinic.com"
                className="rounded-2xl border-border/50 bg-background/50 h-12 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-xs font-bold uppercase tracking-widest ml-1">System Role</Label>
              <Select 
                value={formData.role} 
                onValueChange={(v) => setFormData(prev => ({ ...prev, role: v as UserRole }))}
              >
                <SelectTrigger className="rounded-2xl border-border/50 bg-background/50 h-12">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-border/50 shadow-elevated p-2">
                  <SelectItem value="SUPER_ADMIN" className="rounded-xl py-3">Super Admin</SelectItem>
                  <SelectItem value="ADMIN" className="rounded-xl py-3">Administrator</SelectItem>
                  <SelectItem value="STAFF" className="rounded-xl py-3">Clinic Staff</SelectItem>
                  <SelectItem value="RECEPTIONIST" className="rounded-xl py-3">Receptionist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="sm:justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl px-6 h-12 font-bold">
              Cancel
            </Button>
            <Button onClick={handleSaveUser} className="rounded-2xl px-8 h-12 font-bold btn-primary shadow-glow">
              {editingUser ? 'Save Changes' : 'Create Account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
