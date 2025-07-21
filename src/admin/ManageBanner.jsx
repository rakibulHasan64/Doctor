import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

function ManageBanner() {
   const axiosSecure = useAxiosSecure();
   const queryClient = useQueryClient();
   const [showModal, setShowModal] = useState(false);
   const { register, handleSubmit, reset } = useForm();

   // Fetch banners
   const { data: banners = [], isLoading, isError } = useQuery({
      queryKey: ["banners"],
      queryFn: async () => {
         const res = await axiosSecure.get("/banners");
         return res.data;
      },
   });

   // Add new banner
   const addBannerMutation = useMutation({
      mutationFn: (newBanner) => axiosSecure.post("/banners", newBanner),
      onSuccess: () => {
         queryClient.invalidateQueries(["banners"]);
         setShowModal(false);
         reset();
      },
   });

   // Delete banner
   const deleteBannerMutation = useMutation({
      mutationFn: (id) => axiosSecure.delete(`/banners/${id}`),
      onSuccess: () => {
         queryClient.invalidateQueries(["banners"]);
      },
   });

   const onSubmit = (data) => {
      const bannerData = {
         title: data.title,
         image: data.image,
         description: data.description || "",
         active: false,
      };
      addBannerMutation.mutate(bannerData);
   };

   if (isLoading) return <p className="text-center py-10">লোড হচ্ছে...</p>;
   if (isError) return <p className="text-center text-red-500 py-10">ডেটা লোড করতে সমস্যা হয়েছে।</p>;

   return (
      <div className="p-4 md:p-6">
         <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-0">Manage Advertisement Banners</h2>
            <button
               onClick={() => setShowModal(true)}
               className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
            >
               + Add Advertisement
            </button>
         </div>

         {/* Banner Table */}
         <div className="overflow-x-auto shadow rounded border">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
               <thead className="bg-gray-100 text-left">
                  <tr>
                     <th className="px-4 py-2 border">#</th>
                     <th className="px-4 py-2 border">Image</th>
                     <th className="px-4 py-2 border">Description</th>
                     <th className="px-4 py-2 border">Status</th>
                     <th className="px-4 py-2 border">Actions</th>
                  </tr>
               </thead>
               <tbody className="bg-white">
                  {banners.length > 0 ? (
                     banners.map((banner, index) => (
                        <tr key={banner._id} className="hover:bg-gray-50">
                           <td className="px-4 py-2 border">{index + 1}</td>
                           <td className="px-4 py-2 border">
                              <img
                                 src={banner.image}
                                 alt={banner.title || "Banner"}
                                 className="w-24 h-16 object-cover rounded"
                              />
                           </td>
                           <td className="px-4 py-2 border">{banner.description || "-"}</td>
                           <td className="px-4 py-2 border">
                              <span
                                 className={`px-3 py-1 text-xs rounded-full font-medium ${banner.active
                                       ? "bg-green-100 text-green-800"
                                       : "bg-gray-200 text-gray-600"
                                    }`}
                              >
                                 {banner.active ? "Active" : "Inactive"}
                              </span>
                           </td>
                           <td className="px-4 py-2 border">
                              <button
                                 onClick={() => {
                                    Swal.fire({
                                       title: "Are you sure?",
                                       text: "You won't be able to revert this!",
                                       icon: "warning",
                                       showCancelButton: true,
                                       confirmButtonColor: "#d33",
                                       cancelButtonColor: "#3085d6",
                                       confirmButtonText: "Yes, delete it!",
                                    }).then((result) => {
                                       if (result.isConfirmed) {
                                          deleteBannerMutation.mutate(banner._id, {
                                             onSuccess: () => {
                                                Swal.fire("Deleted!", "The banner has been deleted.", "success");
                                             },
                                          });
                                       }
                                    });
                                 }}
                                 className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                              >
                                 Delete
                              </button>

                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="5" className="text-center py-6 text-gray-500">
                           কোনো বিজ্ঞাপন পাওয়া যায়নি।
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>

         {/* Modal */}
         {showModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
               <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                  <h3 className="text-lg font-semibold mb-4">Add Advertisement</h3>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium mb-1">Banner Title</label>
                        <input
                           {...register("title", { required: true })}
                           className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                           placeholder="Summer Sale"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input
                           {...register("image", { required: true })}
                           className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                           placeholder="https://example.com/banner.jpg"
                        />
                     </div>

                     <div>
                        <label className="block text-sm font-medium mb-1">Description (optional)</label>
                        <textarea
                           {...register("description")}
                           className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
                           placeholder="Enter description"
                           rows={3}
                        />
                     </div>

                     <div className="flex justify-end gap-3 mt-4">
                        <button
                           type="button"
                           onClick={() => {
                              setShowModal(false);
                              reset();
                           }}
                           className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                        >
                           Cancel
                        </button>
                        <button
                           type="submit"
                           className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
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
