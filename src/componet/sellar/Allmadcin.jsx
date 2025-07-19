
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import EditMedicineModal from "./EditMedicineModal";
import { useNavigate } from "react-router-dom";


function AllMedicine() {
   const axiosSecure = useAxiosSecure();
   const { user, loading } = useAuth();
   const queryClient = useQueryClient();
   const navget = useNavigate();

   const { data: medicines = [], isLoading, error } = useQuery({
      queryKey: ["medicines", user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
         const res = await axiosSecure.get(`/user-data-medicines?email=${user.email}`);
         return res.data;
      },
   });

   const deleteMutation = useMutation({
      mutationFn: async (id) => await axiosSecure.delete(`/medicines/${id}`),
      onSuccess: () => {
         queryClient.invalidateQueries(["medicines", user?.email]);
      },
   });

   

   if (loading || isLoading) return <div>Loading...</div>;
   if (error) return <div>Error loading medicines</div>;

   return (
      <div className="p-6 max-w-7xl mx-auto">
         <h2 className="text-2xl font-bold mb-4 text-center">Your Medicines</h2>
         {medicines.length === 0 ? (
            <p className="text-center">No medicines found for {user.email}</p>
         ) : (
            <div className="overflow-x-auto">
               <table className="min-w-full border border-gray-300 text-sm">
                  <thead className="bg-gray-100 text-left">
                     <tr>
                        <th className="p-2 border">Image</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Generic</th>
                        <th className="p-2 border">Company</th>
                        <th className="p-2 border">Qty</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Discount</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {medicines.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                           <td className="border p-2">
                              <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover" />
                           </td>
                           <td className="border p-2">{item.name}</td>
                           <td className="border p-2">{item.generic}</td>
                           <td className="border p-2">{item.company}</td>
                           <td className="border p-2">{item.quntity} {item.massUnit}</td>
                           <td className="border p-2">${item.price}</td>
                           <td className="border p-2">{item.discount}%</td>
                           <td className="border p-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${item.status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                 }`}>
                                 {item.status}
                              </span>
                           </td>
                           <td className="border p-2 space-x-2">
                              <button
                                 onClick={() => navget("/")}
                                 className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                              >
                                 Edit
                              </button>
                              <button
                                 onClick={() => deleteMutation.mutate(item._id)}
                                 className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                              >
                                 Delete
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}

         
      </div>
   );
}

export default AllMedicine;


