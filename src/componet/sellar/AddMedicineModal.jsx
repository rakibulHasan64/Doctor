
import React from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

function AddMedicineModal({ isOpen, onClose }) {
   const queryClient = useQueryClient();
   const { register, handleSubmit, reset } = useForm();
   const [imagePreview, setImagePreview] = React.useState(null);
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();

   const { data: categories = [], isLoading, isError, } = useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
         const res = await axiosSecure.get("/categories");
         return res.data;
      },
   });

   const uniqueNames = [...new Set(categories?.map((c) => c.name))];
   const uniqueCompanies = [...new Set(categories?.map((c) => c.company))];

   const onSubmit = async (data) => {
      try {
         const imageFile = data.image[0];
         const formData = new FormData();
         formData.append("image", imageFile);

         const imageUploadRes = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_KEY}`,
            formData
         );

         const imageUrl = imageUploadRes.data.data.url;

         const medicineData = {
            name: data.name,
            generic: data.generic,
            description: data.description,
            image: imageUrl,
            category: data.category,
            company: data.company,
            massUnit: data.massUnit,
            price: parseFloat(data.price),
            quntity: parseFloat(data.quntity),
            discount: parseFloat(data.discount || 0),
            status: "pending",
            user: user?.email,

         };

         const res = await axiosSecure.post("/medicines", medicineData);
         if (res.data.success) {
            alert("Medicine added successfully!");
            reset();
            onClose();
            queryClient.invalidateQueries(["medicines", user?.email]);
         } else {
            alert("Backend responded, but with failure.");
         }
      } catch (err) {
         console.error("Submit error:", err.response?.data || err.message);
         toast.error("Something went wrong.");
      }
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
         <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl relative">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Medicine</h2>

            {isLoading && <p className="text-center text-gray-500">Loading categories...</p>}
            {isError && <p className="text-center text-red-500">Failed to load categories.</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                  <select {...register("name")} required className="w-full px-3 py-2 border rounded-lg">
                     <option value="">Select Name</option>
                     {uniqueNames.map((name, idx) => (
                        <option key={idx} value={name}>{name}</option>
                     ))}
                  </select>
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Generic Name</label>
                  <input
                     {...register("generic")}
                     required
                     className="w-full px-3 py-2 border rounded-lg"
                     placeholder="Generic Name"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                     {...register("description")}
                     className="w-full px-3 py-2 border rounded-lg"
                     placeholder="Short description"
                     rows={3}
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select {...register("category")} required className="w-full px-3 py-2 border rounded-lg">
                     <option value="">Select Category</option>
                     {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                     ))}
                  </select>
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <select {...register("company")} required className="w-full px-3 py-2 border rounded-lg">
                     <option value="">Select Company</option>
                     {uniqueCompanies.map((company, idx) => (
                        <option key={idx} value={company}>{company}</option>
                     ))}
                  </select>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Mass Unit</label>
                     <select {...register("massUnit")} className="w-full px-3 py-2 border rounded-lg">
                        <option value="mg">Mg</option>
                        <option value="ml">Ml</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Price (per unit)</label>
                     <input
                        type="number"
                        {...register("price")}
                        required
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Price"
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Price (per unit)</label>
                     <input
                        type="number"
                        {...register("quntity")}
                        required
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="quntity"
                     />
                  </div>
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                  <input
                     type="number"
                     {...register("discount")}
                     className="w-full px-3 py-2 border rounded-lg"
                     placeholder="Optional"
                  />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input
                     type="file"
                     {...register("image")}
                     required
                     accept="image/*"
                     className="file-input file-input-bordered w-full"
                     onChange={(e) =>
                        setImagePreview(URL.createObjectURL(e.target.files[0]))
                     }
                  />
                  {imagePreview && (
                     <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-2 w-28 h-28 object-cover rounded-md border"
                     />
                  )}
               </div>

               <div className="flex justify-end gap-3 pt-4">
                  <button
                     type="submit"
                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                     Add Medicine
                  </button>
                  <button
                     type="button"
                     onClick={onClose}
                     className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium"
                  >
                     Cancel
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default AddMedicineModal;
