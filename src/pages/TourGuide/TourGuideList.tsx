import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaWallet } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import SectionHeader from "@/components/modules/Home/SectionHeader";
import { Button } from "@/components/ui/button";
import { formatGuideBudget, tourGuides } from "@/data/tourGuides";

export default function TourGuideList() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <SectionHeader
          badge="Travel smart"
          title={
            <>
              Full <span className="text-primary">Tour Guides</span>
            </>
          }
          description="Real place guides for Bangladesh — how to go step by step, where to stay, what to see, and realistic budgets"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tourGuides.map((guide) => (
            <article
              key={guide.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.place}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                  <FaMapMarkerAlt className="h-3 w-3 text-emerald-300" />
                  {guide.division}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {guide.place}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                  {guide.shortDescription}
                </p>

                <div className="mt-auto space-y-3">
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <FaClock className="h-3 w-3 text-primary" />
                      {guide.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FaWallet className="h-3 w-3 text-primary" />
                      {formatGuideBudget(guide)}
                    </span>
                  </div>

                  <Button asChild className="w-full gap-2">
                    <Link to={`/tour-guide/${guide.slug}`}>
                      See more
                      <HiArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
