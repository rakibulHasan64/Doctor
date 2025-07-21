import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

function DashbordPymant() {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();
   const [filter, setFilter] = useState("all");

   const {
      data: payments = [],
      isLoading,
      isError,
   } = useQuery({
      queryKey: ["seller-payments", user?.email],
      queryFn: async () => {
         const res = await axiosSecure.get(`/seller-payments?email=${user?.email}`);
         return res.data;
      },
      enabled: !!user?.email,
   });

   // Filter only 'paid' or 'pending'
   const filteredPayments =
      filter === "all"
         ? payments
         : payments.filter((payment) => payment.status === filter);

   if (isLoading) return <p>লোড হচ্ছে...</p>;
   if (isError) return <p>ডেটা লোড করতে সমস্যা হয়েছে।</p>;

   return (
      <div className="p-6">
         <h2 className="text-2xl font-bold mb-4">🧾 Seller Payment History</h2>

         {/* Filter Dropdown */}
         <div className="mb-4">
            <label className="mr-2 font-medium">ফিল্টার করুন:</label>
            <select
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
               className="border px-3 py-1 rounded"
            >
               <option value="all">সব</option>
               <option value="paid">Paid</option>
               <option value="pending">Pending</option>
            </select>
         </div>

         <div className="overflow-x-auto">
            <table className="min-w-full border table-auto">
               <thead>
                  <tr className="bg-gray-100">
                     <th className="px-4 py-2 border">#</th>
                     <th className="px-4 py-2 border">Transaction ID</th>
                     <th className="px-4 py-2 border">Amount</th>
                     <th className="px-4 py-2 border">Status</th>
                     <th className="px-4 py-2 border">Date</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredPayments.length > 0 ? (
                     filteredPayments.map((payment, index) => (
                        <tr key={payment._id} className="hover:bg-gray-50">
                           <td className="px-4 py-2 border">{index + 1}</td>
                           <td className="px-4 py-2 border">{payment.transactionId}</td>
                           <td className="px-4 py-2 border">৳{payment.amount}</td>
                           <td className="px-4 py-2 border capitalize">
                              <span
                                 className={`px-2 py-1 rounded text-white text-sm ${payment.status === "paid"
                                       ? "bg-green-500"
                                       : "bg-yellow-500"
                                    }`}
                              >
                                 {payment.status}
                              </span>
                           </td>
                           <td className="px-4 py-2 border">
                              {new Date(payment.date).toLocaleString()}
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="5" className="text-center py-4 text-gray-500">
                           কোনো পেমেন্ট পাওয়া যায়নি।
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default DashbordPymant;
