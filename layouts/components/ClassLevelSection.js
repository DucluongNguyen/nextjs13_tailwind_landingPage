import React from "react";
import { CheckCircle } from "lucide-react";
import useScrollReveal from "@hooks/useScrollReveal";

const classLevels = [
  {
    title: "Khóa học cơ bản",
    colorTop: "bg-[#1E5BD7]",
    colorBody: "bg-[#286BE0]",
    buttonColor: "bg-[#0A73E8]",
    textColor: "text-white",
    items: [
      "Học sinh bị mất gốc và đang rất sợ học Toán",
      "Học sinh chưa có kỹ năng làm bài, tính toán, vẽ hình",
      "Lộ trình sau 3-6 tháng, học sinh có thái độ học tập tích cực hơn, muốn học hỏi, muốn được hướng dẫn để tự mình chinh phục các bài toán cơ bản",
      "Cam kết kết quả đầu ra",
    ],
  },
  {
    title: "Khóa học tiêu chuẩn",
    colorTop: "bg-[#008C8C]",
    colorBody: "bg-[#00BDBD]",
    buttonColor: "bg-[#F25C4E]",
    textColor: "text-white",
    items: [
      "Học sinh có năng lực trung bình, học sinh nắm chắc học toán chủ động, tự giác, tư duy nhanh và chính xác, yêu thích học toán hơn",
      "Học sinh có kỹ năng làm Toán chưa tốt, tính toán nhầm lẫn, sai sót nhiều",
      "Học sinh khai thác và tư duy nhìn học chưa linh hoạt, còn gặp khó khăn",
      "Cam kết kết quả đầu ra",
    ],
  },
  {
    title: "Khóa học nâng cao",
    colorTop: "bg-[#5C0CA0]",
    colorBody: "bg-[#7E32CC]",
    buttonColor: "bg-[#0A73E8]",
    textColor: "text-white",
    items: [
      "Học sinh có năng lực giỏi, tư duy tốt",
      "Học sinh có khả năng tự học cao, muốn ôn thi đánh giá năng lực, đánh giá tư duy thi THPT Quốc Gia",
      "Lộ trình 1-3 tháng, học sinh nắm chắc phương pháp học Toán chủ động, chinh phục các bài toán điểm 9+",
      "Cam kết kết quả đầu ra",
    ],
  },
];

export default function ClassLevelSection() {
  useScrollReveal(".text-animation-section-5");

  return (
    <section className="section sectionScroll flex h-screen flex-col items-center justify-center bg-theme-light">
      {/* Title */}
      <div className="mb-12 text-center">
        <h2 className="text-animation-section-5 font-primary font-bold">
          Xếp Lớp Theo Năng Lực <br /> Và Cam Kết Đầu Ra
        </h2>
        <div className="mt-2 text-2xl text-green-600">🌿</div>
      </div>

      {/* Cards */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        {classLevels.map((level, index) => (
          <div
            key={index}
            className={`overflow-hidden rounded-2xl shadow-lg ${level.textColor} text-animation-section-5 flex flex-col`}
          >
            <div
              className={`${level.colorTop} py-4 text-center text-lg font-bold`}
            >
              {level.title}
            </div>
            <div
              className={`${level.colorBody} flex flex-1 flex-col justify-between p-6`}
            >
              <div>
                <p className="mb-4 font-semibold">Phù hợp với</p>
                <ul className="space-y-3 text-sm">
                  {level.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 leading-relaxed"
                    >
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 flex-none text-white" />
                      </div>
                      <span className="text-sm leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`${level.buttonColor} mt-6 self-center rounded-full px-6 py-2 font-bold text-white transition hover:opacity-90`}
              >
                ĐĂNG KÝ
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
