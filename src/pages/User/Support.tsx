import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  MessageCircle,
  HelpCircle,
  FileQuestion,
} from "lucide-react";

const supportOptions = [
  {
    title: "Email Support",
    description: "Send us an email and we'll respond within 24 hours.",
    icon: Mail,
  },
  {
    title: "Live Chat",
    description: "Chat with our support team in real-time during business hours.",
    icon: MessageCircle,
  },
  {
    title: "FAQs",
    description: "Find quick answers to commonly asked questions.",
    icon: HelpCircle,
  },
  {
    title: "Booking Policy",
    description: "Learn about our cancellation, refund, and booking policies.",
    icon: FileQuestion,
  },
];

export default function Support() {
  return (
    <div className="w-full max-w-[1280px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground mt-1">
          We&apos;re here to help. Choose an option below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {supportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Card key={option.title} className="hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {option.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
