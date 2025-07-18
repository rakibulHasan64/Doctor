



// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown } from "lucide-react";

// const faqs = [
//    {
//       question: "কিভাবে আমি ওষুধ অর্ডার করবো?",
//       answer: "আপনার প্রোফাইল থেকে প্রেসক্রিপশন আপলোড করে অথবা সার্চ করে ওষুধ অর্ডার করতে পারেন।",
//    },
//    {
//       question: "আমি কিভাবে বিশেষজ্ঞের পরামর্শ নিতে পারি?",
//       answer: "লাইভ চ্যাট বা বুক অ্যাপয়েন্টমেন্ট অপশন থেকে আপনি বিশেষজ্ঞদের সঙ্গে যোগাযোগ করতে পারেন।",
//    },
//    {
//       question: "পেমেন্ট করার পদ্ধতি কী কী?",
//       answer: "আপনি বিকাশ, নগদ, ক্রেডিট/ডেবিট কার্ড ও ক্যাশ অন ডেলিভারি ব্যবহার করতে পারেন।",
//    },
//    {
//       question: "ডেলিভারিতে কত সময় লাগে?",
//       answer: "সাধারণত শহরের মধ্যে ২৪ ঘণ্টা ও বাইরে ২-৩ কার্যদিবস লাগে।",
//    },
// ];

// function FiqSetion() {
//    const [openIndex, setOpenIndex] = useState(null);

//    const toggle = (index) => {
//       setOpenIndex(openIndex === index ? null : index);
//    };

//    return (
//       <section className="bg-gray-50 py-16 px-6 md:px-20">
//          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">সচরাচর জিজ্ঞাসা (FAQ)</h2>
//          <div className="max-w-3xl mx-auto space-y-4">
//             {faqs.map((faq, index) => (
//                <div
//                   key={index}
//                   className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-md transition"
//                >
//                   <button
//                      onClick={() => toggle(index)}
//                      className="w-full px-6 py-4 flex justify-between items-center text-left text-gray-800 font-medium"
//                   >
//                      <span>{faq.question}</span>
//                      <motion.div
//                         animate={{ rotate: openIndex === index ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                      >
//                         <ChevronDown />
//                      </motion.div>
//                   </button>
//                   <AnimatePresence>
//                      {openIndex === index && (
//                         <motion.div
//                            key="answer"
//                            initial={{ height: 0, opacity: 0 }}
//                            animate={{ height: "auto", opacity: 1 }}
//                            exit={{ height: 0, opacity: 0 }}
//                            transition={{ duration: 0.3 }}
//                            className="px-6 pb-4 text-gray-600"
//                         >
//                            <p>{faq.answer}</p>
//                         </motion.div>
//                      )}
//                   </AnimatePresence>
//                </div>
//             ))}
//          </div>
//       </section>
//    );
// }

// export default FiqSetion;




import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
   {
      question: "কিভাবে আমি ওষুধ অর্ডার করবো?",
      answer: "আপনার প্রোফাইল থেকে প্রেসক্রিপশন আপলোড করে অথবা সার্চ করে ওষুধ অর্ডার করতে পারেন।",
      icon: "💊"
   },
   {
      question: "আমি কিভাবে বিশেষজ্ঞের পরামর্শ নিতে পারি?",
      answer: "লাইভ চ্যাট বা বুক অ্যাপয়েন্টমেন্ট অপশন থেকে আপনি বিশেষজ্ঞদের সঙ্গে যোগাযোগ করতে পারেন।",
      icon: "👨‍⚕️"
   },
   {
      question: "পেমেন্ট করার পদ্ধতি কী কী?",
      answer: "আপনি বিকাশ, নগদ, ক্রেডিট/ডেবিট কার্ড ও ক্যাশ অন ডেলিভারি ব্যবহার করতে পারেন।",
      icon: "💳"
   },
   {
      question: "ডেলিভারিতে কত সময় লাগে?",
      answer: "সাধারণত শহরের মধ্যে ২৪ ঘণ্টা ও বাইরে ২-৩ কার্যদিবস লাগে।",
      icon: "🚚"
   },
   {
      question: "রিটার্ন পলিসি কী?",
      answer: "অপ্রয়োজনীয় ওষুধ ৩ দিনের মধ্যে রিটার্ন করা যাবে, তবে প্রেসক্রিপশন ওষুধ রিটার্ন করা যাবে না।",
      icon: "🔄"
   },
   {
      question: "কিভাবে অ্যাকাউন্ট তৈরি করব?",
      answer: "মোবাইল নাম্বার দিয়ে রেজিস্ট্রেশন করে ভেরিফিকেশন কোড দিয়ে অ্যাকাউন্ট একটিভ করতে পারবেন।",
      icon: "📱"
   }
];

function FiqSetion() {
   const [openIndex, setOpenIndex] = useState(null);

   const toggle = (index) => {
      setOpenIndex(openIndex === index ? null : index);
   };

   return (
      <section className="bg-gradient-to-b from-blue-100 to-white py-20 px-4 sm:px-6 lg:px-8 ">
         <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               viewport={{ once: true }}
               className="text-center mb-14"
            >
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  সচরাচর জিজ্ঞাসা
               </h2>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  আপনার সাধারণ প্রশ্নগুলোর উত্তর এখানে পাবেন
               </p>
            </motion.div>

            {/* FAQ Items */}
            <div className="space-y-4">
               {faqs.map((faq, index) => (
                  <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.4, delay: index * 0.1 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                     <button
                        onClick={() => toggle(index)}
                        className={`w-full px-6 py-5 flex items-center justify-between text-left transition-colors ${openIndex === index ? 'bg-blue-50 rounded-t-xl' : ''}`}
                     >
                        <div className="flex items-center gap-4">
                           <span className="text-2xl">{faq.icon}</span>
                           <span className="text-lg font-medium text-gray-800">
                              {faq.question}
                           </span>
                        </div>
                        <motion.div
                           animate={{ rotate: openIndex === index ? 180 : 0 }}
                           transition={{ duration: 0.3 }}
                           className={`p-1 rounded-full ${openIndex === index ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                        >
                           <ChevronDown size={20} />
                        </motion.div>
                     </button>

                     <AnimatePresence>
                        {openIndex === index && (
                           <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{
                                 opacity: 1,
                                 height: "auto",
                                 transition: {
                                    opacity: { duration: 0.3 },
                                    height: { duration: 0.4 }
                                 }
                              }}
                              exit={{
                                 opacity: 0,
                                 height: 0,
                                 transition: {
                                    opacity: { duration: 0.2 },
                                    height: { duration: 0.3 }
                                 }
                              }}
                              className="overflow-hidden"
                           >
                              <div className="px-6 pb-6 pt-2 text-gray-600 flex gap-6">
                                 <div className="flex-1">
                                    <p>{faq.answer}</p>
                                    {index === 0 && (
                                       <button className="mt-4 text-blue-600 hover:underline text-sm font-medium">
                                          প্রেসক্রিপশন আপলোড গাইড দেখুন →
                                       </button>
                                    )}
                                 </div>
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </motion.div>
               ))}
            </div>

            {/* CTA Section */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               viewport={{ once: true }}
               className="mt-16 text-center"
            >
               <h3 className="text-xl font-medium text-gray-800 mb-4">
                  আরো প্রশ্ন আছে?
               </h3>
               <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  আমাদের সাথে যোগাযোগ করুন
               </button>
            </motion.div>
         </div>
      </section>
   );
}

export default FiqSetion;