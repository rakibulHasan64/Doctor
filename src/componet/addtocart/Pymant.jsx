import { loadStripe } from '@stripe/stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import Chakout from './Chakout';
import { Elements } from '@stripe/react-stripe-js';
import useAuth from '../../hooks/useAuth';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

function Pymant() {
   const location = useLocation();
   const navigate = useNavigate();
   const { cartItems = [], totalAmount = 0 } = location.state || {};
   const { user } = useAuth();

   if (cartItems.length === 0) {
      return <p className="text-center mt-20 text-red-500">কোনো কার্ট আইটেম পাওয়া যায়নি!</p>;
   }

   console.log(cartItems);
   

   return (
      <div className="max-w-4xl mx-auto px-4 py-12">
         <h2 className="text-2xl font-bold mb-6 border-b pb-2">💳 পেমেন্ট পেজ</h2>

         <div className="space-y-4">
            {cartItems?.map((item, idx) => {
            
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
            <Elements stripe={stripePromise}>
               <Chakout totalprice={totalAmount} cartItems={cartItems} user={user}  />
            </Elements>
         </div>
      </div>
   );
}

export default Pymant;
