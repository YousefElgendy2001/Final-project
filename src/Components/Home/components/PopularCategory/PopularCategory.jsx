import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../../Context/ThemeContext/ThemeContext";
import Slider from "react-slick";
import axios from "axios";

export default function PopularCategory() {
  const [PopularCategory, setPopularCategory] = useState([]);
  const { darkMode } = useContext(ThemeContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    centerMode: false,
    adaptiveHeight: true,
    slidesToShow: 7, // الافتراضي
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280, // الشاشات الكبيرة (مثلاً لابتوب كبير)
        settings: { slidesToShow: 5 }
      },
      {
        breakpoint: 1024, // شاشات التابلت الأفقي
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768, // شاشات التابلت العمودي
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 640, // شاشات الموبايل الكبيرة
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480, // شاشات الموبايل الصغيرة
        settings: { slidesToShow: 1 }
      }
    ],
    appendDots: (dots) => (
      <div className="p-2">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    dotsClass: `slick-dots ${darkMode ? "dark-dots" : "light-dots"}`
  };
  

  async function getCategory() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setPopularCategory(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">Shop Popular Category</h2>
      {PopularCategory.length > 0 ? ( 
        <Slider {...settings}>
          {PopularCategory.map((category) => (
            <div key={category._id} className="text-center my-7">
             <img
  src={category.image}
  alt={category.name}
  className="w-28 h-28 sm:w-24 sm:h-24 object-cover mx-auto rounded-md transition-transform hover:scale-110"
/>
<h2 className="text-main mt-2 text-sm sm:text-base md:text-lg font-semibold">
  {category.name}
</h2>

            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">Loading Shop Popular Category</p>
      )}
    </div>
  );
}
