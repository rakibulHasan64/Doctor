
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
import PrivateRoute from "./PrivetRoute";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SelleRoute";





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
            element: <PrivateRoute><ShopPage /></PrivateRoute>
         },

         {
            path: "/medicine/:id",
            element: <PrivateRoute><DetlisPage /></PrivateRoute>

         },

         {

            path: "/add-to-cart",
            element: <PrivateRoute><AddToCartPage /></PrivateRoute> 

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
      element: <PrivateRoute> <DashboardLayout /></PrivateRoute>, 
      children: [
         {
            path: "",
            element: <AdminRoute><DashboardHome /></AdminRoute>
         },
         {
            path: "manage-users",
            element: <AdminRoute>< ManageUsers /></AdminRoute> 
         },
         {
            path: "manage-categories",
            element: <AdminRoute><ManageCategory /></AdminRoute>
         },
         {

            path: "payment/:id",
            element: <PrivateRoute><Pymant /></PrivateRoute> 

         },
         {

            path: "user-pymanthistroy",
            element: <PrivateRoute><UserPymantHistory /></PrivateRoute>

         },

         {
            path: "dashboard-pymant-seller",
            element: <SellerRoute><DashbordPymant /></SellerRoute>
         },

         {
            path: "sales-report",
            element: <SellerRoute><SalesReport /></SellerRoute>
         },
         {
            path: "manage-banner",
            element: <AdminRoute><AdminBannMage /></AdminRoute> 
         },
         {
            path: "manage-medicines",
            element: <SellerRoute><Sellarmanageall /></SellerRoute>
         },
         {
            path: "payment-history",
            element: <AdminRoute><PaymentHistory /></AdminRoute>
         },
         {
            path: "advertise-request",
            element: <SellerRoute><ManageBanner /></SellerRoute>
         }
      ]
   },

   {
      path: "*",
      element: <ErrorPage />
   }
 
]);
