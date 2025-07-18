import React, { useState } from "react";
import AddMedicineModal from "./AddMedicineModal";

function SellerMedicineManage() {
   const [showModal, setShowModal] = useState(false);

   return (
      <div className="p-6">
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Manage Your Medicines</h2>
            <button className="btn btn-success" onClick={() => setShowModal(true)}>Add Medicine</button>
         </div>

         {/* Other medicine table content goes here */}

         <AddMedicineModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
   );
}

export default SellerMedicineManage;
