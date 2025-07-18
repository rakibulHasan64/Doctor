// components/AllMedicine.js
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


function AllMedicine() {
   const axiosSecure = useAxiosSecure();
   const { user, loading } = useAuth();

   const { data: medicines = [], isLoading, error } = useQuery({
      queryKey: ["medicines", user?.email],
      enabled: !!user?.email,
      queryFn: async () => {
         const res = await axiosSecure.get(`/user-data-medicines?email=${user.email}`);
         return res.data;
      },
   });

   if (loading || isLoading) return <div>Loading...</div>;
   if (error) return <div>Error loading medicines</div>;

   return (
      <div className="p-6 max-w-5xl mx-auto">
         <h2 className="text-2xl font-bold mb-4 text-center">Your Medicines</h2>
         {medicines?.length === 0 ? (
            <p className="text-center">No medicines found for {user.email}</p>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {medicines?.map((item) => (
                  <div key={item._id} className="border p-4 rounded-lg shadow">
                     <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
                     <h3 className="font-semibold text-lg">{item.name}</h3>
                     <p className="text-sm text-gray-600">{item.generic}</p>
                     <p>Company: {item.company}</p>
                     <p>
                        Quantity: {item.quntity} {item.massUnit}
                     </p>
                     <p>Price: ${item.price}</p>
                     <p>Discount: {item.discount}%</p>
                     <span
                        className={`inline-block px-3 py-1 rounded-full text-sm ${item.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                           }`}
                     >
                        {item.status}
                     </span>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
}

export default AllMedicine;
