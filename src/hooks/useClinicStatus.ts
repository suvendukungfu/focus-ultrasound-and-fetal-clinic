import { useQuery } from '@tanstack/react-query';

export type Status = 'open' | 'closed' | 'busy';

export const useClinicStatus = () => {
  return useQuery<Status>({
    queryKey: ['clinic-status'],
    queryFn: async () => {
      // Simulate API latency for backend status check
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, fetch from: await fetch('/api/v1/system/status')
      
      // Basic logic: if between 9am and 8pm IST, show open
      const hours = new Date().getHours();
      if (hours >= 9 && hours < 20) {
        return 'open';
      }
      return 'closed';
    },
    refetchInterval: 60000, // Refetch every minute
  });
};
