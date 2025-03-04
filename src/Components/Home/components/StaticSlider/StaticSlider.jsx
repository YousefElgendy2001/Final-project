import React, { useContext } from "react";
import { ThemeContext } from "../../../../Context/ThemeContext/ThemeContext";
import Slider from "react-slick";
import slider1 from "../../../../../public/images/slider1.jpeg";
import slider2 from "../../../../../public/images/slider2.jpeg";
import slider3 from "../../../../../public/images/slider3.jpeg";
import static1 from "../../../../../public/images/static1.jpeg";
import static2 from "../../../../../public/images/static2.jpeg";

export default function StaticSlider() {
  const { darkMode } = useContext(ThemeContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000, 
    adaptiveHeight: true,
    appendDots: (dots) => (
      <div className="p-2">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    dotsClass: `slick-dots ${darkMode ? "dark-dots" : "light-dots"}`
  };

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-12 gap-4">
        {/* ✅ السليدر ياخد 9/12 من عرض الشاشة */}
        <div className="col-span-12 md:col-span-9">
          <Slider {...settings}>
            <div>
              <img src={slider1} alt="Slide 1" className="w-full h-64 object-cover rounded-lg" />
            </div>
            <div>
              <img src={slider2} alt="Slide 2" className="w-full h-64 object-cover rounded-lg" />
            </div>
            <div>
              <img src={slider3} alt="Slide 3" className="w-full h-64 object-cover rounded-lg" />
            </div>
          </Slider>
        </div>

        {/* ✅ الصور الثابتة بجانب السليدر (3/12 من العرض) */}
        <div className="col-span-12 md:col-span-3 flex flex-col  gap-4">
          <img src={static1} alt="Static 1" className="w-full h-32 object-cover rounded-lg" />
          <img src={static2} alt="Static 2" className="w-full h-32 object-cover rounded-lg" />
        </div>
      </div>
    </div>
  );
}
