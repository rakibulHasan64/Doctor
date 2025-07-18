// hooks/useCart.js
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCart = () => {
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();

   const { data: cartItems = [], isLoading, refetch } = useQuery({
      queryKey: ["cartItems", user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
         const res = await axiosSecure.get(`/add-to-cart?email=${user.email}`);
         return res.data;
      },
   });

   return { cartItems, isLoading, refetch };
};

export default useCart;
