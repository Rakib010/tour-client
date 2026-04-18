/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import config from "@/config";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const form = useForm();
  // const [verifyEmail, setVerifyEmail] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      const res = await login(data);
      console.log(res);
      if (res.success) {
        // setVerifyEmail(null);
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err: unknown) {
      console.error(err);
      const msg = getErrorMessage(err);
      toast.error(msg);

      // If the user is not verified, send them to the verify screen
      // (disabled for now)
      // if (msg.toLowerCase().includes("not verified")) {
      //   navigate("/verify", { state: data.email });
      // }
      // if (msg.toLowerCase().includes("not verified")) {
      //   setVerifyEmail(data?.email || null);
      // } else {
      //   setVerifyEmail(null);
      // }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome Back, Traveler!
        </h1>
        <p className="text-gray-500 text-sm">
          Sign in to plan your next adventure ✈️
        </p>
      </div>

      {/* Form Section */}
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* {verifyEmail ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <div className="flex items-center justify-between gap-3">
                  <span>Your account is not verified. Please verify your email.</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/verify", { state: verifyEmail })}
                  >
                    Verify now
                  </Button>
                </div>
              </div>
            ) : null} */}
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@h.com"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* Google OAuth Login */}
        <Button
          onClick={() => window.open(`${config.baseUrl}/auth/google`)}
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login with Google
        </Button>
      </div>

      {/* Footer Link */}
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          replace
          className="underline underline-offset-4 text-orange-500"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
