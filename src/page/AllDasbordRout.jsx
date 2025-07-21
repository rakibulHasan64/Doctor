import DashboardHome from "../componet/dasbord/DashboardHome";
import UserDabord from "../componet/dasbord/UserDabord";
import SellerDasbor from "../componet/sellar/SellerDasbor";
import useRole from "../hooks/useRole";

function AllDasbordRout() {
   const { role, isRoleLoading } = useRole();

   if (isRoleLoading) {
      return <div className="text-center py-10">লোড হচ্ছে...</div>;
   } else {
      if (role === "user") {
         return <UserDabord />;
      } else if (role === "seller") {
         return <SellerDasbor />;
      } else if (role === "admin") {
         return <DashboardHome />;
      } else {
         return (
            <div className="text-center text-red-500 py-10">
               কোনো উপযুক্ত ড্যাশবোর্ড পাওয়া যায়নি।
            </div>
         );
      }
   }
}

export default AllDasbordRout;
