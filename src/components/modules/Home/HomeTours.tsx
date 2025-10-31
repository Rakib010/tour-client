import { useGetTourQuery } from "@/redux/features/tour/tour.api";
import { Link } from "react-router-dom";

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
    <section className="py-16 px-6 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
          Featured <span className="text-emerald-600">Tours</span>
        </h2>
        <p className="text-gray-600">Explore our most popular packages</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tourData?.data?.data?.map((tour: TourType) => (
          <div
            key={tour._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={tour.images[0]}
              alt={tour.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {tour.title}
              </h3>
              <p className="text-emerald-600 font-semibold">
                From ৳{tour.costFrom}
              </p>
              <Link
                to={`/tourDetails/${tour._id}`}
                className="inline-block mt-4 bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

     {/*  <div className="text-center mt-10">
        <Link
          to="/tour"
          className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
        >
          View All Tours
        </Link>
      </div> */}
    </section>
  );
}
