import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";

function ManageBanner() {
   const axiosSecure = useAxiosSecure();
   const queryClient = useQueryClient();
   const [modalOpen, setModalOpen] = useState(false);
   const { register, handleSubmit, reset } = useForm();

   const { data: banners = [] } = useQuery({
      queryKey: ["banners"],
      queryFn: async () => {
         const res = await axiosSecure.get("/banners");
         return res.data;
      },
   });

   const toggleMutation = useMutation({
      mutationFn: ({ id, active }) =>
         axiosSecure.patch(`/banners/${id}/toggle`, { active }),
      onSuccess: () => {
         queryClient.invalidateQueries(["banners"]);
      },
   });

   const addMutation = useMutation({
      mutationFn: (data) => axiosSecure.post("/banners", data),
      onSuccess: () => {
         queryClient.invalidateQueries(["banners"]);
         reset();
         setModalOpen(false);
      },
   });

   const deleteMutation = useMutation({
      mutationFn: (id) => axiosSecure.delete(`/banners/${id}`),
      onSuccess: () => {
         queryClient.invalidateQueries(["banners"]);
      },
   });

   const onSubmit = (data) => {
      addMutation.mutate(data);
   };

   const handleToggle = (id, currentStatus) => {
      toggleMutation.mutate({ id, active: !currentStatus });
   };

   const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this banner?")) {
         deleteMutation.mutate(id);
      }
   };

   return (
      <div className="p-6">
         <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Manage Banner Advertise</h1>
            <button
               onClick={() => setModalOpen(true)}
               className="px-4 py-2 bg-green-600 text-white rounded"
            >
               + Add Banner
            </button>
         </div>

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
                           className={`px-2 py-1 rounded text-white ${banner.active ? "bg-green-500" : "bg-gray-400"}`}
                        >
                           {banner.active ? "Active" : "Inactive"}
                        </span>
                     </td>
                     <td className="px-4 py-2 flex justify-center gap-2">
                        <button
                           onClick={() => handleToggle(banner._id, banner.active)}
                           className={`px-3 py-1 rounded ${banner.active ? "bg-red-600" : "bg-blue-600"} text-white`}
                        >
                           {banner.active ? "Disable" : "Enable"}
                        </button>
                        <button
                           onClick={() => handleDelete(banner._id)}
                           className="px-3 py-1 rounded bg-gray-700 text-white"
                        >
                           Delete
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         {/* Modal */}
         {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
               <div className="bg-white p-6 rounded-lg w-96 shadow">
                  <h2 className="text-xl font-semibold mb-4">Add New Banner</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium">Banner Title</label>
                        <input
                           {...register("title", { required: true })}
                           className="w-full border px-3 py-2 rounded"
                           placeholder="Summer Sale"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium">Image URL</label>
                        <input
                           {...register("image", { required: true })}
                           className="w-full border px-3 py-2 rounded"
                           placeholder="https://example.com/banner.jpg"
                        />
                     </div>

                     <div className="flex justify-end gap-3">
                        <button
                           type="button"
                           onClick={() => {
                              setModalOpen(false);
                              reset();
                           }}
                           className="px-4 py-2 bg-gray-300 rounded"
                        >
                           Cancel
                        </button>
                        <button
                           type="submit"
                           className="px-4 py-2 bg-green-600 text-white rounded"
                        >
                           Add Banner
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
}

export default ManageBanner;
