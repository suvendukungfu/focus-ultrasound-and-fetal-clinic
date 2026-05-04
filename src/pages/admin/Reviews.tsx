import React, { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Star,
  Trash2,
  CheckCircle,
  User,
  ExternalLink,
  Clock,
  WifiOff,
  Filter,
  RefreshCcw,
  MessageSquare,
  Search,
  CheckCircle2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuditLog } from '@/hooks/useAuditLog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminReview {
  id: string;
  name: string;
  rating: number;
  comment?: string | null;
  source: 'google' | 'internal' | 'facebook';
  isApproved: boolean;
  createdAt: string;
  patientId?: string;
}

const DEMO_REVIEWS: AdminReview[] = [
  { id: 'r1', name: 'Priya Sharma', rating: 5, comment: 'Excellent experience! The doctors were very thorough with the anomaly scan. The 3D images were so clear. Highly recommend this clinic.', source: 'google', isApproved: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'r2', name: 'Rahul Verma', rating: 5, comment: 'My wife had her NT scan here. Dr. was very patient and explained everything in detail. Very professional clinic.', source: 'google', isApproved: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
  { id: 'r3', name: 'Sunita Devi', rating: 4, comment: 'Good clinic with modern equipment. Wait time was a bit long but the scan quality was excellent.', source: 'internal', isApproved: true, createdAt: new Date(Date.now() - 259200000).toISOString() },
  { id: 'r4', name: 'Amit Kumar', rating: 5, comment: 'Best ultrasound clinic in Greater Noida West. The fetal echo report was very detailed. Thank you!', source: 'google', isApproved: false, createdAt: new Date().toISOString() },
  { id: 'r5', name: 'Neha Singh', rating: 3, comment: 'The clinic was good but the reception staff could be more polite. Scan was perfect though.', source: 'internal', isApproved: false, createdAt: new Date().toISOString() },
];

const AdminReviews = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { logAction } = useAuditLog();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<string>('ALL');
  const [sourceFilter, setSourceFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const { data: reviews, isLoading } = useQuery<AdminReview[]>({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      // Simulation
      return DEMO_REVIEWS;
    },
  });

  const stats = useMemo(() => {
    if (!reviews) return { average: 0, total: 0, pending: 0 };
    const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    const pending = reviews.filter(r => !r.isApproved).length;
    return { average: avg.toFixed(1), total: reviews.length, pending };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (!reviews) return [];
    return reviews.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (r.comment || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = ratingFilter === 'ALL' || r.rating === parseInt(ratingFilter);
      const matchesSource = sourceFilter === 'ALL' || r.source === sourceFilter;
      const matchesStatus = statusFilter === 'ALL' || 
                           (statusFilter === 'APPROVED' ? r.isApproved : !r.isApproved);
      return matchesSearch && matchesRating && matchesSource && matchesStatus;
    });
  }, [reviews, searchTerm, ratingFilter, sourceFilter, statusFilter]);

  const handleApprove = (id: string) => {
    logAction({
      userId: user?.id || 'system',
      userName: user?.name || 'System',
      action: 'APPROVE_REVIEW',
      module: 'REVIEWS',
      details: `Approved review ${id}`,
      severity: 'INFO'
    });
    toast({ title: "Review Approved", description: "This review will now be featured on the website." });
  };

  const handleSync = () => {
    toast({ title: "Syncing...", description: "Fetching latest reviews from Google Business Profile." });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-display font-black tracking-tight text-foreground">SOCIAL HUB</h1>
          <div className="flex items-center gap-3">
             <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20 font-bold px-3">
               Google Reviews Active
             </Badge>
             <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-500">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               Last Synced: 2 mins ago
             </div>
          </div>
        </div>
        
        <Button onClick={handleSync} variant="outline" className="rounded-2xl gap-3 border-border/50 hover:bg-primary/5 bg-card/50 backdrop-blur-md h-12 px-6 group">
          <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          Sync Google Reviews
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2rem] border-border/50 shadow-soft bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em]">Overall Rating</CardDescription>
            <div className="flex items-center justify-between">
              <CardTitle className="text-4xl font-display font-black text-primary">{stats.average}</CardTitle>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(parseFloat(stats.average)) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
              <TrendingUp className="w-3 h-3" /> +0.2 this month
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-border/50 shadow-soft bg-card/30 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em]">Pending Moderation</CardDescription>
            <CardTitle className="text-4xl font-display font-black text-amber-600">{stats.pending}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
              Needs approval before publishing
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-border/50 shadow-soft bg-card/30 backdrop-blur-xl">
          <CardHeader className="pb-2">
            <CardDescription className="text-[10px] font-black uppercase tracking-[0.2em]">Total Feedback</CardDescription>
            <CardTitle className="text-4xl font-display font-black text-foreground">{stats.total}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
              Across all linked platforms
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search reviews..." 
            className="pl-11 rounded-2xl border-border/50 bg-card/30 backdrop-blur-md h-12 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-full md:w-[150px] rounded-2xl border-border/50 bg-card/30 h-12">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-border/50 shadow-elevated">
            <SelectItem value="ALL">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-full md:w-[150px] rounded-2xl border-border/50 bg-card/30 h-12">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-border/50 shadow-elevated">
            <SelectItem value="ALL">All Sources</SelectItem>
            <SelectItem value="google">Google</SelectItem>
            <SelectItem value="internal">Internal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        <AnimatePresence mode="popLayout">
          {filteredReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="rounded-[2.5rem] border-border/50 shadow-soft overflow-hidden bg-card/30 backdrop-blur-xl h-full flex flex-col group hover:shadow-elevated transition-all duration-500">
                <CardHeader className="pb-4 relative">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary text-xl font-black shadow-inner border border-white/40">
                      {review.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">{review.name}</h3>
                        <Badge variant="outline" className="rounded-full bg-blue-50/50 text-blue-600 border-blue-100 text-[9px] font-black uppercase tracking-widest shrink-0">
                          {review.source}
                        </Badge>
                      </div>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="bg-muted/30 p-5 rounded-[1.5rem] border border-border/50 italic text-sm text-muted-foreground flex-1 relative mb-6">
                    <MessageSquare className="absolute -top-2 -left-2 w-6 h-6 text-primary/10 fill-primary/5" />
                    "{review.comment}"
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!review.isApproved && (
                        <Button 
                          onClick={() => handleApprove(review.id)}
                          size="sm" 
                          className="rounded-xl gap-2 bg-emerald-500 hover:bg-emerald-600 shadow-glow"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Approve
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl text-red-500 hover:bg-red-50">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-primary/10">
                        <ExternalLink className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredReviews.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-40">
           <Star className="w-16 h-16" />
           <p className="font-bold text-lg uppercase tracking-widest">No reviews found matching filters.</p>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
