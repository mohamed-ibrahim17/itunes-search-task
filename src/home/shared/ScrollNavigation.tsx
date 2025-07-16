import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type SliderScrollNavigationProps = {
  scrollRef: React.RefObject<HTMLDivElement | null>;
};

export const SliderScrollNavigation = ({
  scrollRef,
}: SliderScrollNavigationProps) => {
  const handleScroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        className="p-2 rounded-full hover:bg-[color:var(--color-border)] focus:outline-none disabled:opacity-40"
        onClick={() => handleScroll("left")}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="p-2 rounded-full hover:bg-[color:var(--color-border)] focus:outline-none disabled:opacity-40"
        onClick={() => handleScroll("right")}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </>
  );
};
