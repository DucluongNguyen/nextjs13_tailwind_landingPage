import useScrollReveal from "@hooks/useScrollReveal";
import React from "react";

const feedbacks = [
  {
    name: "Chị Thu Hương",
    image: "/images/feed_1.webp", // thay bằng ảnh thật
    content:
      "Sau khi con tham gia lớp học của thầy Huy, tôi thấy con thay đổi hẳn, từ một đứa trẻ lười học, mất tập trung, giờ con tự giác học, hiểu sâu và yêu thích môn Toán hơn. Phương pháp dạy của thầy thực sự hiệu quả, và tôi rất yên tâm khi cho con theo học tại đây.",
  },
  {
    name: "Chị Kiều Anh",
    image: "/images/feed_2.webp",
    content:
      "Con tôi từng gặp khó khăn trong việc nắm bắt kiến thức Toán, nhưng từ khi học với thầy Huy, cháu đã tiến bộ rõ rệt. Đặc biệt, tôi đánh giá cao việc thầy thường xuyên gửi báo cáo học tập, giúp tôi theo dõi sát sao sự tiến bộ của con.",
  },
  {
    name: "Chị Lan Anh",
    image: "/images/feed_3.webp",
    content:
      "Tôi rất hài lòng với khóa học của thầy Huy. Con tôi không chỉ cải thiện điểm số mà còn tự tin hơn rất nhiều trong kỳ thi sắp tới. Lớp học nhỏ, giáo viên tận tình, cách dạy tư duy rất khác biệt. Cảm ơn thầy và đội ngũ giáo viên đã giúp con tôi có sự chuẩn bị tốt nhất.",
  },
];

export default function ParentFeedback() {
  useScrollReveal(".text-animation-section-9");

  return (
    <section className="section sectionScroll flex h-screen flex-col items-center justify-center bg-theme-light">
      <h2 className="text-animation-section-9 mb-12 font-primary font-bold">
        Phản Hồi Từ Phụ Huynh
      </h2>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 md:grid-cols-3">
        {feedbacks.map((item, i) => (
          <div
            key={i}
            className="text-animation-section-9 flex flex-col items-center text-gray-700"
          >
            <img
              src={item.image}
              alt={item.name}
              className="mb-4 h-20 w-20 rounded-full object-cover"
            />
            <h3 className="mb-2 text-lg font-semibold">{item.name}</h3>
            <p className="text-justify text-sm italic leading-relaxed md:text-center">
              "{item.content}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
