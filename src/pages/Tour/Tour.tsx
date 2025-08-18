import { useGetTourQuery } from "@/redux/features/tour/tour.api";
import TourBanner from "./TourBanner";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
type TourType = {
  _id: string;
  title: string;
  location: string;
  costFrom: number;
  images: string[];
  description: string;
};

export default function Tour() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const { data: tourData } = useGetTourQuery({ page: currentPage, limit });

  const totalPage = tourData?.data?.meta?.totalPage || 1;

  return (
    <div className="bg-gray-50">
      <TourBanner />

      {/* All Tours Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-emerald-50">
        {/* Heading with travel-inspired design */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            Explore <span className="text-emerald-600">World Wonders</span>
          </h2>
          <div className="flex justify-center">
            <div className="w-20 h-1 bg-emerald-400 rounded-full"></div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tourData?.data?.data?.map((tour: TourType, index: number) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Image with overlay effect */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={tour.images[0]}
                  alt={tour.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-700"
                />

                {/* Location tag with travel pin icon */}
                <div className="absolute top-4 left-4 bg-white text-emerald-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center">
                  <FaMapMarkerAlt className="h-4 w-4 mr-1 text-emerald-500" />
                  {tour.location}
                </div>

                {/* Price with nature-inspired design */}
                <div className="absolute bottom-4 right-4 bg-emerald-600 text-white px-3 py-2 rounded-lg font-bold text-sm shadow-lg">
                  From ৳{tour.costFrom}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition">
                  {tour.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {tour.description}
                </p>

                {/* Button with travel-themed hover effect */}
                <Link to={`/tourDetails/${tour._id}`}>
                  <button className="w-full bg-emerald-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-md hover:shadow-emerald-200 flex items-center justify-center">
                    Discover Tour
                    <FaArrowRight className="h-5 w-5 ml-2" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* pagination */}
      <div className="my-12">
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
