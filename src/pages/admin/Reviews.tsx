import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Star,
  Trash2,
  CheckCircle,
  User,
  ExternalLink,
  Clock,
  WifiOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface AdminReview {
  id: string;
  name: string;
  rating: number;
  comment?: string | null;
  source?: string;
  isApproved: boolean;
  createdAt: string;
}

// Demo reviews for offline mode
const DEMO_REVIEWS: AdminReview[] = [
  { id: 'r1', name: 'Priya Sharma', rating: 5, comment: 'Excellent experience! The doctors were very thorough with the anomaly scan. The 3D images were so clear. Highly recommend this clinic.', source: 'google', isApproved: true, createdAt: '2026-04-25T10:00:00Z' },
  { id: 'r2', name: 'Rahul Verma', rating: 5, comment: 'My wife had her NT scan here. Dr. was very patient and explained everything in detail. Very professional clinic.', source: 'google', isApproved: true, createdAt: '2026-04-22T14:00:00Z' },
  { id: 'r3', name: 'Sunita Devi', rating: 4, comment: 'Good clinic with modern equipment. Wait time was a bit long but the scan quality was excellent.', source: 'internal', isApproved: true, createdAt: '2026-04-20T09:00:00Z' },
  { id: 'r4', name: 'Amit Kumar', rating: 5, comment: 'Best ultrasound clinic in Greater Noida West. The fetal echo report was very detailed. Thank you!', source: 'google', isApproved: false, createdAt: '2026-04-28T11:00:00Z' },
  { id: 'r5', name: 'Neha Singh', rating: 4, comment: 'Clean and hygienic place. Staff is friendly and cooperative. Would visit again for my next checkup.', source: 'internal', isApproved: false, createdAt: '2026-04-30T16:00:00Z' },
  { id: 'r6', name: 'Kavita Gupta', rating: 5, comment: 'Had my growth scan done here. Very happy with the experience. The WhatsApp booking was so convenient!', source: 'google', isApproved: true, createdAt: '2026-05-01T10:30:00Z' },
];

const AdminReviews = () => {
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001/api/v1';

  // Local state for demo mode
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());

  const { data: reviews } = useQuery<AdminReview[]>({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: AbortSignal.timeout(4000),
      });
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json() as Promise<AdminReview[]>;
    },
    retry: 1,
    retryDelay: 1000,
  });

  const rawData = reviews && reviews.length > 0 ? reviews : DEMO_REVIEWS;
  const isDemo = !reviews || reviews.length === 0;

  // Apply local overrides
  const displayData = rawData
    .filter(r => !deletedIds.has(r.id))
    .map(r => ({ ...r, isApproved: approvedIds.has(r.id) ? true : r.isApproved }));

  const handleDelete = async (id: string) => {
    if (!isDemo) {
      try {
        const response = await fetch(`${API_URL}/reviews/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
          toast({ title: "Review Removed", description: "The review has been deleted." });
          return;
        }
      } catch { /* fall through */ }
    }
    setDeletedIds(prev => new Set(prev).add(id));
    toast({ title: "Review Removed", description: "The review has been removed." });
  };

  const handleApprove = async (id: string) => {
    if (!isDemo) {
      try {
        const response = await fetch(`${API_URL}/reviews/${id}/approve`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
          toast({ title: "Review Approved", description: "The review is now visible to patients." });
          return;
        }
      } catch { /* fall through */ }
    }
    setApprovedIds(prev => new Set(prev).add(id));
    toast({ title: "Review Approved", description: "The review is now marked as approved." });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">Patient Reviews</h1>
        <p className="text-muted-foreground">Manage testimonials and feedback from Google and internal sources.</p>
        {isDemo && (
          <Badge variant="secondary" className="mt-2 gap-2 bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800">
            <WifiOff className="w-3 h-3" /> Demo data — changes are local only
          </Badge>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayData.map((review) => (
          <Card key={review.id} className="rounded-3xl border-border/50 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-md transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold">{review.name}</CardTitle>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="secondary" className="rounded-full bg-blue-50 text-blue-600 border-blue-100">
                  {review.source === 'google' ? 'Google Maps' : 'Internal'}
                </Badge>
                {review.isApproved ? (
                  <Badge className="rounded-full bg-green-50 text-green-600 border-green-100 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Live
                  </Badge>
                ) : (
                  <Badge className="rounded-full bg-amber-50 text-amber-600 border-amber-100 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Pending
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground italic text-sm line-clamp-3">"{review.comment}"</p>
              <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Posted on {new Date(review.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  {!review.isApproved && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full hover:bg-green-50 hover:text-green-600"
                      onClick={() => handleApprove(review.id)}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleDelete(review.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
