import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function SalesReport() {
   const axiosSecure = useAxiosSecure();
   const [filter, setFilter] = useState("all");
   const [currentPage, setCurrentPage] = useState(1);
   const limit = 10;

   const { data, isLoading, isError } = useQuery({
      queryKey: ["all-payments", currentPage, filter],
      queryFn: async () => {
         const res = await axiosSecure.get(
            `/all-payments-data?page=${currentPage}&limit=${limit}&status=${filter}`
         );
         return res.data;
      },
   });

   const totalPages = Math.ceil((data?.total || 0) / limit);

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

   return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">📊 Sales Report</h2>
            <div className="text-sm text-gray-500 mt-2 md:mt-0">
               Page {currentPage} of {totalPages}
            </div>
         </div>

         {/* Filter and Search */}
         <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
               <label className="block text-sm font-medium text-gray-700 mb-1">ফিল্টার</label>
               <select
                  value={filter}
                  onChange={(e) => {
                     setFilter(e.target.value);
                     setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
               >
                  <option value="all">সব পেমেন্ট</option>
                  <option value="paid">পেইড</option>
                  <option value="pending">পেন্ডিং</option>
               </select>
            </div>
         </div>

         {/* Table */}
         <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
               <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                     <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ইমেইল</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ট্রানজেকশন আইডি</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">পরিমাণ</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">স্ট্যাটাস</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">তারিখ</th>
                     </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                     {data?.payments?.map((payment, index) => (
                        <tr key={payment._id} className="hover:bg-gray-50">
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {(currentPage - 1) * limit + index + 1}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{payment.email}</div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                              {payment.transactionId}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ৳{payment.amount.toLocaleString()}
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${payment.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                 {payment.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(payment.date).toLocaleDateString()}
                              <br />
                              <span className="text-xs text-gray-400">
                                 {new Date(payment.date).toLocaleTimeString()}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Empty State */}
            {data?.payments?.length === 0 && (
               <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try changing your filter criteria</p>
               </div>
            )}
         </div>

         {/* Pagination */}
         {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
               <div className="hidden sm:block text-sm text-gray-700">
                  Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(currentPage * limit, data?.total)}</span> of{' '}
                  <span className="font-medium">{data?.total}</span> results
               </div>
               <div className="flex-1 flex justify-between sm:justify-end gap-2">
                  <button
                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                     disabled={currentPage === 1}
                     className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     Previous
                  </button>
                  <div className="hidden md:flex gap-1">
                     {[...Array(totalPages).keys()].map(n => {
                        if (
                           n === 0 ||
                           n === totalPages - 1 ||
                           (n >= currentPage - 2 && n <= currentPage + 2)
                        ) {
                           return (
                              <button
                                 key={n}
                                 onClick={() => setCurrentPage(n + 1)}
                                 className={`px-4 py-2 border text-sm font-medium rounded-md ${currentPage === n + 1 ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                              >
                                 {n + 1}
                              </button>
                           );
                        }
                        if (n === currentPage - 3 || n === currentPage + 3) {
                           return <span key={n} className="px-4 py-2 text-gray-500">...</span>;
                        }
                        return null;
                     })}
                  </div>
                  <button
                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                     disabled={currentPage === totalPages}
                     className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     Next
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}

export default SalesReport;