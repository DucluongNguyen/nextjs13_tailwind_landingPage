import useScrollReveal from "@hooks/useScrollReveal";
import React from "react";
import ImageAnimation from "./ImageAnimation";

const LearningModesSection = () => {
  useScrollReveal(".text-animation-section-2");

  return (
    <section
      id="learningMode"
      className="section sectionScroll flex min-h-screen flex-col justify-center bg-theme-light"
    >
      {/* Tiêu đề */}
      <h2 className="text-animation-section-2 mb-12 text-center font-primary text-3xl font-bold text-[#0b2149]">
        Hình Thức Học Linh Hoạt
      </h2>

      {/* Hai khối nội dung */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
        {/* Học trực tiếp */}
        <div className="flex flex-col items-center text-center">
          {/* Container ảnh có chiều cao cố định */}
          <div className="h-[320px] w-full overflow-hidden rounded-xl">
            <ImageAnimation
              src="/images/section_3_1.webp"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="mt-4 flex flex-col items-center">
            <h3 className="mb-2 text-xl font-bold text-[#0b2149]">
              Học Trực Tiếp
            </h3>
            <p className="max-w-sm leading-relaxed text-gray-800">
              Các em có thể học tiếp tại địa chỉ:
              <br />
              <span className="font-semibold">
                Số 30, Phạm Văn Đồng, Cầu Giấy, Hà Nội
              </span>
              <br />
              (Gần ĐHSP Hà Nội).
            </p>
          </div>
        </div>

        {/* Học online */}
        <div className="flex flex-col items-center text-center">
          <div className="h-[320px] w-full overflow-hidden rounded-xl">
            <ImageAnimation
              src="/images/section_3_2.webp"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-4 flex flex-col items-center">
            <h3 className="mb-2 text-xl font-bold text-[#0b2149]">
              Học Online
            </h3>
            <p className="max-w-sm leading-relaxed text-gray-800">
              Với lịch học cố định <strong>2 buổi/tuần</strong>, đảm bảo tính
              tiện lợi mà vẫn mang lại hiệu quả cao.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningModesSection;
