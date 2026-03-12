import { Button } from "@/components/ui/button";
import { useGetTourQuery } from "@/redux/features/tour/tour.api";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useParams, Link } from "react-router";
import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useCreatingBookingMutation } from "@/redux/features/booking/booking.api";
import { getErrorMessage } from "@/lib/utils";

const MAX_GUESTS = 5;

export default function Booking() {
  const [guestCount, setGuestCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  const { id } = useParams();
  const { data, isLoading, isError } = useGetTourQuery({ _id: id }, { skip: !id });
  const [createBooking, { isLoading: isBooking }] = useCreatingBookingMutation();

  const tourArray = data?.data?.data || [];
  const tourData = tourArray[0];
  const hasReachedGuestLimit = guestCount >= MAX_GUESTS;

  useEffect(() => {
    if (!isLoading && !isError) {
      setTotalAmount(guestCount * tourData?.costFrom);
    }
  }, [guestCount, totalAmount, isLoading, isError]);

  const incrementGuest = () => {
    if (guestCount >= MAX_GUESTS) {
      toast.error(`Maximum ${MAX_GUESTS} guests allowed per booking`);
      return;
    }
    setGuestCount((prv) => prv + 1);
  };

  const decrementGuest = () => {
    setGuestCount((prv) => prv - 1);
  };

  /*  Booking */
  const handleBooking = async () => {
    if (!id) return;
    if (guestCount > MAX_GUESTS) {
      toast.error(`Maximum ${MAX_GUESTS} guests allowed per booking`);
      return;
    }
    const bookingData = {
      tour: id,
      guestCount: guestCount,
    };
    try {
      const res = await createBooking(bookingData).unwrap();
      const paymentUrl = res?.data?.paymentUrl;
      if (res.success && paymentUrl) {
        window.location.href = paymentUrl;
      } else if (!paymentUrl) {
        toast.error("Payment gateway could not be loaded. Please try again.");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Booking failed. Please try again."));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin w-10 h-10 text-emerald-600" />
      </div>
    );
  }

  if (isError || !tourData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-xl font-semibold text-foreground">
          {isError ? "Failed to load tour" : "Tour not found"}
        </h2>
        <p className="text-muted-foreground text-center">
          {isError
            ? "Something went wrong while loading the tour. Please try again later."
            : "The tour you are looking for does not exist or has been removed."}
        </p>
        <Button asChild>
          <Link to="/tour">Browse Tours</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Tour Summary */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {tourData?.title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-emerald-500" />
                  <span>{tourData?.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaUsers className="mr-2 text-emerald-500" />
                  <span>Max {MAX_GUESTS} guests per booking</span>
                </div>
              </div>

              {tourData?.images?.[0] && (
                <div className="mb-6">
                  <img
                    src={tourData.images[0]}
                    alt={tourData.title}
                    className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}

              <p className="text-gray-600 mb-6 leading-relaxed">
                {tourData?.description}
              </p>
            </div>
          </div>

          {/* Right Section - Booking Details */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Booking Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={decrementGuest}
                      disabled={guestCount <= 1}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium w-8 text-center">
                      {guestCount}
                    </span>
                    <button
                      onClick={incrementGuest}
                      disabled={hasReachedGuestLimit}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between py-2 text-gray-700">
                    <span>Price per person:</span>
                    <span className="font-medium">৳{tourData?.costFrom}</span>
                  </div>
                  <div className="flex justify-between py-2 text-gray-700">
                    <span>Guests:</span>
                    <span>{guestCount}</span>
                  </div>
                  <div className="flex justify-between py-4 border-t border-gray-200 text-lg">
                    <span className="font-bold">Total Amount:</span>
                    <span className="font-bold text-emerald-600">
                      ৳{totalAmount}
                    </span>
                  </div>
                </div>

                {hasReachedGuestLimit && (
                  <p className="text-sm text-muted-foreground">
                    Maximum {MAX_GUESTS} guests allowed per booking
                  </p>
                )}
                <Button
                  onClick={() => handleBooking()}
                  className="w-full h-12 text-base font-semibold"
                  disabled={isBooking}
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Book Now"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
