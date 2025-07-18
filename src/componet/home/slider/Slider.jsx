import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

function Slider() {
   const axiosInstance = useAxiosSecure();
   const [banners, setBanners] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      axiosInstance.get('/banners').then(res => {
         const activeBanners = res.data.filter(b => b.active);
         setBanners(activeBanners);
         setLoading(false);
      });
   }, [axiosInstance]);

   if (loading) return <div className="text-center py-10">Loading banners...</div>;

   if (banners.length === 0) {
      return <div className="text-center py-10 text-gray-500">No active banners to display.</div>;
   }

   return (
      <div className="mx-auto my-6 mt-10">
         <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="rounded-xl overflow-hidden"
         >
            {banners.map((item, index) => (
               <SwiperSlide key={index}>
                  <div className="relative py-9">
                     <img
                        src={item.image || "https://via.placeholder.com/800x400?text=No+Image"}
                        alt={item.title}
                        className="w-full h-[400px] object-cover"
                     />
                     <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-white p-4">
                        <h2 className="text-2xl font-bold mb-2 text-center">{item.title}</h2>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
}

export default Slider;
