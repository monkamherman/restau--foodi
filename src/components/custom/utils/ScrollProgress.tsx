
import { useState, useEffect } from "react";

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const calculateScrollProgress = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    const windowHeight = scrollHeight - clientHeight;
    const scroll = scrollTop / windowHeight * 100;
    setScrollProgress(scroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", calculateScrollProgress);
    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-foodie-primary z-[1000]"
      style={{ width: `${scrollProgress}%`, transition: "width 0.2s" }}
    />
  );
};

export default ScrollProgressBar;
