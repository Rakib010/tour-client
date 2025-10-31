import { useSearchParams } from "react-router-dom";

export default function Success() {
  const [searchParams] = useSearchParams();

  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-lg w-full">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
            ✅
          </div>
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="text-left space-y-3 bg-gray-50 p-4 rounded-lg">
          <p>
            <span className="font-semibold">Transaction ID:</span>{" "}
            <span className="text-gray-700">{transactionId}</span>
          </p>
          <p>
            <span className="font-semibold">Amount Paid:</span>{" "}
            <span className="text-gray-700">৳ {amount}</span>
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`${
                status === "success" ? "text-green-600" : "text-red-600"
              } font-bold`}
            >
              {status?.toUpperCase()}
            </span>
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
