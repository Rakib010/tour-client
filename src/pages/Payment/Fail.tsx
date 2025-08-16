import { Link, useLocation } from "react-router-dom";

export default function Fail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const transactionId = queryParams.get("transactionId");
  const message = queryParams.get("message");
  const amount = queryParams.get("amount");
  const status = queryParams.get("status");

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-4">
          <span className="text-red-500 text-6xl">❌</span>
        </div>
        <h1 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-4">
          {message || "Your payment could not be completed."}
        </p>

        <div className="text-left text-gray-700 text-sm space-y-2 mb-4">
          {transactionId && (
            <p>
              <span className="font-medium">Transaction ID:</span>{" "}
              {transactionId}
            </p>
          )}
          {amount && (
            <p>
              <span className="font-medium">Amount:</span> {amount} BDT
            </p>
          )}
          {status && (
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span className="uppercase">{status}</span>
            </p>
          )}
        </div>

        <Link
          to="/"
          className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
