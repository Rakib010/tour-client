/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link } from "react-router-dom";
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
import { MdOutlineDepartureBoard, MdOutlineBeachAccess } from "react-icons/md";
import { format } from "date-fns";
import { Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TourDetails = () => {
  const { id } = useParams();
  const { data: tourData, isLoading } = useGetTourQuery({ _id: id });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );

  const tour = tourData?.data?.data?.[0];

  if (!tour)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20">
        <h1 className="text-2xl font-bold text-foreground mb-4">Tour Not Found</h1>
        <Button asChild variant="outline">
          <Link to="/tour" className="gap-2">
            <FaArrowLeft className="h-4 w-4" />
            Back to tours
          </Link>
        </Button>
      </div>
    );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return "—";
    }
  };

  const startDate = tour.createdAt || tour.starDate;
  const endDate = tour.endDate;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {tour.images?.length > 0 ? (
          <img
            src={tour.images[0]}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-950 dark:to-emerald-900 flex items-center justify-center">
            <FaImage className="text-8xl text-emerald-300/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <div className="max-w-[1280px] mx-auto w-full">
            <Link
              to="/tour"
              className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-medium transition-colors"
            >
              <FaArrowLeft className="mr-2 h-4 w-4" />
              Back to Tours
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {tour.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <span className="inline-flex items-center gap-2">
                <FaMapMarkerAlt className="h-4 w-4 text-emerald-300" />
                {tour.location || "—"}
              </span>
              {tour.ratings && (
                <span className="inline-flex items-center gap-2">
                  <FaStar className="h-4 w-4 text-amber-400" />
                  {tour.ratings}/5
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground mb-4 pb-3 border-b border-border">
                Overview
              </h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {tour.description || "No description available."}
              </div>
            </section>

            {/* Gallery */}
            {tour.images && tour.images.length > 0 && (
              <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                  Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tour.images.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative aspect-[4/3] overflow-hidden rounded-xl group"
                    >
                      <img
                        src={img}
                        alt={`${tour.title} ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Itinerary */}
            {tour.tourPlan && tour.tourPlan.length > 0 && (
              <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                  Tour Itinerary
                </h2>
                <div className="space-y-6">
                  {tour.tourPlan.map((plan: string, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                          {index + 1}
                        </div>
                        {index < tour.tourPlan.length - 1 && (
                          <div className="w-0.5 flex-1 bg-border mt-2 min-h-[20px]" />
                        )}
                      </div>
                      <div className="pb-2">
                        <p className="text-foreground leading-relaxed">{plan}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right - Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <span className="text-muted-foreground font-medium">From</span>
                <span className="text-2xl font-bold text-primary">
                  ৳{tour.costFrom?.toLocaleString?.() ?? tour.costFrom ?? "—"}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                {startDate && (
                  <div className="flex items-start gap-3">
                    <FaCalendarAlt className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Dates</p>
                      <p className="font-medium text-sm">
                        {formatDate(startDate)}
                        {endDate && ` – ${formatDate(endDate)}`}
                      </p>
                    </div>
                  </div>
                )}
                {tour.departureLocation && (
                  <div className="flex items-start gap-3">
                    <MdOutlineDepartureBoard className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Departure</p>
                      <p className="font-medium text-sm">{tour.departureLocation}</p>
                    </div>
                  </div>
                )}
                {tour.arrivalLocation && (
                  <div className="flex items-start gap-3">
                    <MdOutlineBeachAccess className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Arrival</p>
                      <p className="font-medium text-sm">{tour.arrivalLocation}</p>
                    </div>
                  </div>
                )}
                {tour.maxGuest && (
                  <div className="flex items-start gap-3">
                    <FaUsers className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Max Guests</p>
                      <p className="font-medium text-sm">{tour.maxGuest}</p>
                    </div>
                  </div>
                )}
                {tour.minAge && (
                  <div className="flex items-start gap-3">
                    <FaUsers className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Min Age</p>
                      <p className="font-medium text-sm">{tour.minAge}+ years</p>
                    </div>
                  </div>
                )}
                {tour.difficulty && (
                  <div className="flex items-start gap-3">
                    <GiPathDistance className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Difficulty</p>
                      <p className="font-medium text-sm capitalize">
                        {String(tour.difficulty).toLowerCase()}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {tour.included && tour.included.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Included</h3>
                  <ul className="space-y-2">
                    {tour.included.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <FaCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tour.exclude && tour.exclude.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Excluded</h3>
                  <ul className="space-y-2">
                    {tour.exclude.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <FaTimes className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button asChild size="lg" className="w-full gap-2">
                <Link to={`/booking/${tour._id}`}>
                  Book Now
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
