import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Pymant() {
   const location = useLocation();
   const navigate = useNavigate();
   const { cartItems = [], totalAmount = 0 } = location.state || {};

   const handleConfirmPayment = () => {
      // এখানে আপনি চাইলে API call করে অর্ডার সেন্ড করতে পারেন
      alert("✅ পেমেন্ট সফল হয়েছে!");
      navigate("/success"); // অথবা success/order page
   };

   if (cartItems.length === 0) {
      return <p className="text-center mt-20 text-red-500">কোনো কার্ট আইটেম পাওয়া যায়নি!</p>;
   }

   return (
      <div className="max-w-4xl mx-auto px-4 py-12">
         <h2 className="text-2xl font-bold mb-6 border-b pb-2">💳 পেমেন্ট পেজ</h2>

         <div className="space-y-4">
            {cartItems.map((item, idx) => {
               const price = item.medicine?.price ?? 0;
               const discount = item.medicine?.discount ?? 0;
               const unit = price - discount;
               const quantity = item.quantity || 1;
               const total = unit * quantity;

               return (
                  <div key={idx} className="border p-4 rounded-md shadow-sm">
                     <h3 className="font-semibold text-lg">{item.medicine?.name}</h3>
                     <p>পরিমাণ: {quantity} | একক মূল্য: {unit}৳ | মোট: {total}৳</p>
                  </div>
               );
            })}
         </div>

         <div className="mt-8 border-t pt-4 text-right">
            <h3 className="text-xl font-bold mb-3">মোট বিল: {totalAmount}৳</h3>
            <button
               onClick={handleConfirmPayment}
               className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold"
            >
               ✅ পেমেন্ট নিশ্চিত করুন
            </button>
         </div>
      </div>
   );
}

export default Pymant;


