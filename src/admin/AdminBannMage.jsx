import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

function AdminBannMage() {
   const axiosSecure = useAxiosSecure();
   const queryClient = useQueryClient();

   // Fetch banners
   const { data: banners = [], isLoading, isError } = useQuery({
      queryKey: ["banners"],
      queryFn: async () => {
         const res = await axiosSecure.get("/banners");
         return res.data;
      },
   });

   // Mutation to toggle banner active status
   const toggleMutation = useMutation({
      mutationFn: ({ id, active }) =>
         axiosSecure.patch(`/banners/${id}/toggle`, { active }),
      onSuccess: () => {
         queryClient.invalidateQueries(["banners"]);
      },
   });

   const handleToggle = (id, currentStatus) => {
      toggleMutation.mutate({ id, active: !currentStatus });
   };

   if (isLoading) return <p>লোড হচ্ছে...</p>;
   if (isError) return <p>ডেটা লোড করতে সমস্যা হয়েছে।</p>;

   return (
      <div className="p-6">
         <h1 className="text-2xl font-bold mb-4">Manage Banner Advertise</h1>

         <table className="w-full table-auto border">
            <thead className="bg-gray-100">
               <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
               </tr>
            </thead>
            <tbody>
               {banners.map((banner) => (
                  <tr key={banner._id} className="border-t text-center">
                     <td className="px-4 py-2">{banner.title}</td>
                     <td className="px-4 py-2">
                        <img
                           src={banner.image}
                           alt={banner.title}
                           className="w-24 h-12 object-cover mx-auto"
                        />
                     </td>
                     <td className="px-4 py-2">
                        <span
                           className={`px-2 py-1 rounded text-white ${banner.active ? "bg-green-500" : "bg-gray-400"
                              }`}
                        >
                           {banner.active ? "Active" : "Inactive"}
                        </span>
                     </td>
                     <td className="px-4 py-2">
                        <button
                           onClick={() => handleToggle(banner._id, banner.active)}
                           className={`px-3 py-1 rounded ${banner.active ? "bg-red-600" : "bg-blue-600"
                              } text-white`}
                        >
                           {banner.active ? "Disable" : "Enable"}
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default AdminBannMage;
