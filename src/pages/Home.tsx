import Banner from "@/components/modules/Home/Banner";
import TourCategories from "@/components/modules/Home/TourCategories";
import BlogSection from "./Blog";
import HomeTours from "@/components/modules/Home/HomeTours";

export default function Home() {
  return (
    <div>
      <Banner />
      <TourCategories />
      <HomeTours />
      <BlogSection />
    </div>
  );
}
