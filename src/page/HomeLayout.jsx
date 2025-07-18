import React from 'react';
import Slider from '../componet/home/slider/Slider';
import WhyChooseUs from '../componet/home/extasetiontwo/WhyChooseUs';
import FiqSetion from '../componet/home/extasetiontwo/FiqSetion';
import DiscountSetion from '../componet/home/DiscountSetion';

function HomeLayout() {
   return (
      <div>

         <Slider />
         <DiscountSetion />
         <WhyChooseUs />
         <FiqSetion />
         
      </div>
   );
}

export default HomeLayout;