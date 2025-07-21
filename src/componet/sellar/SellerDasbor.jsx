import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Pie, Bar } from "react-chartjs-2";
import {
   Chart as ChartJS,
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LinearScale,
   BarElement,
   Title
} from "chart.js";

// Register ChartJS components
ChartJS.register(
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LinearScale,
   BarElement,
   Title
);

function SellerDasbor() {
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();

   const { data, isLoading, isError } = useQuery({
      queryKey: ["seller-dashboard", user?.email],
      queryFn: async () => {
         const res = await axiosSecure.get(`/seller-dashboard-summary?email=${user?.email}`);
         return res.data;
      },
      enabled: !!user?.email,
   });

   if (isLoading) return (
      <div className="flex justify-center items-center h-64">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
   );

   if (isError) return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
         <p className="font-bold">ত্রুটি!</p>
         <p>ডেটা লোড করতে সমস্যা হয়েছে। দয়া করে পরে আবার চেষ্টা করুন।</p>
      </div>
   );

   const { totalMedicines, totalPaid, totalPending, totalSold } = data || {};

   // Chart data
   const salesData = {
      labels: ['Paid Sales', 'Pending Sales'],
      datasets: [
         {
            data: [totalPaid, totalPending],
            backgroundColor: ['#10B981', '#F59E0B'],
            borderColor: ['#059669', '#D97706'],
            borderWidth: 1,
         }
      ]
   };

   const inventoryData = {
      labels: ['Total Medicines', 'Sold Units'],
      datasets: [
         {
            label: 'Inventory',
            data: [totalMedicines, totalSold],
            backgroundColor: ['#3B82F6', '#8B5CF6'],
            borderRadius: 6,
         }
      ]
   };

   const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend: {
            position: 'top',
            labels: {
               padding: 20,
               font: {
                  size: 14
               }
            }
         },
         tooltip: {
            callbacks: {
               label: function (context) {
                  let label = context.label || '';
                  if (label) {
                     label += ': ';
                  }
                  if (context.parsed !== null) {
                     label += context.dataset.label === 'Inventory'
                        ? context.parsed
                        : `৳${context.parsed}`;
                  }
                  return label;
               }
            }
         }
      }
   };

   return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
         <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">📊 Seller Dashboard</h2>

         {/* Summary Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-50 mr-4">
                     <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                     </svg>
                  </div>
                  <div>
                     <h3 className="text-sm font-medium text-gray-500">মোট মেডিসিন</h3>
                     <p className="text-2xl font-bold text-gray-800">{totalMedicines}</p>
                  </div>
               </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-50 mr-4">
                     <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                     </svg>
                  </div>
                  <div>
                     <h3 className="text-sm font-medium text-gray-500">Paid Total</h3>
                     <p className="text-2xl font-bold text-gray-800">৳{totalPaid?.toLocaleString()}</p>
                  </div>
               </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-yellow-50 mr-4">
                     <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                     </svg>
                  </div>
                  <div>
                     <h3 className="text-sm font-medium text-gray-500">Pending Total</h3>
                     <p className="text-2xl font-bold text-gray-800">৳{totalPending?.toLocaleString()}</p>
                  </div>
               </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-purple-50 mr-4">
                     <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                     </svg>
                  </div>
                  <div>
                     <h3 className="text-sm font-medium text-gray-500">মোট বিক্রি</h3>
                     <p className="text-2xl font-bold text-gray-800">{totalSold} units</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Charts Section */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Distribution</h3>
               <div className="h-64 md:h-80">
                  <Pie
                     data={salesData}
                     options={{
                        ...chartOptions,
                        plugins: {
                           ...chartOptions.plugins,
                           tooltip: {
                              callbacks: {
                                 label: function (context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = Math.round((value / total) * 100);
                                    return `${label}: ৳${value} (${percentage}%)`;
                                 }
                              }
                           }
                        }
                     }}
                  />
               </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Overview</h3>
               <div className="h-64 md:h-80">
                  <Bar
                     data={inventoryData}
                     options={{
                        ...chartOptions,
                        scales: {
                           y: {
                              beginAtZero: true,
                              grid: {
                                 drawBorder: false,
                              },
                           },
                           x: {
                              grid: {
                                 display: false,
                              },
                           },
                        }
                     }}
                  />
               </div>
            </div>
         </div>

         {/* Additional Stats */}
         <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-blue-700">Conversion Rate</div>
                  <div className="text-2xl font-bold text-blue-900">
                     {totalMedicines > 0 ? Math.round((totalSold / totalMedicines) * 100) : 0}%
                  </div>
                  <div className="text-xs text-blue-600 mt-1">Sold vs Total Inventory</div>
               </div>
               <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-green-700">Paid Ratio</div>
                  <div className="text-2xl font-bold text-green-900">
                     {totalPaid + totalPending > 0 ? Math.round((totalPaid / (totalPaid + totalPending)) * 100) : 0}%
                  </div>
                  <div className="text-xs text-green-600 mt-1">Paid vs Pending</div>
               </div>
               <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-purple-700">Avg. Sale Value</div>
                  <div className="text-2xl font-bold text-purple-900">
                     ৳{totalSold > 0 ? Math.round((totalPaid + totalPending) / totalSold) : 0}
                  </div>
                  <div className="text-xs text-purple-600 mt-1">Per Unit</div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default SellerDasbor;