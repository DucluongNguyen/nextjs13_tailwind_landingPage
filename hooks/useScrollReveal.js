import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useScrollReveal = (
  selector,
  start = "top 80%",
  toggleActions = "play none none none"
) => {
  useEffect(() => {
    const anim = gsap.to(selector, {
      scrollTrigger: {
        trigger: selector,
        start,
        toggleActions,
        // markers: true, // bật nếu cần debug
      },
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      opacity: 1,
      y: 0,
      duration: 3,
      ease: "power4.out",
    });

    ScrollTrigger.refresh();

    return () => {
      anim.scrollTrigger?.kill();
    };
  }, [selector, start, toggleActions]);
};

export default useScrollReveal;
