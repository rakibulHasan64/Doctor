import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom"; // ✅ navigate import

function AddToCartPage() {
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();
   const navigate = useNavigate(); // ✅ useNavigate hook

   const {
      data: cartItems = [],
      isLoading,
      error,
      refetch,
   } = useQuery({
      queryKey: ["cartItems", user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
         const res = await axiosSecure.get(`/add-to-cart?email=${user.email}`);
         return res.data;
      },
   });

   const handleQuantityChange = async (itemId, currentQty, type, maxQty) => {
      const newQty = type === "increase" ? currentQty + 1 : currentQty - 1;
      if (newQty < 1 || newQty > maxQty) return;

      try {
         await axiosSecure.patch(`/add-to-cart/${itemId}`, { quantity: newQty });
         refetch();
      } catch (err) {
         console.error("Quantity update failed:", err);
      }
   };

   const handleDelete = async (itemId) => {
      const confirm = window.confirm("আপনি কি নিশ্চিতভাবে আইটেমটি মুছে ফেলতে চান?");
      if (!confirm) return;

      try {
         await axiosSecure.delete(`/add-to-cart/${itemId}`);
         refetch();
      } catch (err) {
         console.error("Delete failed:", err);
      }
   };

   const grandTotal = cartItems.reduce((sum, item) => {
      const price = item.medicine?.price ?? 0;
      const discount = item.medicine?.discount ?? 0;
      const quantity = typeof item.quantity === "number" ? item.quantity : 1;
      return sum + (price - discount) * quantity;
   }, 0);

   const handleProceedToPayment = () => {
      if (cartItems.length === 0) return;
      navigate("/payment", {
         state: { cartItems, totalAmount: grandTotal }, // ✅ pass to /payment route
      });
   };

   if (isLoading) return <p>লোড হচ্ছে...</p>;
   if (error) return <p>ডাটা আনতে সমস্যা হয়েছে!</p>;

   return (
      <div className="max-w-5xl mx-auto px-4 py-12 mt-16 h-auto">
         <h2 className="text-2xl font-bold mb-6 border-b pb-2">
            🛒 আপনার কার্ট ({cartItems.length} আইটেম)
         </h2>

         {cartItems.length === 0 ? (
            <p className="text-center text-gray-600 text-lg mt-8">😕 কার্ট খালি</p>
         ) : (
            <>
               <div className="grid gap-6">
                  {cartItems.map((item) => {
                     const price = item.medicine?.price ?? 0;
                     const discount = item.medicine?.discount ?? 0;
                     const quantity = typeof item.quantity === "number" ? item.quantity : 1;
                     const availableQty = item.medicine?.quntity ?? 0;
                     const unitPrice = price - discount;
                     const totalPrice = unitPrice * quantity;
                     const remainingQty = Math.max(availableQty - quantity, 0);

                     return (
                        <div
                           key={item._id}
                           className="flex flex-col sm:flex-row items-center gap-6 p-6 border rounded-lg shadow-sm hover:shadow-md transition"
                        >
                           <img
                              src={item.medicine?.image}
                              alt={item.medicine?.name}
                              className="w-24 h-24 object-cover rounded"
                           />
                           <div className="flex-1 w-full">
                              <h3 className="text-lg font-semibold">{item.medicine?.name}</h3>
                              <p className="text-sm text-gray-600">{item.medicine?.generic}</p>

                              <div className="flex gap-4 text-sm mt-1">
                                 <p className="font-medium text-green-600">মূল্য: {price}৳</p>
                                 <p className="text-red-500">ছাড়: {discount}৳</p>
                                 <p className="text-blue-600">একক মূল্য: {unitPrice}৳</p>
                              </div>

                              <p className="text-sm mt-1 font-semibold">মোট: {totalPrice}৳</p>
                              <p className="text-xs text-gray-400 mt-1">
                                 যোগ হয়েছে: {new Date(item.date).toLocaleString()}
                              </p>
                           </div>

                           {/* Quantity Controls */}
                           <div className="flex flex-col items-center gap-2">
                              <div className="flex items-center border rounded px-3 py-1">
                                 <button
                                    onClick={() => handleQuantityChange(item._id, quantity, "decrease", availableQty)}
                                    className="px-2 text-lg font-bold hover:text-blue-500"
                                    disabled={quantity <= 1}
                                 >
                                    -
                                 </button>
                                 <span className="px-2">{quantity}</span>
                                 <button
                                    onClick={() => handleQuantityChange(item._id, quantity, "increase", availableQty)}
                                    className="px-2 text-lg font-bold hover:text-blue-500"
                                    disabled={quantity >= availableQty}
                                 >
                                    +
                                 </button>
                              </div>

                              <p className="text-xs text-gray-600">
                                 আপনি আরও {remainingQty}টি নিতে পারেন
                              </p>

                              <button
                                 onClick={() => handleDelete(item._id)}
                                 className="text-red-500 hover:text-red-700 mt-2"
                              >
                                 <FaTrash size={18} />
                              </button>
                           </div>
                        </div>
                     );
                  })}
               </div>

               {/* ✅ Proceed to Payment */}
               <div className="text-right mt-10 border-t pt-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                     মোট বিল: {grandTotal}৳
                  </h3>
                  <button
                     onClick={handleProceedToPayment}
                     className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow font-semibold transition"
                  >
                     💳 Proceed to Payment
                  </button>
               </div>
            </>
         )}
      </div>
   );
}

export default AddToCartPage;
