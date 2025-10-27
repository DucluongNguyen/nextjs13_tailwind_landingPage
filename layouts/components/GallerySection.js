import Image from "next/image";
import { Autoplay, Pagination } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useWindowDimensions } from "@hooks/useWindowDimensions";

export default function GallerySection() {
  const images = [
    "/images/section_6_1.webp",
    "/images/section_6_2.webp",
    "/images/section_6_3.webp",
    "/images/section_6_4.webp",
    "/images/section_6_5.webp",
    // "/images/section_6_6.webp",
    "/images/section_6_7.webp",
    "/images/section_6_8.webp",
    "/images/section_6_9.webp",
    "/images/section_6_10.webp",
    "/images/section_6_11.webp",
    "/images/section_6_12.webp",
  ];

  const { width, height } = useWindowDimensions();

  if (width === 0) {
  return null;
}

  return (
    <section className="section sectionScroll flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-10 text-center font-primary text-2xl font-bold">
        Một Số Hình Ảnh Khác
      </h2>

      <div className="service-carousel w-full max-w-5xl">
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          spaceBetween={20}
          slidesPerView={width > 500 ? 4 : 1}
          className="pb-20"
        >
          {images.map((slide, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <Image
                src={slide}
                alt={`Ảnh ${index + 1}`}
                width={600}
                height={400}
                className="mb-16 h-[200px] rounded-lg object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
