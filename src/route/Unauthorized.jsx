

import { useNavigate } from "react-router-dom";
import { FaLock, FaHome, FaEnvelope } from "react-icons/fa";

function Unauthorized() {
   const navigate = useNavigate();

   return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
         <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center">
               <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                  <FaLock className="h-8 w-8 text-red-600" />
               </div>
               <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Access Denied
               </h2>
               <p className="mt-2 text-center text-lg text-gray-600">
                  You don't have permission to access this page
               </p>
            </div>

            <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
               <div className="text-center">
                  <p className="text-red-600 font-medium mb-6">
                     This page is restricted to admin users only.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                     <button
                        onClick={() => navigate('/')}
                        className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                     >
                        <FaHome className="mr-2" />
                        Go to Home
                     </button>

                     <button
                        onClick={() => window.location.href = 'mailto:admin@example.com'}
                        className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                     >
                        <FaEnvelope className="mr-2" />
                        Request Access
                     </button>
                  </div>
               </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
               <p>
                  If you believe this is an error, please contact your system administrator.
               </p>
            </div>
         </div>
      </div>
   );
}

export default Unauthorized;
