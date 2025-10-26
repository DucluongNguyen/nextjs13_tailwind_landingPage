import useScrollReveal from "@hooks/useScrollReveal";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const ProblemSection = () => {
  useScrollReveal(".text-animation-section-3");

  return (
    <section id="problem" className="section sectionScroll flex h-screen justify-center ">
      <div className="flex w-full max-w-5xl flex-col justify-center text-center">
        {/* Tiêu đề */}
        <h2 className="text-animation-section-3 pb-7 font-primary font-bold">
          Có Phải Con Bạn Đang Gặp Phải… ?
        </h2>

        {/* Box nội dung */}
        <div className="text-animation-section-3 rounded-xl border border-[#88d3ff] bg-white/60 p-8 text-left shadow-md backdrop-blur-sm">
          <ul className="space-y-3 text-lg">
            <li>
              <FaCheckCircle className="mr-2 inline text-[#0b2149]" />
              Con{" "}
              <span className="font-semibold text-[#f46a6a]">
                hổng kiến thức
              </span>{" "}
              Toán nghiêm trọng?
            </li>
            <li>
              <FaCheckCircle className="mr-2 inline text-[#0b2149]" />
              Con không có{" "}
              <span className="font-semibold text-[#f46a6a]">
                động lực
              </span> và{" "}
              <span className="font-semibold text-[#f46a6a]">mục tiêu</span> rõ
              ràng trong học tập?
            </li>
            <li>
              <FaCheckCircle className="mr-2 inline text-[#0b2149]" />
              Con học trên lớp nhưng{" "}
              <span className="font-semibold text-[#f46a6a]">
                không hiểu bài, thiếu tập trung, học trước quên sau
              </span>
              ?
            </li>
            <li>
              <FaCheckCircle className="mr-2 inline text-[#0b2149]" />
              Con muốn tham gia các kỳ thi{" "}
              <span className="font-semibold text-[#f46a6a]">
                học sinh giỏi cấp quận, thành phố
              </span>
              ?
            </li>
            <li>
              <FaCheckCircle className="mr-2 inline text-[#0b2149]" />
              Con cần{" "}
              <span className="font-semibold text-[#f46a6a]">
                ôn luyện chuẩn bị cho kỳ thi vào lớp 10, đánh giá năng lực, ĐGTD
                và THPT Quốc Gia
              </span>
              ?
            </li>
          </ul>

          <p className="mt-6 font-semibold leading-relaxed text-[#f46a6a]">
            → Nếu bạn nhận thấy con mình đang gặp phải một trong những vấn đề
            trên, khóa học của thầy Huy chính là giải pháp phù hợp để giúp con
            lấy lại sự tự tin và phát triển toàn diện về tư duy toán học.
          </p>

          <p className="mt-4 font-semibold italic leading-relaxed text-[#0b2149]">
            → Hãy để con bạn bước đi vững chắc trên con đường học tập với sự
            đồng hành của thầy Huy và đội ngũ giáo viên tận tâm, giàu kinh
            nghiệm. Đầu tư vào giáo dục chính là đầu tư cho tương lai tươi sáng!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
