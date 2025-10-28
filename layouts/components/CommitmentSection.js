import useScrollReveal from "@hooks/useScrollReveal";
import useToggleDialog from "@hooks/useToggleDialog";
import { CheckCircle } from "lucide-react";

export default function CommitmentSection() {
  useScrollReveal(".text-animation-section-7");

  return (
    <section
      id="commited"
      className="section sectionScroll flex min-h-screen flex-col items-center justify-center bg-theme-light"
    >
      {/* Tiêu đề */}
      <h2 className="text-animation-section-7 text-center font-primary font-bold">
        Thầy Huy Cam Kết Đầu Ra
      </h2>

      {/* Icon mũi tên xuống */}
      <div className="mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFE6D6]">
        <span className="text-4xl text-[#F7941D]">⬇️</span>
      </div>

      {/* Hộp nội dung */}
      <div className="text-animation-section-7 mt-8 max-w-3xl rounded-xl border border-gray-300 bg-white p-6 shadow-sm md:p-8">
        <ul className="space-y-5 text-base leading-relaxed text-gray-700">
          <li className="flex items-start">
            <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-[#0A3C89]" />
            <p className="ml-3">
              <span className="font-bold">Tiến bộ rõ rệt:</span> Sau 8-10 buổi
              học đầu tiên, con bạn sẽ có những thay đổi đáng kể trong tư duy và
              cách tiếp cận môn Toán.
            </p>
          </li>

          <li className="flex items-start">
            <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-[#0A3C89]" />
            <p className="ml-3">
              <span className="font-bold">Hiệu quả bất ngờ:</span> Cách dạy khác
              biệt của thầy Huy đã giúp nhiều học sinh nắm vững kiến thức, tăng
              điểm số nhanh chóng và đạt thành tích cao trong các kỳ thi quan
              trọng.
            </p>
          </li>

          <li className="flex items-start">
            <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-[#0A3C89]" />
            <p className="ml-3">
              <span className="font-bold">Đột phá điểm số:</span> Không chỉ giúp
              con đạt điểm số cao hơn trên lớp, khóa học còn chuẩn bị cho con sự
              tự tin và kiến thức vững chắc để chinh phục các kỳ thi cấp cao hơn
              như thi vào lớp 10, thi ĐH.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
