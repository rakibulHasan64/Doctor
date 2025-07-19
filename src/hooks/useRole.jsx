import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useRole() {
   const { user, loading } = useAuth();
   const axiosSecure = useAxiosSecure();

   const { data: roleData, isLoading: isRoleLoading } = useQuery({
      queryKey: ["role", user?.email],
      enabled: !loading && !!user?.email,
      queryFn: async () => {
         const { data } = await axiosSecure(`http://localhost:5000/user/role/${user.email}`);

         return data;
      }
   });

   return {
      role: roleData?.role,  // "admin" / "user" etc.
      isRoleLoading,
   };
}

export default useRole;