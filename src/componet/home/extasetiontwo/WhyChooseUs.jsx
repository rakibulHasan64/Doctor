

import React from 'react';
import { FiFileText, FiMessageSquare, FiTag, FiClock, FiArrowRight } from 'react-icons/fi';

function WhyChooseUs() {
   // We are using react-icons for a professional look instead of emojis.
   const services = [
      {
         title: "অনলাইন প্রেসক্রিপশন",
         desc: "ডিজিটাল প্রেসক্রিপশন আপলোড করে সহজেই ওষুধ অর্ডার করুন।",
         icon: <FiFileText className="h-8 w-8 text-teal-500" />,
         bgColor: "bg-teal-100",
         hoverColor: "hover:bg-teal-100",
      },
      {
         title: "লাইভ চ্যাট সাপোর্ট",
         desc: "বিশেষজ্ঞদের সাথে সরাসরি চ্যাট করে আপনার প্রশ্ন জিজ্ঞাসা করুন।",
         icon: <FiMessageSquare className="h-8 w-8 text-blue-500" />,
         bgColor: "bg-blue-100",
         hoverColor: "hover:bg-blue-100",
      },
      {
         title: "সাশ্রয়ী মূল্য",
         desc: "আমরা প্রতিযোগিতামূলক মূল্যে সেরা মানের মেডিসিন ও হেলথ প্রোডাক্টস সরবরাহ করি।",
         icon: <FiTag className="h-8 w-8 text-purple-500" />,
         bgColor: "bg-purple-100",
         hoverColor: "hover:bg-purple-100",
      },
      {
         title: "রেগুলার রিমাইন্ডার",
         desc: "আপনার ওষুধ খাওয়ার সঠিক সময় মনে করিয়ে দেওয়ার জন্য আমাদের রিমাইন্ডার সার্ভিস।",
         icon: <FiClock className="h-8 w-8 text-orange-500" />,
         bgColor: "bg-orange-100",
         hoverColor: "hover:bg-orange-100",
      },
   ];

   return (
      <section className="bg-gray-50 font-sans py-16 sm:py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center">
               <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">আমাদের প্রতিশ্রুতি</h2>
               <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  আপনার স্বাস্থ্যের জন্য সেরা সেবাসমূহ
               </p>
               <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                  আমরা আপনার স্বাস্থ্য সুরক্ষায় আধুনিক এবং নির্ভরযোগ্য সেবা প্রদান করতে প্রতিশ্রুতিবদ্ধ।
               </p>
            </div>

            {/* Services Grid */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {services.map((service, index) => (
                  <div
                     key={index}
                     className={`group p-6 rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2 ${service.bgColor} ${service.hoverColor}`}
                  >
                     <div className="flex justify-between items-start">
                        {/* Icon */}
                        <div className={`p-3 rounded-full bg-white shadow-sm`}>
                           {service.icon}
                        </div>
                        {/* Arrow Icon on Hover */}
                        <FiArrowRight className="h-6 w-6 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                     </div>

                     {/* Content */}
                     <div className="mt-6">
                        <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                        <p className="mt-2 text-gray-600 text-base">{service.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}

export default WhyChooseUs;



