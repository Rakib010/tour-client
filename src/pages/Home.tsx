import Banner from "@/components/modules/Home/Banner";
import TourCategories from "@/components/modules/Home/TourCategories";
import BlogSection from "./Blog";

export default function Home() {
  return (
    <div>
      <Banner />
      <TourCategories />
      <BlogSection />
    </div>
  );
}
