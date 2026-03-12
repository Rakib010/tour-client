import { homeStats } from "@/constants/home/stats";

export default function StatsBar() {
  return (
    <section className="py-12 bg-gradient-to-r from-emerald-600 to-emerald-700">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {homeStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center text-white"
            >
              <stat.icon className="h-10 w-10 mb-3 opacity-90" aria-hidden />
              <span className="text-2xl md:text-3xl font-bold">
                {stat.value}
              </span>
              <span className="text-emerald-100 text-sm md:text-base mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
