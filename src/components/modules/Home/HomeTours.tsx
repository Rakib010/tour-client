import { useGetTourQuery } from "@/redux/features/tour/tour.api";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt } from "react-icons/fa";
import SectionHeader from "./SectionHeader";
import { HiArrowRight } from "react-icons/hi";

type TourType = {
  _id: string;
  title: string;
  location: string;
  costFrom: number;
  images: string[];
};

export default function HomeTours() {
  const { data: tourData } = useGetTourQuery({ page: 1, limit: 6 });

  return (
    <section className="py-12 bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="Popular packages"
          title={
            <>
              Featured <span className="text-primary">Tours</span>
            </>
          }
          description="Explore our most popular packages"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourData?.data?.data?.map((tour: TourType) => (
            <div
              key={tour._id}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={tour.images?.[0] || "/placeholder-tour.jpg"}
                  alt={tour.title}
                  className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  <FaMapMarkerAlt className="h-3 w-3" />
                  {tour.location}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                  {tour.title}
                </h3>
                <p className="text-primary font-semibold">
                  From ৳{tour.costFrom?.toLocaleString()}
                </p>
                <Link to={`/tourDetails/${tour._id}`} className="mt-4 block">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
        <Button asChild variant="outline" size="lg">
          <Link to="/tour" className="inline-flex items-center font-semibold gap-2">
          View All Tours
            <HiArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        </div>
        
      </div>
    </section>
  );
}
