import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

function PaymentHistory() {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();
   const [filter, setFilter] = useState("all");
   const queryClient = useQueryClient();

   const { data: payments = [], isLoading, isError } = useQuery({
      queryKey: ["payments", user?.email],
      queryFn: async () => {
         const res = await axiosSecure.get(`/payments?email=${user?.email}`);
         return res.data;
      },
      enabled: !!user?.email,
   });

   // ✅ Status Update Handler
   const handleStatusToggle = async (paymentId, currentStatus) => {
      const newStatus = currentStatus === "paid" ? "pending" : "paid";

      try {
         const res = await axiosSecure.patch(`/payments/${paymentId}`, {
            status: newStatus,
         });

         if (res.data.modifiedCount > 0) {
            // ✅ Refetch data after update
            queryClient.invalidateQueries(["payments", user?.email]);
         }
      } catch (err) {
         console.error("Status update failed", err);
      }
   };

   if (isLoading) return <p>Loading...</p>;
   if (isError) return <p>Something went wrong while fetching payments.</p>;

   const filteredPayments =
      filter === "all"
         ? payments
         : payments.filter((payment) => payment.status === filter);

   return (
      <div className="p-4">
         <h2 className="text-xl font-bold mb-4">Payment History</h2>

         {/* Filter Dropdown */}
         <div className="mb-4">
            <label className="mr-2 font-medium">Filter by Status:</label>
            <select
               value={filter}
               onChange={(e) => setFilter(e.target.value)}
               className="border px-3 py-1 rounded"
            >
               <option value="all">All</option>
               <option value="paid">Paid</option>
               <option value="pending">Pending</option>
            </select>
         </div>

         <div className="overflow-x-auto">
            <table className="min-w-full table-auto border">
               <thead>
                  <tr className="bg-gray-100 text-left">
                     <th className="px-4 py-2 border">#</th>
                     <th className="px-4 py-2 border">Transaction ID</th>
                     <th className="px-4 py-2 border">Amount</th>
                     <th className="px-4 py-2 border">Status</th>
                     <th className="px-4 py-2 border">Date</th>
                     <th className="px-4 py-2 border">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredPayments.map((payment, index) => (
                     <tr key={payment._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{payment.transactionId}</td>
                        <td className="px-4 py-2 border">${payment.amount}</td>
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
                           {new Date(payment.createdAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-2 border">
                           <button
                              onClick={() => handleStatusToggle(payment._id, payment.status)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                           >
                              Toggle
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default PaymentHistory;
