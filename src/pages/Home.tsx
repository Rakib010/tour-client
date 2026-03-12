import Banner from "@/components/modules/Home/Banner";
import StatsBar from "@/components/modules/Home/StatsBar";
import TourCategories from "@/components/modules/Home/TourCategories";
import HomeTours from "@/components/modules/Home/HomeTours";
import Testimonials from "@/components/modules/Home/Testimonials";
import BlogSection from "@/components/modules/Home/BlogSection";

export default function Home() {
  return (
    <div >
      <Banner />
      <StatsBar />
      <TourCategories />
      <HomeTours />
      <Testimonials />
      <BlogSection />
    </div>
  );
}
