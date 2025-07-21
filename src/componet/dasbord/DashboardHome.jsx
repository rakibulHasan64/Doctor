import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";

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

function DashboardHome() {
   const axiosSecure = useAxiosSecure();

   const { data = {}, isLoading, isError } = useQuery({
      queryKey: ["admin-revenue"],
      queryFn: async () => {
         const res = await axiosSecure.get("/admin-revenue");
         return res.data;
      },
   });

   if (isLoading) return (
      <div className="flex justify-center items-center h-64">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
   );

   if (isError) return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
         <p className="font-bold">ত্রুটি!</p>
         <p>ডেটা লোড করতে সমস্যা হয়েছে। দয়া করে পরে আবার চেষ্টা করুন।</p>
      </div>
   );

   // Chart data and options
   const pieData = {
      labels: ["Paid", "Pending"],
      datasets: [
         {
            data: [data.paidTotal, data.pendingTotal],
            backgroundColor: ["#10B981", "#F59E0B"],
            hoverBackgroundColor: ["#059669", "#D97706"],
            borderWidth: 1,
         },
      ],
   };

   const barData = {
      labels: ["Paid", "Pending"],
      datasets: [
         {
            label: "Total Amount (৳)",
            data: [data.paidTotal, data.pendingTotal],
            backgroundColor: "#10B981",
            borderRadius: 6,
         },
         {
            label: "Payment Count",
            data: [data.paidCount, data.pendingCount],
            backgroundColor: "#F59E0B",
            borderRadius: 6,
         },
      ],
   };

   const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend: {
            position: "top",
            labels: {
               padding: 20,
               usePointStyle: true,
               pointStyle: "circle",
            },
         },
         tooltip: {
            callbacks: {
               label: function (context) {
                  let label = context.dataset.label || '';
                  if (label) {
                     label += ': ';
                  }
                  if (context.parsed.y !== null) {
                     label += context.dataset.label.includes('Amount')
                        ? `৳${context.parsed.y}`
                        : context.parsed.y;
                  }
                  return label;
               }
            }
         },
      },
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
      },
   };

   return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">📊 Admin Dashboard Overview</h2>
            <div className="text-sm text-gray-500 mt-2 md:mt-0">
               Last updated: {new Date().toLocaleDateString()}
            </div>
         </div>

         {/* Stats Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-green-50 hover:shadow-md transition-shadow">
               <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-50 mr-4">
                     <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                     </svg>
                  </div>
                  <div>
                     <h3 className="text-sm font-medium text-gray-500">Paid Amount</h3>
                     <p className="text-2xl font-bold text-gray-800">৳{data.paidTotal?.toLocaleString()}</p>
                  </div>
               </div>
               <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                     {data.paidCount} টি পেমেন্ট
                  </span>
               </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-yellow-50 hover:shadow-md transition-shadow">
               <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-yellow-50 mr-4">
                     <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                     </svg>
                  </div>
                  <div>
                     <h3 className="text-sm font-medium text-gray-500">Pending Amount</h3>
                     <p className="text-2xl font-bold text-gray-800">৳{data.pendingTotal?.toLocaleString()}</p>
                  </div>
               </div>
               <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                     {data.pendingCount} টি পেমেন্ট
                  </span>
               </div>
            </div>
         </div>

         {/* Charts Section */}
         <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-6">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-50">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Payment Distribution</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                     Percentage
                  </span>
               </div>
               <div className="h-64 md:h-80">
                  <Pie
                     data={pieData}
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

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-50">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Payment Comparison</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                     Amount vs Count
                  </span>
               </div>
               <div className="h-64 md:h-80">
                  <Bar data={barData} options={chartOptions} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default DashboardHome;