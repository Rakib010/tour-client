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
  FaImage,
} from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { MdOutlineBeachAccess, MdOutlineDepartureBoard } from "react-icons/md";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const TourDetails = () => {
  const { id } = useParams();
  const { data: tourData, isLoading } = useGetTourQuery(undefined);
  //  const { data: tourData} = useGetTourQuery({_id:id});

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl text-emerald-600">
          Loading tour details...
        </div>
      </div>
    );

  const tours = tourData?.data?.data || [];
  const tour = tours.find((t: any) => t._id === id);

  if (!tour)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Tour Not Found
        </h1>
        <Link to="/tours" className="text-emerald-600 hover:underline">
          <FaArrowLeft className="inline mr-2" />
          Back to tours
        </Link>
      </div>
    );

  // Format date safely
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return "Date not available";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-120 overflow-hidden">
        {tour.images?.length > 0 ? (
          <img
            src={tour.images[0]}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-emerald-100 to-blue-100 flex items-center justify-center">
            <FaImage className="text-6xl text-gray-400" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

        {/* Header Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-5xl mx-auto">
            <Link
              to="/tour"
              className="inline-flex items-center text-white hover:text-emerald-300 mb-4 transition"
            >
              <FaArrowLeft className="mr-2" />
              Back to Tours
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {tour.title}
            </h1>
            <div className="flex items-center text-white">
              <FaMapMarkerAlt className="mr-2" />
              <span>{tour.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3">
            {/* Overview */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                History and Nature
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {tour.description}
              </p>
            </div>

            {/* Image Gallery */}
            {tour.images?.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                  Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tour.images.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative group overflow-hidden rounded-lg cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={`${tour.title} ${idx + 1}`}
                        className="w-full h-48 object-cover transform group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tour Plan */}
            {tour.tourPlan?.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                  Tour Itinerary
                </h2>
                <div className="space-y-8">
                  {tour.tourPlan.map((plan: string, index: number) => (
                    <div key={index} className="flex">
                      <div className="flex flex-col items-center mr-6">
                        <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        {index < tour.tourPlan.length - 1 && (
                          <div className="flex-grow w-0.5 bg-gray-200 my-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <p className="text-gray-800 font-medium">{plan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                Tour Details
              </h2>

              {/* Price */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <span className="text-gray-600 font-medium">Price:</span>
                <span className="text-2xl font-bold text-emerald-600">
                  ৳{tour.costFrom.toLocaleString()}
                </span>
              </div>

              {/* Quick Facts */}
              <div className="space-y-5 mb-6">
                <div className="flex items-start">
                  <FaCalendarAlt className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-500 text-sm">Dates</p>
                    <p className="font-medium">
                      {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MdOutlineDepartureBoard className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-500 text-sm">Departure</p>
                    <p className="font-medium">{tour.departureLocation}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MdOutlineBeachAccess className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-500 text-sm">Arrival</p>
                    <p className="font-medium">{tour.arrivalLocation}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUsers className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-500 text-sm">Max Guests</p>
                    <p className="font-medium">{tour.maxGuest}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUsers className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-500 text-sm">Minimum Age</p>
                    <p className="font-medium">{tour.minAge}+ years</p>
                  </div>
                </div>
                {tour.difficulty && (
                  <div className="flex items-start">
                    <GiPathDistance className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 text-sm">Difficulty</p>
                      <p className="font-medium capitalize">
                        {tour.difficulty.toLowerCase()}
                      </p>
                    </div>
                  </div>
                )}
                {tour.ratings && (
                  <div className="flex items-start">
                    <FaStar className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-500 text-sm">Rating</p>
                      <p className="font-medium">{tour.ratings}/5</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Included */}
              {tour.included?.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3">
                    What's Included
                  </h3>
                  <ul className="space-y-3">
                    {tour.included.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-emerald-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Excluded */}
              {tour.excluded?.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-bold text-gray-800 mb-3">
                    What's Excluded
                  </h3>
                  <ul className="space-y-3">
                    {tour.excluded.map((item: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Book Now Button */}
              <Link to={`/booking/${tour?._id}`}>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-200/50">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
