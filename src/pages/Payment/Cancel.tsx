import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 mx-auto mb-6">
          <span className="text-yellow-500 text-4xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Payment Canceled
        </h1>
        <p className="text-gray-600 mb-6">
          You canceled the payment process. If this was a mistake, you can try
          again.
        </p>
        <div className="flex flex-col gap-3">
          <Button>
            <Link to="/">Go Back Home</Link>
          </Button>
          <Link
            to="/checkout"
            className="w-full border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Retry Payment
          </Link>
        </div>
      </div>
    </div>
  );
}
