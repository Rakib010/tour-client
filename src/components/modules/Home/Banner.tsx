import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../../../style.css";

import b2 from "../../../assets/images/b1.avif";
import b3 from "../../../assets/images/b4.jpg";
import b4 from "../../../assets/images/b5.jpg";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export default function Banner() {
  return (
    <div className="w-full">
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
            <div className="w-full h-[500px] lg:h-[650px]">
              <img
                src={img}
                alt={`banner-${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
