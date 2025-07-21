import { useQuery } from "@tanstack/react-query";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { MdLocalPharmacy } from "react-icons/md";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useCart from "../../hooks/useCart";
import LoadingSpinner from "./LoadingSpinner";

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

   const handleAddToCart = async (med) => {
      if (!user) {
         toast.error("Please login first!");
         return navigate("/login");
      }

      const cartItem = {
         medicine: {
            _id: med._id,
            name: med.name,
            price: med.price,
            discount: med.discount,
            quntity: med.quntity,
            image: med.image,
            generic: med.generic,
            company: med.company,
         },
         user: user?.email,
         date: new Date(),
      };

      try {
         const res = await axiosSecure.post("/add-to-cart", cartItem);
         if (res.data?.insertedId) {
            toast.success("Added to cart successfully!");
            refetch();
         } else {
            toast.error("Failed to add to cart!");
         }
      } catch (error) {
         console.error("Error adding to cart:", error);
         toast.error("Server error occurred!");
      }
   };


   if (isLoading) return <LoadingSpinner />;
   
   return (
      <div className="container mx-auto px-4 py-8 h-screen">
         <div className="flex items-center mb-8">
            <MdLocalPharmacy className="text-3xl text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Medicine Shop</h1>
         </div>

         <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead className="bg-blue-600 text-white">
                     <tr>
                        <th className="w-16 p-3 text-left">Image</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Generic</th>
                        <th className="p-3 text-left">Company</th>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-center">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                     {medicines?.map((med) => (
                        <tr key={med._id} className="hover:bg-gray-50 transition-colors">
                           <td className="p-3">
                              <img
                                 src={med.image}
                                 alt={med.name}
                                 className="w-12 h-12 object-cover rounded-md border border-gray-200"
                              />
                           </td>
                           <td className="p-3 font-medium text-gray-800">{med.name}</td>
                           <td className="p-3 text-gray-600">{med.generic}</td>
                           <td className="p-3 text-gray-600">{med.company}</td>
                           <td className="p-3 font-semibold text-blue-600">{med.price} ৳</td>
                           <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${med.status === "in-stock"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                 }`}>
                                 {med.status}
                              </span>
                           </td>
                           <td className="p-3 flex justify-center space-x-2">
                              <button
                                 onClick={() => handleAddToCart(med)}
                                 
                                 className={`p-2 rounded-full ${med.status === "in-stock"
                                       ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                       : "bg-gray-100 text-gray-400 "
                                    } transition-colors`}
                                 title="Add to cart"
                              >
                                 <FaShoppingCart />
                              </button>
                              <button
                                 onClick={() => navigate(`/medicine/${med._id}`)}
                                 className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                 title="View details"
                              >
                                 <FaEye />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {medicines.length === 0 && (
               <div className="p-8 text-center text-gray-500">
                  No medicines available at the moment.
               </div>
            )}
         </div>
      </div>
   );
}

export default Shops;