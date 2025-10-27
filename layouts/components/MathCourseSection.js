import useScrollReveal from "@hooks/useScrollReveal";
import React from "react";
import { FaRegComments } from "react-icons/fa";
import ImageAnimation from "./ImageAnimation";

const MathCourseSection = () => {
  // !State
  useScrollReveal(".text-animation-section-1");

  // !Render
  return (
    <section id="home" className="section sectionScroll flex min-h-screen flex-col items-center bg-theme-light pt-28">
      <div className="mb-12 flex w-full max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-animation-section-1 font-primary font-bold">
            KHÓA HỌC TOÁN ÔN TẬP TỪ LỚP 6 ĐẾN 12 <br /> CỦA THẦY HUY
          </h1>

          <p className="text-animation-section-1 mt-4 text-lg leading-relaxed text-[#333]">
            Bạn có đang lo lắng vì con mình đang gặp khó khăn với môn Toán? Hoặc
            bạn muốn con mình đạt kết quả tốt nhất trong những kỳ thi quan trọng
            sắp tới? Khóa học ôn tập Toán từ lớp 6 đến 12 của thầy Huy sẽ là
            người bạn đồng hành đáng tin cậy, giúp con bạn tự tin chinh phục mọi
            thử thách trên con đường học tập.
          </p>
        </div>

        {/* Right Section */}
        {/* <div className="flex-1 overflow-hidden rounded-xl bg-white shadow-md">
          <div className="relative flex flex-col items-center justify-center">
            <img
              src="/images/img_sec_1.webp"
              alt="Thầy Huy Toán"
              className="project__single__image"
              //   className="mb-4 h-auto w-64 rounded-lg object-cover shadow-lg"
            />
          </div>
        </div> */}
        <ImageAnimation src="/images/img_sec_1.webp" />
      </div>

      {/* Features Section */}
      <div className="mt-16 w-full bg-[#0b2149] py-8 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 text-center sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-2 text-3xl">💬</div>
            <p className="text-animation-section-1 font-semibold">
              Hoạt động tương tác giúp học sinh hứng thú học
            </p>
          </div>
          <div>
            <div className="mb-2 text-3xl">📘</div>
            <p className="text-animation-section-1 font-semibold">
              Chương trình bám sát SGK – cải thiện kết quả học tập
            </p>
          </div>
          <div>
            <div className="mb-2 text-3xl">📈</div>
            <p className="text-animation-section-1 font-semibold">
              Thiết kế lộ trình học phù hợp với từng học sinh
            </p>
          </div>
          <div>
            <div className="mb-2 text-3xl">👨‍🏫</div>
            <p className="text-animation-section-1 font-semibold">
              Giáo viên luôn đồng hành trong quá trình học
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MathCourseSection;
