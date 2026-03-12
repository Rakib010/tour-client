import { useSearchParams, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Success() {
  const [searchParams] = useSearchParams();

  const transactionId = searchParams.get("transactionId");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");
  const hasError = searchParams.get("error") === "1";
  const errorMessage = searchParams.get("errorMessage");

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-950/20 p-6">
        <div className="bg-card border border-border shadow-lg rounded-2xl p-8 text-center max-w-lg w-full">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-destructive mb-2">
            Payment Processing Failed
          </h1>
          <p className="text-muted-foreground mb-6">
            {errorMessage ||
              "We could not complete your payment. Please try again or contact support."}
          </p>
          {transactionId && (
            <p className="text-sm text-muted-foreground mb-4">
              Transaction ID: {transactionId}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/user/bookings">View My Bookings</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 dark:bg-green-950/20 p-6">
      <div className="bg-card border border-border shadow-lg rounded-2xl p-8 text-center max-w-lg w-full">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            ✅
          </div>
        </div>
        <h1 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-muted-foreground mb-6">
          {message || "Your payment has been completed successfully."}
        </p>

        <div className="text-left space-y-3 bg-muted/50 p-4 rounded-lg">
          <p>
            <span className="font-semibold">Transaction ID:</span>{" "}
            <span className="text-foreground">{transactionId || "—"}</span>
          </p>
          <p>
            <span className="font-semibold">Amount Paid:</span>{" "}
            <span className="text-foreground">৳ {amount || "—"}</span>
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-green-600 dark:text-green-400 font-bold">
              {status?.toUpperCase() || "SUCCESS"}
            </span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Button asChild>
            <Link to="/user/bookings">View My Bookings</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
