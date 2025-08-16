import { HiArrowRight, HiLightningBolt } from "react-icons/hi";
import tourType1 from "../../../assets/images/tourType1.avif";
import tourType2 from "../../../assets/images/tourType2.jpg";
import tourType3 from "../../../assets/images/tourType2.avif";
import tourType5 from "../../../assets/images/tourType4.avif";
import tourType6 from "../../../assets/images/tourType5.avif";

const categories = [
  {
    title: "Adventure Tours",
    image: tourType1,
  },
  {
    title: "Cultural Tours",
    image: tourType2,
  },
  {
    title: "Beach Getaways",
    image: tourType3,
  },
  {
    title: "Family Vacations",
    image: tourType5,
  },
  {
    title: "Wildlife Expeditions",
    image: tourType6,
  },
];

const TourCategories = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-emerald-50 to-white">
      {/* Heading with decorative elements */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-emerald-500 font-medium tracking-wider mb-2 flex items-center justify-center">
          <HiLightningBolt className="h-5 w-5 mr-2" />
          EXPLORE OUR COLLECTIONS
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Discover <span className="text-emerald-600">Tour Categories</span>
        </h2>
        <div className="w-20 h-1 bg-emerald-400 mx-auto mb-10 rounded-full"></div>
      </div>

      {/* Categories grid with hover effects */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {categories.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {/* Image with overlay */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
              <h3 className="text-white font-bold text-lg group-hover:text-emerald-300 transition">
                {item.title}
              </h3>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition duration-300">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center transition">
                Explore
                <HiArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View all button */}
      <div className="text-center mt-12">
        <button className="bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white border-2 border-emerald-500 px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-300 flex items-center mx-auto">
          View All Categories
          <HiArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </section>
  );
};

export default TourCategories;
