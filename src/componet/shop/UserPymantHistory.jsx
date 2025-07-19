import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

function UserPymantHistory() {
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();

   const { data: payments = [], isLoading, isError } = useQuery({
      queryKey: ["user-payments", user?.email],
      queryFn: async () => {
         const res = await axiosSecure.get(`/payments?email=${user?.email}`);
         return res.data;
      },
      enabled: !!user?.email,
   });

   if (isLoading) return <p className="p-4">Loading...</p>;
   if (isError) return <p className="p-4 text-red-500">Failed to load payment history.</p>;

   return (
      <div className="p-4">
         <h2 className="text-2xl font-semibold mb-4">My Payment History</h2>
         <div className="overflow-x-auto">
            <table className="min-w-full table-auto border">
               <thead>
                  <tr className="bg-gray-100 text-left">
                     <th className="px-4 py-2 border">#</th>
                     <th className="px-4 py-2 border">Transaction ID</th>
                     <th className="px-4 py-2 border">Amount</th>
                     <th className="px-4 py-2 border">Status</th>
                     <th className="px-4 py-2 border">Date</th>
                  </tr>
               </thead>
               <tbody>
                  {payments.map((payment, index) => (
                     <tr key={payment._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{payment.transactionId}</td>
                        <td className="px-4 py-2 border">${payment.amount}</td>
                        <td className="px-4 py-2 border capitalize">
                           <span className={`px-2 py-1 rounded text-white text-sm ${payment.status === "paid"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                              }`}>
                              {payment.status}
                           </span>
                        </td>
                        <td className="px-4 py-2 border">
                           {new Date(payment.createdAt).toLocaleString()}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default UserPymantHistory;
