import React from 'react';

function LoadingSpinner({ size = 'medium', color = 'text-blue-600' }) {
   const sizeClasses = {
      small: 'h-6 w-6',
      medium: 'h-8 w-8',
      large: 'h-12 w-12'
   };

   return (
      <div className="flex justify-center items-center min-h-[200px]">
         <div className={`animate-spin rounded-full border-t-2 border-b-2 ${color} ${sizeClasses[size]}`}></div>
      </div>
   );
}

export default LoadingSpinner;