import { Button } from "@/components/ui/button";
import { useGetTourQuery } from "@/redux/features/tour/tour.api";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router";
import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useCreatingBookingMutation } from "@/redux/features/booking/booking.api";

export default function Booking() {
  const [guestCount, setGuestCount] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  const { id } = useParams();
  const { data, isLoading, isError } = useGetTourQuery({ _id: id });
  const [createBooking] = useCreatingBookingMutation();

  const tourArray = data?.data?.data || [];
  const tourData = tourArray[0];

  useEffect(() => {
    if (!isLoading && !isError) {
      setTotalAmount(guestCount * tourData?.costFrom);
    }
  }, [guestCount, totalAmount, isLoading, isError]);

  const incrementGuest = () => {
    setGuestCount((prv) => prv + 1);
  };

  const decrementGuest = () => {
    setGuestCount((prv) => prv - 1);
  };

  /*  Booking */
  const handleBooking = async () => {
    let bookingData;
    if (data) {
      bookingData = {
        tour: id,
        guestCount: guestCount,
      };
    }
    console.log(bookingData);
    try {
      const res = await createBooking(bookingData).unwrap();
      if (res.success) {
        window.open(res.data.paymentUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* Error handling */
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin w-10 h-10 text-emerald-600" />
      </div>
    );
  }
  <div className="flex flex-col md:flex-row gap-8 p-6 container mx-auto">
    {!isLoading && isError && (
      <div>
        <p>Something Went Wrong!!</p>
      </div>
    )}

    {!isLoading && data?.length === 0 && (
      <div>
        <p>No Data Found</p>
      </div>
    )}
  </div>;

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
                  <span>Max {tourData?.maxGuest} guests</span>
                </div>
              </div>

              <div className="mb-6">
                <img
                  src={tourData?.images[0]}
                  alt={tourData?.title}
                  className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md"
                />
              </div>

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
                      disabled={guestCount >= tourData.maxGuest}
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

                <Button
                  onClick={() => handleBooking()}
                  className="w-full h-12 text-base font-semibold"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
