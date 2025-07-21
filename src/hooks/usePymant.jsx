import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

function usePymant() {
   const { user, loading } = useAuth();
   const axiosSecure = useAxiosSecure();

   const { data: payments = [], isLoading, refetch, error } = useQuery({
      queryKey: ['payments', user?.email],
      enabled: !!user?.email && !loading,
      queryFn: async () => {
         const res = await axiosSecure.get('/payments', {
            params: { email: user.email },
         });
         return res.data;
      },
   });

   return { payments, isLoading, refetch, error };
}

export default usePymant;
