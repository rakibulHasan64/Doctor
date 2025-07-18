import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';

function DiscountSection() {
   const { data: medicines = [], isLoading, error } = useQuery({
      queryKey: ['medicines'],
      queryFn: async () => {
         const res = await axios.get('http://localhost:5000/medicines');
         return res.data;
      }
   });

   if (isLoading) return (
      <div className="flex justify-center items-center py-20">
         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
   );

   if (error) return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-8">
         <div className="flex">
            <div className="flex-shrink-0">
               <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
               </svg>
            </div>
            <div className="ml-3">
               <p className="text-sm text-red-700">
                  ডেটা আনতে সমস্যা হয়েছে। দয়া করে পুনরায় চেষ্টা করুন।
               </p>
            </div>
         </div>
      </div>
   );

   const discountedProducts = medicines.filter(item => item.discount > 0);

   return (
      <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
         <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center">
                  <FaFire className="text-3xl text-orange-500 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-800">
                     ডিসকাউন্ট প্রোডাক্টস
                  </h2>
               </div>

               <div className="flex space-x-3">
                  <div className="discount-slider-prev cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-primary hover:text-white transition-colors">
                     <FiArrowLeft className="text-lg" />
                  </div>
                  <div className="discount-slider-next cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-primary hover:text-white transition-colors">
                     <FiArrowRight className="text-lg" />
                  </div>
               </div>
            </div>

            {discountedProducts.length > 0 ? (
               <Swiper 
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation={{
                     nextEl: '.discount-slider-next',
                     prevEl: '.discount-slider-prev',
                  }}
                  pagination={{
                     clickable: true,
                     el: '.discount-pagination',
                     type: 'bullets',
                  }}
                  autoplay={{
                     delay: 3000,
                     disableOnInteraction: false,
                  }}
                  spaceBetween={30}
                  slidesPerView={1}
                  breakpoints={{
                     640: { slidesPerView: 2 },
                     768: { slidesPerView: 3 },
                     1024: { slidesPerView: 4 },
                  }}
                  className="pb-12"
               >
                  {discountedProducts?.map(product => (
                     <SwiperSlide className='py-10' key={product._id}>
                        <div className="bg-white rounded-xl  shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                           <div className="relative">
                              <img
                                 src={product.image}
                                 alt={product.name}
                                 className="w-full h-48 object-cover"
                              />
                              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                 {product.discount}% OFF
                              </div>
                           </div>

                           <div className="p-5 flex-1 flex flex-col">
                              <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
                              <p className="text-sm text-gray-500 mb-2">{product.generic}</p>
                              <p className="text-xs text-gray-400 mb-4">{product.company}</p>

                              <div className="mt-auto">
                                 <div className="flex items-center justify-between">
                                    <div>
                                       <span className="text-gray-400 line-through text-sm">
                                          ৳{product.price.toFixed(2)}
                                       </span>
                                       <span className="block text-xl font-bold text-green-600">
                                          ৳{(product.price * (1 - product.discount / 100)).toFixed(2)}
                                       </span>
                                    </div>
                                    <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                       অর্ডার করুন
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            ) : (
               <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">কোনো ডিসকাউন্ট প্রোডাক্ট পাওয়া যায়নি</h3>
                  <p className="mt-1 text-gray-500">এখনই আমাদের নতুন অফারগুলো দেখতে চেক করুন</p>
               </div>
            )}

            <div className="discount-pagination text-center mt-6"></div>
         </div>
      </section>
   );
}

export default DiscountSection;