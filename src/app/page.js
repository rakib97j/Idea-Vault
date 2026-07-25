import HeroSlider from "@/components/HeroSlider/HeroSlider";
import PopularCategories from "@/components/Home/PopularCategories";
import StartupInnovation from "@/components/Home/StartupInnovation";

export default function Home() {
  return (
    <div className="w-full bg-[var(--background)] ">
      <HeroSlider />
      <PopularCategories />
      <StartupInnovation />
    </div>
  );
}



