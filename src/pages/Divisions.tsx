import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { HiArrowRight } from "react-icons/hi";
import SectionHeader from "@/components/modules/Home/SectionHeader";
import { CATEGORY_IMAGE_MAP } from "@/constants/categories/imageMap";

const placeholderImages = [
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
];

export default function Divisions() {
  const { data: divisionsData, isLoading } = useGetDivisionsQuery(undefined);

  const divisions = divisionsData?.data || [];

  const divisionItems = divisions.map(
    (
      d: { _id: string; name: string; thumbnail?: string },
      i: number
    ) => ({
      id: d._id,
      title: d.name,
      image:
        d.thumbnail ||
        CATEGORY_IMAGE_MAP[d.name] ||
        placeholderImages[i % placeholderImages.length],
      link: `/tour?division=${d._id}`,
    })
  );

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
        <SectionHeader
          title={
            <>
              All <span className="text-primary">Divisions</span>
            </>
          }
          description="Browse tours by division and discover destinations across Bangladesh"
        />
        {divisionItems.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No divisions found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {divisionItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="group block rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-end p-4">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="text-white font-semibold text-lg">
                        {item.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-white/90 text-sm font-medium group-hover:gap-2 transition-all">
                        Explore
                        <HiArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
