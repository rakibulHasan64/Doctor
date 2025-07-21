import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useAuth from "../../../hooks/useAuth";
import usePymant from "../../../hooks/usePymant";

function InvoicePage() {
   const componentRef = useRef();
   const { user } = useAuth();
   const { payments, isLoading } = usePymant();

   const latestPayment = payments[0]; // প্রথম পেমেন্ট ধরছি (প্রয়োজনে পরিবর্তন করো)

   const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle: `Invoice_${latestPayment?.transactionId || "Unknown"}`,
   });

   if (isLoading) return <div className="text-center mt-10 text-gray-600">লোড হচ্ছে...</div>;

   return (
      <div className="p-6 bg-gray-100 min-h-screen mt-10">
         <div ref={componentRef} className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
            {/* Header */}
            <div className="text-center mb-6">
               <img src="/logo.png" alt="Logo" className="h-16 mx-auto mb-2" />
               <h1 className="text-2xl font-bold">🧾 Invoice</h1>
               <p className="text-sm text-gray-500">Thank you for your purchase!</p>
            </div>

            {/* User Info */}
            <div className="mb-6">
               <h2 className="text-lg font-semibold mb-1">Customer Information</h2>
               <p><strong>Name:</strong> {user?.displayName || "N/A"}</p>
               <p><strong>Email:</strong> {latestPayment?.userEmail}</p>
               <p><strong>Date:</strong> {new Date(latestPayment?.date).toLocaleString()}</p>
               <p><strong>Transaction ID:</strong> {latestPayment?.transactionId}</p>
            </div>

            {/* Item Table */}
            <div className="mb-6">
               <h2 className="text-lg font-semibold mb-2">Purchased Items</h2>
               <table className="w-full border text-sm">
                  <thead className="bg-gray-100">
                     <tr>
                        <th className="border px-2 py-1 text-left">#</th>
                        <th className="border px-2 py-1 text-left">Medicine</th>
                        <th className="border px-2 py-1 text-left">Generic</th>
                        <th className="border px-2 py-1 text-left">Qty</th>
                     </tr>
                  </thead>
                  <tbody>
                     {latestPayment?.items?.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                           <td className="border px-2 py-1">{index + 1}</td>
                           <td className="border px-2 py-1">{item.name}</td>
                           <td className="border px-2 py-1">{item.generic}</td>
                           <td className="border px-2 py-1">{item.quantity}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Total */}
            <div className="text-right text-lg font-bold">
               Total Paid: <span className="text-green-600">৳{latestPayment?.amount}</span>
            </div>
         </div>

         {/* Print Button */}
         <div className="mt-6 text-center">
            <button
               onClick={handlePrint}
               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
            >
               🖨️ Print / Download PDF
            </button>
         </div>
      </div>
   );
}

export default InvoicePage;
