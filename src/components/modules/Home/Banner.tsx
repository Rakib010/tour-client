import { Swiper, SwiperSlide } from "swiper/react";
// @ts-expect-error - CSS modules from swiper
import "swiper/css";
// @ts-expect-error - CSS modules from swiper
import "swiper/css/pagination";

import "../../../style.css";

import b2 from "../../../assets/images/b1.avif";
import b3 from "../../../assets/images/banner2.1.avif";
import b4 from "../../../assets/images/Tours.jpg";

import { Pagination, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="w-full relative">
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {[b2, b3, b4].map((img, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[550px] lg:h-[600px] overflow-hidden">
              {/* Background Image */}
              <img
                src={img}
                alt={`banner-${i}`}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col items-start justify-center px-8 lg:px-20 text-white space-y-4">
                <h4 className="text-lg lg:text-xl font-medium uppercase tracking-widest text-emerald-300">
                  Your Journey Begins Here
                </h4>
                <h2 className="text-3xl lg:text-6xl font-bold leading-snug drop-shadow-md">
                  Explore the World <br /> With{" "}
                  <span className="text-emerald-400">Confidence</span>
                </h2>
                <p className="text-base lg:text-lg opacity-90 max-w-2xl">
                  Discover breathtaking destinations, experience new cultures,
                  and create unforgettable memories with our premium tour
                  packages.
                </p>
                <div className="flex gap-4 mt-4">
                  <Button asChild>
                    <Link to="/tour">Book Now</Link>
                  </Button>
                  <Button  className="border-white text-white hover:bg-white hover:text-black" asChild>
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
