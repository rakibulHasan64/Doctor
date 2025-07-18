import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaApple, FaGooglePlay } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { MdHealthAndSafety, MdLocalPharmacy, MdSupportAgent } from 'react-icons/md';
import { BsShieldCheck, BsQuestionCircle } from 'react-icons/bs';

function Footer() {
   const currentYear = new Date().getFullYear();

   return (
      <footer className="bg-gray-900 text-white py-16">
         {/* Main Footer Content */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Top Section: Links and Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
               {/* Column 1: Logo and About */}
               <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-3">
                     <img
                        src="/logo-white.png"
                        alt="Medi-Mart Logo"
                        className="w-12 h-12"
                        onError={(e) => {
                           e.target.onerror = null;
                           e.target.src = 'https://placehold.co/48x48/1a365d/ffffff?text=MM';
                        }}
                     />
                     <div>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                           MediMart
                        </h2>
                        <p className="text-sm text-gray-400">Your Trusted Pharmacy Partner</p>
                     </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                     We connect you with licensed pharmacies nationwide to provide safe, convenient access to medications and healthcare products.
                  </p>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap gap-4 items-center">
                     <div className="flex items-center gap-2 text-sm bg-gray-800 px-3 py-1.5 rounded-full">
                        <BsShieldCheck className="text-blue-400" />
                        <span>Verified Pharmacies</span>
                     </div>
                     <div className="flex items-center gap-2 text-sm bg-gray-800 px-3 py-1.5 rounded-full">
                        <MdHealthAndSafety className="text-green-400" />
                        <span>24/7 Support</span>
                     </div>
                  </div>

                  {/* App Download */}
                  <div className="pt-2">
                     <h3 className="text-lg font-semibold text-gray-200 mb-3">Get Our App</h3>
                     <div className="flex flex-wrap gap-3">
                        <a
                           href="#"
                           className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                        >
                           <FaGooglePlay className="text-blue-400" />
                           <div className="text-left">
                              <p className="text-xs text-gray-400">Get it on</p>
                              <p className="text-sm font-medium">Google Play</p>
                           </div>
                        </a>
                        <a
                           href="#"
                           className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                        >
                           <FaApple className="text-blue-400" />
                           <div className="text-left">
                              <p className="text-xs text-gray-400">Download on</p>
                              <p className="text-sm font-medium">App Store</p>
                           </div>
                        </a>
                     </div>
                  </div>
               </div>

               {/* Column 2: Quick Links */}
               <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                     <MdLocalPharmacy />
                     <span>Quick Links</span>
                  </h3>
                  <ul className="space-y-3">
                     <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 py-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Prescription Drugs
                     </a></li>
                     <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 py-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        OTC Medications
                     </a></li>
                     <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 py-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Health & Wellness
                     </a></li>
                     <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 py-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Medical Supplies
                     </a></li>
                     <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 py-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        COVID-19 Essentials
                     </a></li>
                  </ul>
               </div>

               {/* Column 3: Customer Support */}
               <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                     <MdSupportAgent />
                     <span>Support</span>
                  </h3>
                  <ul className="space-y-3">
                     <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 py-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Order Tracking
                     </a></li>
                     <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 py-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Shipping Policy
                     </a></li>
                     <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 py-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Returns & Refunds
                     </a></li>
                     <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 py-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Privacy Policy
                     </a></li>
                     <li><a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 py-1.5">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        Terms of Service
                     </a></li>
                  </ul>
               </div>

               {/* Column 4: Contact Information */}
               <div className="space-y-6">
                  <div>
                     <h3 className="text-lg font-semibold text-gray-200 mb-4">Contact Us</h3>
                     <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors">
                           <FiMapPin className="text-xl mt-1 flex-shrink-0 text-blue-400" />
                           <span>123 Health St, Wellness City, MedState 45678</span>
                        </li>
                        <li className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                           <FiPhone className="text-lg text-blue-400" />
                           <a href="tel:+1234567890">+1 (234) 567-890</a>
                        </li>
                        <li className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                           <FiMail className="text-lg text-blue-400" />
                           <a href="mailto:support@medimart.com">support@medimart.com</a>
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                        <BsQuestionCircle />
                        <span>Need Help?</span>
                     </h3>
                     <a
                        href="#"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
                     >
                        Live Chat Support
                     </a>
                  </div>
               </div>
            </div>

            {/* Trust and Safety Section */}
            <div className="mt-12 pt-8 border-t border-gray-800">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                     <div className="bg-blue-600 p-2 rounded-full">
                        <MdHealthAndSafety className="text-xl" />
                     </div>
                     <div>
                        <h4 className="font-medium">Certified Pharmacies</h4>
                        <p className="text-xs text-gray-400">Verified partners</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="bg-green-600 p-2 rounded-full">
                        <BsShieldCheck className="text-xl" />
                     </div>
                     <div>
                        <h4 className="font-medium">Secure Payments</h4>
                        <p className="text-xs text-gray-400">Encrypted transactions</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="bg-purple-600 p-2 rounded-full">
                        <FiPhone className="text-xl" />
                     </div>
                     <div>
                        <h4 className="font-medium">24/7 Support</h4>
                        <p className="text-xs text-gray-400">Always available</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="bg-yellow-600 p-2 rounded-full">
                        <FiMapPin className="text-xl" />
                     </div>
                     <div>
                        <h4 className="font-medium">Nationwide</h4>
                        <p className="text-xs text-gray-400">Across the country</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Bar: Copyright and Social Links */}
         <div className="bg-gray-800 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-gray-400 text-center md:text-left">
                     &copy; {currentYear} MediMart. All Rights Reserved. |
                     <a href="#" className="hover:text-white ml-1 transition-colors">Privacy Policy</a> |
                     <a href="#" className="hover:text-white ml-1 transition-colors">Terms of Service</a>
                  </p>

                  <div className="flex items-center gap-5">
                     <span className="text-gray-400 text-sm">Follow us:</span>
                     <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Facebook">
                           <FaFacebook size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
                           <FaTwitter size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram">
                           <FaInstagram size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="LinkedIn">
                           <FaLinkedin size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-colors" aria-label="YouTube">
                           <FaYoutube size={18} />
                        </a>
                     </div>
                  </div>
               </div>

               {/* Payment Methods */}
               <div className="mt-4 flex justify-center md:justify-end">
                  <div className="flex flex-wrap gap-3 items-center">
                     <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg" alt="Visa" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
                     <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg" alt="Mastercard" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
                     <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg" alt="PayPal" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
                     <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="Apple Pay" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
                     <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google Pay" className="h-6 opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}

export default Footer;