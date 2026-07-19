import { Link, useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaClock,
  FaWallet,
  FaCalendarAlt,
  FaArrowLeft,
  FaBus,
  FaShieldAlt,
  FaMountain,
} from "react-icons/fa";
import { MdOutlineHotel, MdOutlineRestaurant } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { getTourGuideBySlug } from "@/data/tourGuides";

export default function TourGuideDetails() {
  const { slug } = useParams();
  const guide = slug ? getTourGuideBySlug(slug) : undefined;

  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20 px-4">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Tour guide not found
        </h1>
        <Button asChild variant="outline">
          <Link to="/tour-guide" className="gap-2">
            <FaArrowLeft className="h-4 w-4" />
            Back to Tour Guides
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <img
          src={guide.image}
          alt={guide.place}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <div className="max-w-[1280px] mx-auto w-full">
            <Link
              to="/tour-guide"
              className="inline-flex items-center text-white/90 hover:text-white mb-4 text-sm font-medium transition-colors"
            >
              <FaArrowLeft className="mr-2 h-4 w-4" />
              All Tour Guides
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              {guide.place}
            </h1>
            <p className="max-w-2xl text-white/90 text-sm md:text-base mb-4">
              {guide.shortDescription}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <span className="inline-flex items-center gap-2">
                <FaMapMarkerAlt className="h-4 w-4 text-emerald-300" />
                {guide.division}
              </span>
              <span className="inline-flex items-center gap-2">
                <FaClock className="h-4 w-4 text-emerald-300" />
                {guide.duration}
              </span>
              <span className="inline-flex items-center gap-2">
                <FaMountain className="h-4 w-4 text-emerald-300" />
                {guide.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* How to go */}
            <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground mb-4 pb-3 border-b border-border flex items-center gap-2">
                <FaBus className="h-5 w-5 text-primary" />
                How to go
              </h2>
              <ul className="space-y-3">
                {guide.howToGo.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-muted-foreground leading-relaxed"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Where to stay */}
            <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground mb-4 pb-3 border-b border-border flex items-center gap-2">
                <MdOutlineHotel className="h-5 w-5 text-primary" />
                Where to stay
              </h2>
              <ul className="space-y-2">
                {guide.whereToStay.map((item, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground leading-relaxed before:content-['•'] before:mr-2 before:text-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground mb-6 pb-3 border-b border-border">
                Full tour plan
              </h2>
              <div className="space-y-6">
                {guide.itinerary.map((day, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-xs text-center px-1">
                        {index + 1}
                      </div>
                      {index < guide.itinerary.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border mt-2 min-h-[20px]" />
                      )}
                    </div>
                    <div className="pb-2">
                      <p className="text-xs font-medium text-primary mb-1">
                        {day.day}
                      </p>
                      <h3 className="font-semibold text-foreground mb-2">
                        {day.title}
                      </h3>
                      <ul className="space-y-1.5">
                        {day.activities.map((activity, ai) => (
                          <li
                            key={ai}
                            className="text-sm text-muted-foreground leading-relaxed"
                          >
                            • {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Attractions */}
            <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground mb-4 pb-3 border-b border-border">
                Must-see attractions
              </h2>
              <div className="flex flex-wrap gap-2">
                {guide.attractions.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-lg border border-border bg-muted/40 px-3 py-1.5 text-sm text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {/* Food */}
            <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground mb-4 pb-3 border-b border-border flex items-center gap-2">
                <MdOutlineRestaurant className="h-5 w-5 text-primary" />
                What to eat
              </h2>
              <ul className="space-y-2">
                {guide.food.map((item, i) => (
                  <li key={i} className="text-muted-foreground leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Tips */}
            <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground mb-4 pb-3 border-b border-border flex items-center gap-2">
                <HiOutlineLightBulb className="h-5 w-5 text-primary" />
                Travel tips
              </h2>
              <ul className="space-y-2">
                {guide.tips.map((item, i) => (
                  <li key={i} className="text-muted-foreground leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card p-6 sticky top-24 space-y-5">
              <h3 className="font-bold text-foreground text-lg">Quick info</h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <FaClock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium">{guide.duration}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Best time</p>
                    <p className="font-medium">{guide.bestTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaWallet className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="font-medium">{guide.budget}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaMountain className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                    <p className="font-medium">{guide.difficulty}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaBus className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Transport</p>
                    <p className="font-medium">{guide.transport}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaShieldAlt className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Safety</p>
                    <p className="font-medium leading-relaxed">{guide.safety}</p>
                  </div>
                </div>
              </div>

              <Button asChild variant="outline" className="w-full gap-2">
                <Link to="/tour-guide">
                  <FaArrowLeft className="h-4 w-4" />
                  More guides
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
