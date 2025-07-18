

import { Outlet } from "react-router-dom";
import DasbordSidber from "../componet/dasbord/DasbordSidber";

function DashboardLayout() {
   return (
      <div className="flex">
         <DasbordSidber />
         <div className="flex-1 p-6  min-h-screen">
            {/* Outlet or child components */}
            <Outlet />
         </div>
      </div>
   );
}
export default DashboardLayout;