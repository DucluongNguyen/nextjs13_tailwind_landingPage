import gsap from "gsap";
import React, { useEffect, useRef } from "react";

function ImageAnimation({ src }) {
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // GSAP timeline cho hiệu ứng reveal ảnh
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // khi phần tử chạm 80% viewport
        toggleActions: "play none none reverse",
      },
    });

    // Ẩn ảnh ban đầu bằng clip-path
    gsap.set(imageWrapperRef.current, {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    });
    gsap.set(imageRef.current, { scale: 1.2 });

    // Khi scroll tới → reveal dần ảnh + zoom nhẹ
    tl.to(imageWrapperRef.current, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 1.8,
      ease: "power2.out",
    });
    tl.to(
      imageRef.current,
      {
        scale: 1,
        duration: 1.8,
        ease: "power2.out",
      },
      "<" // chạy song song
    );

    return () => tl.kill();
  }, []);
  return (
    <div
      className="project__single__image-wrapper flex-1 overflow-hidden rounded-xl"
      ref={sectionRef}
    >
      <div
        className="relative flex flex-col items-center justify-center"
        ref={imageWrapperRef}
      >
        <img
          ref={imageRef}
          src={src}
          alt="Thầy Huy Toán"
          className="project__single__image w-full object-cover"
        />
      </div>
    </div>
  );
}

export default ImageAnimation;
