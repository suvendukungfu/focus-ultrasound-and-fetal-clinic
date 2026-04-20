import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Shield, User, Mail, MoreHorizontal, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const USERS = [
  { id: '1', name: 'Dr. Admin', email: 'admin@focus-clinic.com', role: 'ADMIN', lastLogin: '2026-05-01T10:00:00Z' },
  { id: '2', name: 'Clinic Staff', email: 'staff@focus-clinic.com', role: 'STAFF', lastLogin: '2026-04-30T15:30:00Z' },
];

const UsersPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage administrative access and roles for the clinic portal.</p>
        </div>
        <Button className="rounded-xl gap-2 btn-primary">
          <UserPlus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      <Card className="rounded-3xl border-border/50 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="py-4">User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {USERS.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/30 transition-colors border-border">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="font-semibold">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Mail className="w-3.5 h-3.5" />
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`gap-1.5 ${user.role === 'ADMIN' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                      <Shield className="w-3 h-3" />
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl border-border shadow-lg">
                        <DropdownMenuItem className="cursor-pointer rounded-lg">Edit Details</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer rounded-lg text-red-500 focus:bg-red-50 focus:text-red-600">Revoke Access</DropdownMenuItem>
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

export default UsersPage;
