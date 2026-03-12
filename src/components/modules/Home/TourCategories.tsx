import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { Button } from "@/components/ui/button";
import { homeTourCategories } from "@/constants/home/tourCategories";

const TourCategories = () => {
  return (
    <section className="py-12 px-4 sm:px-6 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background">
      <div className="max-w-[1280px] mx-auto">
        <SectionHeader
          badge="Explore our collections"
          title={
            <>
              Discover <span className="text-primary">Tour Categories</span>
            </>
          }
          description="Find your perfect trip from our curated collections"
        />

        {/* Categories grid - static data comes from constants/home/tourCategories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {homeTourCategories.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-border transition-all duration-300"
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
              <Link
                to={`/tour?searchTerm=${encodeURIComponent(item.searchTerm)}`}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full font-medium text-sm flex items-center transition"
              >
                Explore
                <HiArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
        </div>

        <div className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/categories" className="inline-flex items-center font-semibold gap-2">
            All Categories
            <HiArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
    </section>
  );
};

export default TourCategories;
