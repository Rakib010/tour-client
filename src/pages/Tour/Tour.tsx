import { useGetTourQuery } from "@/redux/features/tour/tour.api";
import { useGetTourTypesQuery } from "@/redux/features/tourType/tourType.api";
import TourFilters from "./TourFilters";
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

  const { data: tourTypeData } = useGetTourTypesQuery({
    limit: 1000,
    fields: "_id,name",
  });

  const selectedTourTypeName =
    tourTypeData?.data?.find(
      (item: { _id: string; name: string }) => item._id === tourType
    )?.name || "";

  const normalizedCategory = selectedTourTypeName.toLowerCase();

  const heroImageUrl =
    (normalizedCategory.includes("beach") &&
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&q=80&auto=format&fit=crop") ||
    (normalizedCategory.includes("mountain") &&
      "https://images.unsplash.com/photo-1508261306211-45a1c5c2a5c5?w=1200&q=80&auto=format&fit=crop") ||
    (normalizedCategory.includes("city") &&
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80&auto=format&fit=crop") ||
    (normalizedCategory.includes("desert") &&
      "https://images.unsplash.com/photo-1508261306211-45a1c5c2a5c5?w=1200&q=80&auto=format&fit=crop") ||
    (normalizedCategory.includes("island") &&
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&q=80&auto=format&fit=crop") ||
    (normalizedCategory.includes("forest") &&
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop") ||
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80&auto=format&fit=crop";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        {/* Hero + filters */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 lg:gap-8 mb-10">
          {/* Left: hero changing by category */}
          <aside className="space-y-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-emerald-900/10 aspect-[4/3] sm:aspect-[3/2]">
              <img
                src={heroImageUrl}
                alt="Travel destination"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-end p-5 sm:p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200/80 mb-1">
                    {selectedTourTypeName || "Featured journeys"}
                  </p>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                    Where would you like to go?
                  </h1>
                </div>
              </div>
            </div>

            <TourFilters />
          </aside>

          {/* Right: tour cards */}
          <section className="min-w-0">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-50">
                Available tours
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Browse curated trips tailored to your interests and filters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {tourData?.data?.data?.map((tour: TourType) => (
                <Link
                  key={tour._id}
                  to={`/tourDetails/${tour._id}`}
                  className="group block"
                >
                  <article className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-emerald-200/80 dark:hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
                    {/* Image container - improved aspect ratio */}
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <img
                        src={tour.images?.[0] || "/placeholder-tour.jpg"}
                        alt={tour.title}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      {/* Subtle gradient overlay - always visible for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Location pill */}
                      <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/95 backdrop-blur-md text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md border border-white/50">
                        <FaMapMarkerAlt className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate max-w-[120px]">{tour.location}</span>
                      </div>
                      {/* Price badge - refined */}
                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-emerald-700 px-4 py-2 rounded-xl font-bold text-sm shadow-lg border border-white/50 ring-1 ring-emerald-500/20">
                        From ৳{tour.costFrom?.toLocaleString?.() ?? tour.costFrom}
                      </div>
                    </div>

                    {/* Content - refined typography and spacing */}
                    <div className="p-5 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-snug">
                        {tour.title}
                      </h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {tour.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        View details
                        <FaArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
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
                  {Array.from(
                    { length: totalPage },
                    (_, index) => index + 1
                  ).map((page) => (
                    <PaginationItem
                      key={page}
                      onClick={() => setCurrentPage(page)}
                    >
                      <PaginationLink isActive={currentPage === page}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
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
          </section>
        </div>
      </div>
    </div>
  );
}
