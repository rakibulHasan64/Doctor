

// src/components/dashboard/DashboardSidebar.jsx
import { NavLink } from "react-router-dom";
import {
   Home,
   LayoutDashboard,
   UserCog,
   ShoppingCart,
   PackagePlus,
   BarChart2,
   CreditCard,
   LogOut,
   ShieldCheck,
   BadgeDollarSign,
   ClipboardList,
   Users,
   Tag
} from "lucide-react";

const SidebarLink = ({ to, icon: Icon, label }) => (
   <NavLink
      to={to}
      className={({ isActive }) =>
         `flex items-center gap-3 px-4 text-lg py-2 rounded-md hover:bg-blue-100 transition ${isActive ? " text-green-600 font-semibold" : "text-white"
         }`
      }
   >
      <Icon size={20} />
      <span>{label}</span>
   </NavLink>
);

const DasbordSidber = () => {
   return (
      <aside className="w-64 h-screen bg-pink-600 text-white shadow-md p-4 space-y-2">
         <h2 className="text-xl font-bold mb-4">📊 Dashboard</h2>

         <SidebarLink to="/dashboard" icon={Home} label="Dashboard Home" />

      
         
               <SidebarLink to="/dashboard/manage-users" icon={Users} label="Manage Users" />
               <SidebarLink to="/dashboard/manage-categories" icon={Tag} label="Manage Categories" />
               <SidebarLink to="/dashboard/payments" icon={CreditCard} label="Payments" />
               <SidebarLink to="/dashboard/sales-report" icon={BarChart2} label="Sales Report" />
               <SidebarLink to="/dashboard/manage-banner" icon={ShieldCheck} label="Advertise Banners" />
         
   

      
      
               <SidebarLink to="/dashboard/manage-medicines" icon={PackagePlus} label="Manage Medicines" />
               <SidebarLink to="/dashboard/payment-history" icon={CreditCard} label="Payment History" />
               <SidebarLink to="/dashboard/advertise-request" icon={ClipboardList} label="Ad Request" />
      
      

      
      
               <SidebarLink to="/dashboard/payment-history" icon={BadgeDollarSign} label="My Payments" />
      
      

         <div className="pt-6 border-t">
            <SidebarLink to="/" icon={LayoutDashboard} label="Back to Home" />
            <SidebarLink to="/logout" icon={LogOut} label="Logout" />
         </div>
      </aside>
   );
};

export default DasbordSidber;
