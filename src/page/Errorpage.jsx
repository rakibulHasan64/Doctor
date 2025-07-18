import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiHome, FiSearch, FiMail } from 'react-icons/fi';

function ErrorPage() {

   const navigate = useNavigate();
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
         className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center justify-center p-6"
      >
         <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-red-100 p-6 text-center">
               <div className="flex justify-center mb-4">
                  <FiAlertTriangle className="text-red-500 text-5xl animate-pulse" />
               </div>
               <h1 className="text-3xl font-bold text-gray-800">404 - Page Not Found</h1>
               <p className="text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
            </div>

            {/* Content */}
            <div className="p-8">
               <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8 text-center"
               >
                  <img
                     src="https://illustrations.popsy.co/amber/page-not-found.svg"
                     alt="404 illustration"
                     className="w-64 h-64 mx-auto"
                  />
               </motion.div>

               <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800 text-center">What you can do:</h2>

                  <button
                     onClick={() => navigate(-1)}
                     className="flex items-center w-full justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                     <FiHome /> Go Back
                  </button>

                  <Link
                     
                     className="flex items-center justify-center gap-2 border border-gray-300 hover:border-blue-500 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                     <FiSearch /> Search for content
                  </Link>

                  <Link
                     
                     className="flex items-center justify-center gap-2 border border-gray-300 hover:border-blue-500 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                     <FiMail /> Contact Support
                  </Link>
               </div>

               <div className="mt-8 text-center text-sm text-gray-500">
                  <p>Error code: 404</p>
                  <p className="mt-1">If this persists, please let us know</p>
               </div>
            </div>
         </div>
      </motion.div>
   );
}

export default ErrorPage;