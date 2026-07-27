"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SlideContent from "./SlideContent";
import { slidesData } from "./slidesData";

// Swiper CSS styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="  relative w-full bg-[var(--background)] overflow-hidden border-b border-[var(--border)]">
     
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)",
        }}
      />

      
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] rounded-full blur-[160px] pointer-events-none transition-all duration-1000 ease-in-out opacity-15 dark:opacity-25"
        style={{
          background:
            slidesData[activeIndex]?.glowColor ||
            "rgba(6, 182, 212, 0.15)",
        }}
      />

      <div className="relative w-full max-w-[1440px] mx-auto flex items-center px-4 sm:px-6">
       
        <button
          aria-label="Previous Slide"
          className="custom-swiper-prev absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex items-center justify-center w-12 h-12 rounded-full border border-[var(--border)] backdrop-blur-md text-[var(--secondary)] hover:text-[var(--primary)] shadow-lg cursor-pointer transition-all duration-300 active:scale-95 slider-nav-btn"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          aria-label="Next Slide"
          className="custom-swiper-next absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex items-center justify-center w-12 h-12 rounded-full border border-[var(--border)] backdrop-blur-md text-[var(--secondary)] hover:text-[var(--primary)] shadow-lg cursor-pointer transition-all duration-300 active:scale-95 slider-nav-btn"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Swiper Slider  */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          speed={700}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3,
          }}
          navigation={{
            nextEl: ".custom-swiper-next",
            prevEl: ".custom-swiper-prev",
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          className="w-full h-full hero-swiper-container"
        >
          {slidesData.map((slide, index) => (
            <SwiperSlide
              key={slide.id}
              className="w-full flex items-center select-none"
            >
              <SlideContent slide={slide} isActive={activeIndex === index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
