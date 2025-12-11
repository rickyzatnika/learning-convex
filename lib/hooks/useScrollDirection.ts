"use client";

import { useEffect, useState } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled from top
      setIsScrolled(currentScrollY > 0);

      // Determine scroll direction
      if (currentScrollY > prevScrollY && currentScrollY > 10) {
        // Scrolling down
        setScrollDirection("down");
        setIsVisible(false);
      } else if (currentScrollY < prevScrollY) {
        // Scrolling up
        setScrollDirection("up");
        setIsVisible(true);
      }

      // If at top, always show
      if (currentScrollY === 0) {
        setIsVisible(true);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return { scrollDirection, isScrolled, isVisible };
}