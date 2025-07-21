
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Regsiter from "../componet/home/authsistem/Regsiter";
import Login from "../componet/home/authsistem/Login";
import HomeLayout from "../page/HomeLayout";
import DashboardLayout from "../page/DashboardLayout";
import DashboardHome from "../componet/dasbord/DashboardHome";
import ErrorPage from "../page/Errorpage";
import SellerMedicineManage from "../componet/sellar/SellerMedicineManage";
import ManageUsers from "../admin/ManageUsers";
import ManageCategory from "../admin/ManageCategory";
import ManageBanner from "../admin/ManageBanner";
import Sellarmanageall from "../page/Sellarmanageall";
import ShopPage from "../page/ShopPage";
import DetlisPage from "../page/DetlisPage";
import AddToCartPage from "../page/AddToCartPage";
import Pymant from "../componet/addtocart/Pymant";
import PaymentHistory from "../componet/sellar/PymantHistory";
import UserPymantHistory from "../componet/shop/UserPymantHistory";
import InvoisPage from "../componet/home/extasetiontwo/InvoisPage";
import DashbordPymant from "../componet/dasbord/DashbordPymant";
import SalesReport from "../componet/dasbord/SalesReport";
import AdminBannMage from "../admin/AdminBannMage";





export const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      children: [
      
         {
            path: "/",
            element: <HomeLayout />
         
         },

         {
            path: "/shop",
            element: <ShopPage />
         },

         {
            path: "/medicine/:id",
            element:< DetlisPage />

         },

         {

            path: "/add-to-cart",
            element: <AddToCartPage />

         },

         {

            path: "/invoice",
            element: <InvoisPage />

         },

         
         {
            path: "/register",
            element: <Regsiter />
         },
         
         {
            path: "/login",
            element: <Login />
         }


      ]
   },

   {
      path: "/dashboard",
      element: <DashboardLayout />, 
      children: [
         {
            path: "",
            element: <DashboardHome />
         },
         {
            path: "manage-users",
            element: < ManageUsers />
         },
         {
            path: "manage-categories",
            element: <ManageCategory />
         },
         {

            path: "payment/:id",
            element: < Pymant />

         },


         {

            path: "user-pymanthistroy",
            element: <UserPymantHistory />

         },

         {
            path: "dashboard-pymant-seller",
            element: <DashbordPymant />
         },

         {
            path: "sales-report",
            element: <SalesReport />
         },
         {
            path: "manage-banner",
            element: <AdminBannMage />
         },
         {
            path: "manage-medicines",
            element: <Sellarmanageall />
         },
         {
            path: "payment-history",
            element: < PaymentHistory />
         },
         {
            path: "advertise-request",
            element: <ManageBanner />
         }
      ]
   },

   {
      path: "*",
      element: <ErrorPage />
   }
 
]);
