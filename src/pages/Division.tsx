import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { Loader2 } from "lucide-react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

export default function Division() {
  const { data, isLoading } = useGetDivisionsQuery(undefined);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-2xl text-emerald-600">
          <Loader2 />
        </div>
      </div>
    );
  }

  const divisions = data?.data || [];

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-xl md:text-5xl font-bold text-gray-800 mb-4">
          Explore Our Divisions
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the unique beauty and culture of each region in Bangladesh
        </p>
      </div>

      {/* Divisions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {divisions.map((division) => (
          <div
            key={division._id}
            className="border rounded-lg overflow-hidden "
          >
            {/* Division Image */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={division.thumbnail}
                alt={division.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h2 className="text-2xl font-bold text-white">
                  {division.name}
                </h2>
              </div>
            </div>

            {/* Division Info */}
            <div className="p-6">
              <p className="text-gray-600 mb-4 line-clamp-3">
                {division.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full">
                  <FaMapMarkerAlt className="mr-1" />
                  Popular Destination
                </span>
                <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  <FaStar className="mr-1" />
                  Cultural Hub
                </span>
              </div>

              {/* Explore Button */}
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                Explore Attractions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
