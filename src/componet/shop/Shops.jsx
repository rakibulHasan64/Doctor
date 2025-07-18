import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useCart from "../../hooks/useCart";

function Shops() {
   const axiosSecure = useAxiosSecure();
   const navigate = useNavigate();
   const { user } = useAuth();
   const { refetch } = useCart();

   const fetchMedicines = async () => {
      const res = await axiosSecure.get("/medicines");
      return res.data;
   };

   const { data: medicines = [], isLoading, error } = useQuery({
      queryKey: ["medicines"],
      queryFn: fetchMedicines,
   });



   const handleAddToCart = async (data) => {
      const cartItem = {
         medicine: data,
         user: user?.email,
         date: new Date(),
      };

      try {
         const res = await axiosSecure.post("/add-to-cart", cartItem);

         if (res.data?.insertedId) {
            alert("✅ কার্টে যোগ করা হয়েছে!");
            refetch()
         } else {
            toast.warn("⚠️ কার্টে যোগ করা যায়নি!");
         }
      } catch (error) {
         console.error("❌ Error adding to cart:", error);
         toast.error("❌ সার্ভারে সমস্যা হয়েছে!");
      }
   };




   if (isLoading) return <p>লোড হচ্ছে...</p>;
   if (error) return <p>ডাটা আনতে সমস্যা হয়েছে!</p>;

   return (
      <div className="p-4 container mx-auto py-10 h-svh">
         <h2 className="text-xl font-bold mb-4">🔹 সব মেডিসিন টেবিলে</h2>
         <table className="w-full border border-gray-300 text-sm">
            <thead>
               <tr className="bg-gray-100">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Generic</th>
                  <th>Company</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {medicines?.map((med) => (
                  <tr key={med._id} className="border-b">
                     <td>
                        <img src={med.image} alt={med.name} className="w-10 h-10 rounded" />
                     </td>
                     <td>{med.name}</td>
                     <td>{med.generic}</td>
                     <td>{med.company}</td>
                     <td>{med.price} ৳</td>
                     <td>{med.status}</td>
                     <td className="flex gap-2">
                        <button
                           onClick={() => handleAddToCart(med)}
                           className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                        >
                           Select
                        </button>
                        <button
                           onClick={() => navigate(`/medicine/${med._id}`)}
                           className="text-blue-600"
                        >
                           <FaEye />
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default Shops;
