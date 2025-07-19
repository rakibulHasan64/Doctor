import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function Chakout({ user, cartItems, totalprice }) {
   const stripe = useStripe();
   const elements = useElements();
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);
   const [processing, setProcessing] = useState(false);
   const axiosSecure = useAxiosSecure();



   

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) return;

      const card = elements.getElement(CardElement);
      if (!card) return;

      setProcessing(true);
      setError(null);
      setSuccess(null);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });

      if (error) {
         setError(error.message);
         setProcessing(false);
         return; // error হলে আর কাজ করবে না
      }

      try {
         // পেমেন্ট ইন্টেন্ট তৈরি করছি সার্ভারে
         const res = await axiosSecure.post("/create-payment-intent", {
            amount: Math.round(totalprice * 100), 
         });
         const clientSecret = res.data.clientSecret; 

         // কার্ড পেমেন্ট কনফার্ম করা
         const confirmResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
         });

         if (confirmResult.error) {
            setError(confirmResult.error.message);
         } else if (confirmResult.paymentIntent.status === "succeeded") {
            setSuccess("🎉 পেমেন্ট সফল হয়েছে!");

            // পেমেন্ট হিস্টোরি সংরক্ষণ
            await axiosSecure.post("/payment", {
               userEmail: user.email,
               cartItems: cartItems?.map(item => ({ id: item.medicine._id, quantity: item.quantity })), // শুধুমাত্র প্রয়োজনীয় তথ্য পাঠানো
               amount: totalprice,
               transactionId: confirmResult.paymentIntent.id, // নাম মিলিয়ে নাও সার্ভারে
               status: "paid",
               date: new Date(),
            });
         }
      } catch (err) {
         setError("পেমেন্ট প্রসেসিংয়ে সমস্যা হয়েছে।");
         console.error(err);
      }

      setProcessing(false);
   };


   return (
      <div className="max-w-xl mx-auto mt-6 bg-white shadow-lg rounded-lg p-6">
         <h2 className="text-2xl font-semibold text-gray-700 mb-4">💳 কার্ডের মাধ্যমে পেমেন্ট</h2>

         <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border p-3 rounded-md bg-gray-50">
               <CardElement
                  options={{
                     style: {
                        base: {
                           fontSize: "16px",
                           color: "#374151",
                           "::placeholder": {
                              color: "#9CA3AF",
                           },
                        },
                        invalid: {
                           color: "#DC2626",
                        },
                     },
                  }}
               />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            <button
               type="submit"
               disabled={!stripe || processing}
               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium disabled:opacity-50"
            >
               {processing ? "প্রসেসিং..." : "পেমেন্ট করুন"}
            </button>
         </form>
      </div>
   );
}

export default Chakout;
