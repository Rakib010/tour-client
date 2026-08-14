import { Link, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaArrowLeft, FaWallet, FaClock } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  formatGuideBudget,
  getRelatedTourGuides,
  getTourGuideBySlug,
} from "@/data/tourGuides";

export default function TourGuideDetails() {
  const { slug } = useParams();
  const guide = slug ? getTourGuideBySlug(slug) : undefined;
  const related = slug ? getRelatedTourGuides(slug, 5) : [];

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
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8 md:py-10">
        <Link
          to="/tour-guide"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2 h-3.5 w-3.5" />
          All Tour Guides
        </Link>

        {/* Hero image — full content width like travel blog */}
        <div className="relative overflow-hidden rounded-xl border border-border">
          <img
            src={guide.image}
            alt={guide.place}
            className="w-full aspect-[16/9] object-cover"
          />
        </div>

        <div className="mt-6 grid lg:grid-cols-[1fr_280px] gap-10">
          {/* Main article */}
          <article className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-sm text-foreground">
              <FaMapMarkerAlt className="h-3.5 w-3.5 text-primary" />
              {guide.division}
            </span>

            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              {guide.place}
            </h1>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <FaClock className="h-3.5 w-3.5 text-primary" />
                {guide.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FaWallet className="h-3.5 w-3.5 text-primary" />
                {formatGuideBudget(guide)}{" "}
                <span className="text-xs">(approx. per person)</span>
              </span>
            </div>

            {/* Overview paragraphs */}
            <div className="mt-8 space-y-4">
              {guide.overview.map((para, i) => (
                <p
                  key={i}
                  className="text-[15px] md:text-base leading-7 text-foreground/90"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* What to see */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                What to see
              </h2>
              <ul className="space-y-3 list-disc pl-5">
                {guide.whatToSee.map((item, i) => (
                  <li key={i} className="text-[15px] leading-7 text-foreground/90">
                    <span className="font-semibold text-foreground">
                      {item.title}:
                    </span>{" "}
                    {item.description}
                  </li>
                ))}
              </ul>
            </section>

            {/* How to go — dynamic steps */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                How to go
              </h2>
              <div className="space-y-5">
                {guide.howToGo.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {i + 1}
                    </div>
                    <p className="text-[15px] md:text-base leading-7 text-foreground/90 pt-0.5">
                      <span className="font-semibold text-foreground">
                        Step {i + 1}:{" "}
                      </span>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Where to stay */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Where to stay
              </h2>
              <p className="text-[15px] md:text-base leading-7 text-foreground/90">
                {guide.whereToStay}
              </p>
            </section>

            {/* Where to eat */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Where to eat
              </h2>
              <p className="text-[15px] md:text-base leading-7 text-foreground/90">
                {guide.whereToEat}
              </p>
              {guide.foodToCarry.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold text-foreground mb-2">
                    Carry with you:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {guide.foodToCarry.map((item, i) => (
                      <li
                        key={i}
                        className="text-[15px] leading-7 text-foreground/90"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Travel tips */}
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Travel tips
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {guide.tips.map((tip, i) => (
                  <li
                    key={i}
                    className="text-[15px] leading-7 text-foreground/90"
                  >
                    {tip}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[15px] leading-7 text-foreground/90">
                <span className="font-semibold">Safety note:</span>{" "}
                {guide.safety}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Best time to visit: {guide.bestTime}. Difficulty:{" "}
                {guide.difficulty}.
              </p>
            </section>
          </article>

          {/* Sidebar — related guides */}
          <aside className="lg:pt-2">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-bold text-foreground mb-1">Quick budget</h3>
                <p className="text-lg font-semibold text-primary">
                  {formatGuideBudget(guide)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Approximate DIY cost per person (transport + stay + local
                  moves). Food and extras may add more.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-3">
                  More tour guides
                </h3>
                <div className="space-y-3">
                  {related.map((item) => (
                    <Link
                      key={item.id}
                      to={`/tour-guide/${item.slug}`}
                      className="group flex gap-3 rounded-lg border border-border overflow-hidden hover:border-primary/40 transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.place}
                        className="h-16 w-20 object-cover shrink-0"
                      />
                      <div className="py-2 pr-2 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {item.place}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.division}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
