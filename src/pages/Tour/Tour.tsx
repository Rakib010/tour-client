import { useGetTourQuery } from "@/redux/features/tour/tour.api";
import TourBanner from "./TourBanner";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import TourFilters from "./TourFilters";

type TourType = {
  _id: string;
  title: string;
  location: string;
  costFrom: number;
  images: string[];
  description: string;
};

export default function Tour() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(9);

  const division = searchParams.get("division") || undefined;
  const tourType = searchParams.get("tourType") || undefined;
  const searchTerm = searchParams.get("searchTerm") || "";

  const { data: tourData, isLoading } = useGetTourQuery({
    division,
    tourType,
    searchTerm,
    page: currentPage,
    limit,
  });

  const totalPage = tourData?.data?.meta?.totalPage || 1;

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
      </div>
    );

  return (
    <div className="bg-gray-50">
      <TourBanner />

      {/* All Tours Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-emerald-50">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            Explore <span className="text-emerald-600">World Wonders</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Find your dream destination with tailored tours designed for you.
          </p>
          <div className="flex justify-center mt-4">
            <div className="w-20 h-1 bg-emerald-400 rounded-full"></div>
          </div>
        </div>

        {/* Layout with Filters + Tours */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Filters */}
          <div className="md:col-span-1">
            <TourFilters />
          </div>

          {/* Tour Cards */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourData?.data?.data?.map((tour: TourType, index: number) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden border border-gray-100 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={tour.images[0]}
                    alt={tour.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  {/* Location Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold shadow flex items-center">
                    <FaMapMarkerAlt className="h-4 w-4 mr-1 text-emerald-500" />
                    {tour.location}
                  </div>
                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-emerald-600 text-white px-3 py-2 rounded-lg font-semibold text-sm shadow-md">
                    From ৳{tour.costFrom}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition">
                    {tour.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                    {tour.description}
                  </p>

                  <Link to={`/tourDetails/${tour._id}`}>
                    <button className="w-full bg-emerald-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-emerald-600 transition-all duration-300 shadow hover:shadow-emerald-200 flex items-center justify-center">
                      Discover Tour
                      <FaArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* pagination */}
      <div className="my-12 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPage }, (_, index) => index + 1).map(
              (page) => (
                <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                  <PaginationLink isActive={currentPage === page}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={
                  currentPage === totalPage
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
