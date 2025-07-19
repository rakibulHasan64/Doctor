import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaPills, FaIndustry, FaTag, FaWeight, FaInfoCircle, FaMoneyBillWave, FaPercentage } from "react-icons/fa";

function DetailsPage() {
   const { id } = useParams();
   const axiosSecure = useAxiosSecure();

   const { data: med, isLoading, error } = useQuery({
      queryKey: ["medicine", id],
      queryFn: async () => {
         const res = await axiosSecure.get(`/medicines/${id}`);
         return res.data;
      },
   });

   if (isLoading) return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
   );

   if (error) return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
            <p>ডাটা আনতে সমস্যা হয়েছে!</p>
         </div>
      </div>
   );

   return (
      <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8 mt-30">
         <div className="max-w-4xl mx-auto"> 
            <Link to={-1}><h4 className="text-2xl">x</h4></Link> 

           <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
               {/* Medicine Image */}
               <div className="md:flex">
                  <div className="md:w-1/2 p-4">
                     <img
                        src={med.image}
                        alt={med.name}
                        className="w-full h-80 md:h-full object-contain rounded-lg border border-gray-200"
                     />
                  </div>

                  {/* Medicine Details */}
                  <div className="md:w-1/2 p-6">
                     <h1 className="text-3xl font-bold text-gray-800 mb-2">{med.name}</h1>
                     <p className="text-lg text-gray-600 mb-6">{med.generic}</p>

                     {/* Price Section */}
                     <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <div className="flex justify-between items-center">
                           <span className="text-2xl font-bold text-gray-800">
                              {med.price} ৳
                           </span>
                           {med.discount > 0 && (
                              <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                 {med.discount} ৳ ছাড়
                              </span>
                           )}
                        </div>
                        <p className={`mt-2 text-sm ${med.quntity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                           {med.quntity > 0 ? `স্টকে আছে (${med.quntity} ${med.massUnit})` : 'স্টকে নেই'}
                        </p>

                     </div>

                     {/* Details List */}
                     <div className="space-y-4">
                        <div className="flex items-start">
                           <FaIndustry className="text-gray-500 mt-1 mr-3 flex-shrink-0" />
                           <div>
                              <p className="text-sm text-gray-500">কোম্পানি</p>
                              <p className="text-gray-800">{med.company}</p>
                           </div>
                        </div>

                        <div className="flex items-start">
                           <FaTag className="text-gray-500 mt-1 mr-3 flex-shrink-0" />
                           <div>
                              <p className="text-sm text-gray-500">ক্যাটাগরি</p>
                              <p className="text-gray-800 capitalize">{med.category}</p>
                           </div>
                        </div>

                        <div className="flex items-start">
                           <FaWeight className="text-gray-500 mt-1 mr-3 flex-shrink-0" />
                           <div>
                              <p className="text-sm text-gray-500">ওজন</p>
                              <p className="text-gray-800">{med.massUnit}</p>
                           </div>
                        </div>
                     </div>

                     {/* Description */}
                     <div className="mt-6">
                        <div className="flex items-center mb-2">
                           <FaInfoCircle className="text-gray-500 mr-2" />
                           <h3 className="text-lg font-semibold text-gray-700">বিবরণ</h3>
                        </div>
                        <p className="text-gray-600 text-justify">{med.description}</p>
                     </div>

                     {/* Action Buttons */}
                     <div className="mt-8 flex space-x-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200">
                           অর্ডার করুন
                        </button>
                        <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium transition duration-200">
                           Wishlist
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default DetailsPage;