import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

function ManageCategory() {
   const axiosSecure = useAxiosSecure();
   const [modalOpen, setModalOpen] = useState(false);
   const [editData, setEditData] = useState(null);
   const { register, handleSubmit, reset } = useForm();
   const queryClient = useQueryClient();

   // Fetch all categories
   const { data: categories = [] } = useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
         const res = await axiosSecure.get("/categories");
         return res.data;
      },
   });

   // Add or Update category
   const mutation = useMutation({
      mutationFn: async (data) => {
         if (editData) {
            return axiosSecure.patch(`/categories/${editData._id}`, data);
         }
         return axiosSecure.post("/categories", data);
      },
      onSuccess: () => {
         queryClient.invalidateQueries(["categories"]);
         reset();
         setEditData(null);
         setModalOpen(false);
      },
   });

   // Delete category
   const deleteMutation = useMutation({
      mutationFn: async (id) => axiosSecure.delete(`/categories/${id}`),
      onSuccess: () => {
         queryClient.invalidateQueries(["categories"]);
      },
   });

   const onSubmit = (data) => {
      mutation.mutate(data);
   };

   const handleEdit = (category) => {
      setEditData(category);
      reset(category);
      setModalOpen(true);
   };

   return (
      <div className="p-6">
         <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Manage Categories</h1>
            <button
               onClick={() => {
                  setModalOpen(true);
                  setEditData(null);
                  reset();
               }}
               className="px-4 py-2 bg-blue-600 text-white rounded"
            >
               Add Category
            </button>
         </div>

         {/* Table */}
         <table className="w-full table-auto border">
            <thead className="bg-gray-100">
               <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Company</th>
                  <th className="px-4 py-2 text-center">Actions</th>
               </tr>
            </thead>
            <tbody>
               {categories?.map((cat) => (
                  <tr key={cat._id} className="border-t">
                     <td className="px-4 py-2">{cat.name}</td>
                     <td className="px-4 py-2">{cat.company || "—"}</td>
                     <td className="px-4 py-2 flex gap-2 justify-center">
                        <button
                           onClick={() => handleEdit(cat)}
                           className="px-3 py-1 bg-yellow-500 text-white rounded"
                        >
                           Edit
                        </button>
                        <button
                           onClick={() => deleteMutation.mutate(cat._id)}
                           className="px-3 py-1 bg-red-600 text-white rounded"
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
                  <h2 className="text-xl font-semibold mb-4">
                     {editData ? "Update Category" : "Add Category"}
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium">Category Name</label>
                        <input
                           {...register("name", { required: true })}
                           className="w-full border px-3 py-2 rounded"
                           placeholder="Enter category name"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium">Company Name</label>
                        <input
                           {...register("company")}
                           className="w-full border px-3 py-2 rounded"
                           placeholder="e.g. Nike, Apple"
                        />
                     </div>

                     <div className="flex justify-end gap-3">
                        <button
                           type="button"
                           onClick={() => {
                              setModalOpen(false);
                              reset();
                              setEditData(null);
                           }}
                           className="px-4 py-2 bg-gray-300 rounded"
                        >
                           Cancel
                        </button>
                        <button
                           type="submit"
                           className="px-4 py-2 bg-green-600 text-white rounded"
                        >
                           {editData ? "Update" : "Create"}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
}

export default ManageCategory;
