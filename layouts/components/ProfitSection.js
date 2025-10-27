import useScrollReveal from "@hooks/useScrollReveal";
import ImageAnimation from "./ImageAnimation";

export default function ProfitSection() {
  const benefits = [
    {
      title: "Phương pháp giảng dạy hiệu quả",
      desc: "Không chỉ dạy kiến thức, thầy Huy còn chú trọng phát triển tư duy logic, dạy cách suy nghĩ, giúp con bạn nhớ lâu và hiểu sâu bản chất vấn đề.",
    },
    {
      title: "Lấp đầy lỗ hổng kiến thức",
      desc: "Sau khi kiểm tra đầu vào, con bạn sẽ được bổ trợ kiến thức nếu cần, hoàn toàn miễn phí, giúp con nắm vững nền tảng trước khi bước vào lớp học chính thức.",
    },
    {
      title: "Sĩ số lớp nhỏ",
      desc: "Với số lượng học viên vừa phải, con sẽ dễ dàng tiếp thu kiến thức và nhận được sự quan tâm, hỗ trợ từ giáo viên nhiều hơn.",
    },
    {
      title: "Báo cáo tiến độ định kỳ",
      desc: "Phụ huynh sẽ được cập nhật tình hình học tập của con thường xuyên, giúp bạn nắm bắt quá trình tiến bộ của con.",
    },
    {
      title: "Hỗ trợ liên tục sau mỗi buổi học",
      desc: "Sau mỗi buổi, con bạn sẽ được làm bài test kiểm tra nhận thức. Nếu chưa đạt yêu cầu, con sẽ được bổ trợ miễn phí ngay lập tức, đảm bảo kiến thức không bị 'trôi' và con luôn sẵn sàng cho buổi học tiếp theo.",
    },
  ];

  useScrollReveal(".text-animation-section-6");

  return (
    <section className="section sectionScroll flex min-h-screen flex-col items-center justify-center ">
      {/* Title */}
      <div className="mb-12 text-center">
        <h2 className="text-animation-section-6 font-primary font-bold">
          Lợi Ích Vượt Trội Từ <br /> Khóa Ôn Tập
        </h2>
        <div className="mt-2 text-2xl text-green-600">🌿</div>
      </div>
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 md:grid-cols-2">
        {/* Left content */}
        <div>
          <div className="space-y-4">
            {benefits.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="mt-1 text-lg text-[#003B7A]">✔</span>
                <p className="leading-relaxed text-gray-800">
                  <strong>{item.title}:</strong> {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right image */}
        <div className="flex justify-center">
          <ImageAnimation src="/images/section_5.webp" />
          {/* <img
            src=""
            alt="Thầy Huy hướng dẫn học sinh"
            className="rounded-lg object-cover shadow-lg"
          /> */}
        </div>
      </div>
    </section>
  );
}
