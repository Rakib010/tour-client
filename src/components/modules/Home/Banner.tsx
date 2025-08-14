import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import "../../../style.css";

import b2 from "../../../assets/images/b1.avif";
import b3 from "../../../assets/images/banner2.1.avif";
import b4 from "../../../assets/images/Tours.jpg";

import { Pagination, Autoplay } from "swiper/modules";

export default function Banner() {
  return (
    <div className="w-full relative">
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {[b2, b3, b4].map((img, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[550px] lg:h-[600px] rounded-full">
              <img
                src={img}
                alt={`banner-${i}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay for better text visibility */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
