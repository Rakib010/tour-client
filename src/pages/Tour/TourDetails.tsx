import { useParams } from "react-router-dom";
import { useGetTourQuery } from "@/redux/features/tour/tour.api";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaStar,
  FaArrowLeft,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { MdOutlineBeachAccess, MdOutlineDepartureBoard } from "react-icons/md";
import { Link } from "react-router-dom";
import { format } from "date-fns";

type TourType = {
  title: string;
  description: string;
  location: string;
  costFrom: number;
  startDate: Date;
  endDate: Date;
  departureLocation: string;
  arrivalLocation: string;
  included: { value: string }[];
  excluded: { value: string }[];
  amenities: { value: string }[];
  tourPlan: { value: string }[];
  maxGuest: number;
  minAge: number;
  images: string[];
  difficulty: string;
  ratings: number;
};

export default function TourDetails() {
  const { id } = useParams();
  const { data: tourData, isLoading } = useGetTourQuery(id);

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (!tourData) return <div className="text-center py-20">Tour not found</div>;

  const tour: TourType = tourData?.data?.data;

  return (
    <div className="bg-gray-50">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          to="/tours"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-800 transition"
        >
          <FaArrowLeft className="mr-2" />
          Back to Tours
        </Link>
      </div>

      {/* Tour Header */}
      <section className="relative">
        <div className="h-96 overflow-hidden">
          <img
            src={tour.images}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {tour.title}
            </h1>
            <div className="flex items-center mt-2 text-white">
              <FaMapMarkerAlt className="mr-2" />
              <span>{tour.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3">
            {/* Overview */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Overview
              </h2>
              <p className="text-gray-600">{tour.description}</p>
            </div>

            {/* Tour Plan */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Tour Plan
              </h2>
              <div className="space-y-6">
                {tour.tourPlan.map((plan, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                        {index + 1}
                      </div>
                      {index < tour.tourPlan.length - 1 && (
                        <div className="flex-grow w-px bg-gray-200 my-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="text-gray-600">{plan.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            {tour.amenities.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <FaCheck className="text-emerald-500 mr-2" />
                      <span className="text-gray-600">{amenity.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Tour Details
              </h2>

              {/* Price */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Price:</span>
                <span className="text-2xl font-bold text-emerald-600">
                  ৳{tour.costFrom}
                </span>
              </div>

              {/* Quick Facts */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Dates</p>
                    <p className="font-medium">
                      {format(new Date(tour.startDate), "MMM d, yyyy")} -{" "}
                      {format(new Date(tour.endDate), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MdOutlineDepartureBoard className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Departure</p>
                    <p className="font-medium">{tour.departureLocation}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MdOutlineBeachAccess className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Arrival</p>
                    <p className="font-medium">{tour.arrivalLocation}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaUsers className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Max Guests</p>
                    <p className="font-medium">{tour.maxGuest}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaUsers className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Minimum Age</p>
                    <p className="font-medium">{tour.minAge}+ years</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <GiPathDistance className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Difficulty</p>
                    <p className="font-medium">{tour.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaStar className="text-gray-500 mr-3" />
                  <div>
                    <p className="text-gray-500 text-sm">Rating</p>
                    <p className="font-medium">{tour.ratings}/5</p>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {tour.included.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheck className="text-emerald-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's Excluded */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">
                  What's Excluded
                </h3>
                <ul className="space-y-2">
                  {tour.excluded.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <FaTimes className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book Now Button */}
              <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-emerald-200">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
