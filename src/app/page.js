import HeroSlider from "@/components/HeroSlider/HeroSlider";
import StartupInnovation from "@/components/Home/StartupInnovation";

export default function Home() {
  return (
    <div className="w-full bg-[var(--background)] min-h-screen">
      <HeroSlider />
      <StartupInnovation/>
      
    </div>
  );
}


