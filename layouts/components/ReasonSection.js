import useScrollReveal from "@hooks/useScrollReveal";
import React from "react";

const reasons = [
  {
    number: "01",
    title: "Phương pháp hướng dẫn tự học",
    desc: "Khuyến khích học sinh phát triển tư duy độc lập, biết tự tìm hiểu và giải quyết vấn đề.",
  },
  {
    number: "02",
    title: "Giáo viên giỏi và tâm huyết",
    desc: "Đội ngũ giáo viên giàu kinh nghiệm, tận tâm và luôn quan tâm đến từng học sinh.",
  },
  {
    number: "03",
    title: "Phân lớp theo năng lực học sinh",
    desc: "Học sinh được xếp lớp phù hợp với trình độ, đảm bảo tiếp thu hiệu quả.",
  },
  {
    number: "04",
    title: "Kiểm tra và đánh giá định kỳ",
    desc: "Thường xuyên kiểm tra, báo cáo tiến độ giúp phụ huynh theo dõi sự tiến bộ của con.",
  },
  {
    number: "05",
    title: "Chương trình và tài liệu chuẩn",
    desc: "Bám sát nội dung thi, tài liệu đầy đủ, chất lượng cập nhật giúp học sinh học đúng trọng tâm.",
  },
  {
    number: "06",
    title: "Cam kết chất lượng",
    desc: "Đảm bảo tiến bộ rõ rệt sau từng buổi học, giúp học sinh tự tin vượt qua các kỳ thi.",
  },
];

export default function ReasonSection() {
  useScrollReveal(".text-animation-section-4");

  return (
    <section className="section sectionScroll flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto mb-16 max-w-7xl text-center">
        <h2 className="text-animation-section-4 font-primary font-bold">
          Lý Do Phụ Huynh Nên Chọn <br />
          <span className="">Khóa Học Ôn Tập Này</span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((item) => (
          <div key={item.number} className="text-animation-section-4 text-left">
            <span className="text-4xl font-extrabold text-[#F8CBA7]">
              {item.number}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-[#0A2A4A]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#222]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
