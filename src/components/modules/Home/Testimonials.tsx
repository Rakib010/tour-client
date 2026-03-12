import { FaStar, FaQuoteLeft } from "react-icons/fa";
import SectionHeader from "./SectionHeader";
import { homeTestimonials } from "@/constants/home/testimonials";

export default function Testimonials() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeader
          badge="What Travelers Say"
          title={
            <>
              Our <span className="text-primary">Happy</span> Customers
            </>
          }
          description="Real experiences from travelers who explored Bangladesh with us"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeTestimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-8 border border-border hover:border-primary/20 transition-all duration-300"
            >
              <FaQuoteLeft className="h-10 w-10 text-primary/30 mb-5" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <FaStar key={j} className="h-4 w-4 text-amber-400" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed text-[15px]">"{t.quote}"</p>
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.tour}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
