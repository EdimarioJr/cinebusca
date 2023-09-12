import { useState, useEffect } from "react";

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    if (typeof window !== undefined) {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      window.scrollTo({ top: 0, behavior: "smooth" });

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [setWindowWidth]);

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  return { windowWidth };
};
