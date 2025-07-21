import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

function AdminRoute({ children }) {
   const { user, loading } = useAuth();
   const { role, isRoleLoading } = useRole();
   const location = useLocation();

   if (loading || isRoleLoading) {
      return <div className="text-center py-10">লোড হচ্ছে...</div>;
   }

   if (!user || role !== "admin") {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
   }

   return children;
}

export default AdminRoute;
