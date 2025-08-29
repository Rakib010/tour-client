import { FaHome, FaChevronDown } from "react-icons/fa";
import tour from "../../assets/images/Tours.jpg";

export default function TourBanner() {
  return (
    <section
      className="relative h-[335px] md:h-[490px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${tour})`,
      }}
    >
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>

      {/* Content with travel-inspired design */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Breadcrumb with travel icon */}
        <div className="flex items-center justify-center text-sm md:text-base text-gray-100 mb-4 tracking-wider">
          <FaHome className="h-4 w-4 mr-2 text-emerald-300" />
          <span className="opacity-90">Home</span>
          <span className="mx-2 opacity-70">/</span>
          <span className="text-emerald-300 font-medium">Destinations</span>
        </div>

        {/* Main heading with travel theme */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          Discover Your{" "}
          <span className="text-emerald-300">Perfect Getaway</span>
        </h1>

        {/* Subheading with subtle animation */}
        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto opacity-90 animate-fade-in">
          Explore breathtaking destinations tailored to your travel dreams
        </p>

        {/* Search-inspired decorative element */}
        <div className="mt-8 relative max-w-md mx-auto ">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full"></div>
          <div className="relative flex items-center  justify-between p-2 pl-6 pr-2">
            <span className="text-gray-200 text-sm md:text-base ">
              Where would you like to go?
            </span>
          </div>
        </div>
      </div>

      {/* Scrolling indicator for larger screens */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="animate-bounce">
          <FaChevronDown className="h-6 w-6 text-emerald-300" />
        </div>
      </div>
    </section>
  );
}
