import HeroSlider from "@/components/HeroSlider/HeroSlider";
import PopularCategories from "@/components/Home/PopularCategories";
import StartupInnovation from "@/components/Home/StartupInnovation";
import TrendingIdeas from "@/components/Home/TrendingIdeas";
import PartnersLogo from "@/components/Home/PartnersLogo";
import ContactUs from "@/components/Home/ContactUs";

export default function Home() {
  return (
    <div className="w-full bg-[var(--background)] ">
      <HeroSlider />
      <TrendingIdeas/>
      <PopularCategories />
      <StartupInnovation />
      <PartnersLogo />
      <ContactUs />
    </div>
  );
}




