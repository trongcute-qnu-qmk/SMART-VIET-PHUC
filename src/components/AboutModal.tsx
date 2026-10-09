import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeBtnRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] grid place-items-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-250"
      onClick={onClose}
    >
      <style>{`        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: translate(-50%, -50%) rotate(180deg); }
          to { transform: translate(-50%, -50%) rotate(-180deg); }
        }
        .border-glow-wrapper {
          position: relative;
          overflow: hidden;
          background: #0B4A38;
        }
        .border-glow-wrapper::before,
        .border-glow-wrapper::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200%;
          height: 200%;
          transform-origin: 0 0;
          filter: blur(8px);
          z-index: 0;
        }
        .border-glow-wrapper::before {
          background: conic-gradient(from 0deg, transparent 75%, #00FA9A 90%, #0B4A38 100%);
          animation: spin 8s linear infinite;
          transform: translate(-50%, -50%) rotate(0deg);
        }
        .border-glow-wrapper::after {
          background: conic-gradient(from 180deg, transparent 75%, #87CEFA 90%, #1a73e8 100%);
          animation: spin-reverse 10s linear infinite;
          transform: translate(-50%, -50%) rotate(180deg);
        }
        @media (prefers-reduced-motion: reduce) {
          .border-glow-wrapper::before,
          .border-glow-wrapper::after {
            animation: none;
            background: #0B4A38;
          }
        }
      `}</style>
      
      <div 
        className="border-glow-wrapper relative w-full max-w-[900px] max-h-[calc(100dvh-32px)] rounded-[26px] p-[3px] shadow-2xl animate-in zoom-in-95 duration-250 flex flex-col"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
      >
        {/* Real Content Container */}
        <div className="bg-[#FFFDF7] w-full h-full rounded-[23px] flex flex-col overflow-hidden relative z-10">
          
          {/* Header (Sticky) */}
          <div className="flex-shrink-0 border-b border-[#0B4A38]/10 p-6 sm:px-10 sm:py-8 bg-[#FFFDF7]/95 backdrop-blur-md relative z-20 flex flex-col items-center text-center shadow-sm">
            <button 
              ref={closeBtnRef}
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-[#FFFDF7] border-2 border-[#0B4A38]/20 hover:bg-[#00FA9A]/10 hover:border-[#0B4A38]/40 rounded-full flex items-center justify-center text-[#0B4A38] transition-all focus:outline-none focus:ring-2 focus:ring-[#0B4A38] shadow-sm z-30"
              aria-label="Đóng giới thiệu"
            >
              <X className="w-5 h-5" strokeWidth={2.5} />
            </button>

            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#C89B45] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#0B4A38]">VỀ CHÚNG TÔI</span>
              <Sparkles className="w-4 h-4 text-[#C89B45] animate-pulse" />
            </div>

            <h1 id="about-title" className="text-3xl sm:text-4xl font-serif font-black text-[#0B4A38] mb-2 drop-shadow-sm">
              SMART VIỆT PHỤC
            </h1>
            <p className="text-[12px] sm:text-sm text-[#C89B45] font-bold tracking-widest uppercase mb-5">
              MẶC BẢN SẮC, ĐI MUÔN NƠI
            </p>
            
            <p className="text-lg text-[#233B33] font-serif italic mb-6">
              "Di sản Việt trong nhịp sống mới."
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              <div className="text-center">
                <p className="text-2xl font-black text-[#0B4A38]">02</p>
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">bộ sưu tập</p>
              </div>
              <div className="w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="text-2xl font-black text-[#0B4A38]">02</p>
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">phong cách</p>
              </div>
              <div className="w-px bg-gray-200"></div>
              <div className="text-center">
                <p className="text-2xl font-black text-[#0B4A38]">20</p>
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">ảnh phối đồ</p>
              </div>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 hide-scrollbar space-y-12 relative z-10">
            
            {/* Intro */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <p className="text-[15px] leading-relaxed text-[#233B33]">
                Smart Việt Phục là nền tảng trải nghiệm phối Việt phục trực tuyến, kết hợp cảm hứng văn hóa truyền thống với phong cách sống hiện đại của thế hệ trẻ.
              </p>
              <p className="text-[15px] leading-relaxed text-[#233B33]">
                Chúng tôi tin rằng Việt phục không chỉ để ngắm nhìn hay xuất hiện trong các dịp lễ hội, mà còn có thể trở thành một phần gần gũi của cuộc sống hôm nay.
              </p>
              <p className="text-[15px] leading-relaxed font-bold text-[#0B4A38]">
                Từ khám phá trang phục, lựa chọn màu sắc đến thử phong cách Gen Z – tất cả trong một hành trình đơn giản, trực quan và đầy cảm hứng.
              </p>
            </div>

            {/* 01 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-black text-[#C89B45] opacity-30">01</span>
                <h2 className="text-xl font-bold text-[#0B4A38] uppercase tracking-wide">CHÚNG TÔI LÀ AI ?</h2>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              <p className="text-[15px] leading-relaxed text-[#233B33] mb-4">
                Smart Việt Phục được phát triển bởi nhóm sinh viên ngành Trí tuệ Nhân tạo, khóa 48, Trường Đại học Quy Nhơn.
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex gap-3 text-[15px] text-[#233B33]">
                  <span className="text-[#C89B45] mt-1">•</span>
                  <span><strong>Nguyễn Duy Trọng – Trưởng nhóm:</strong> Định hướng giải pháp, thiết kế kiến trúc hệ thống và kỹ thuật.</span>
                </li>
                <li className="flex gap-3 text-[15px] text-[#233B33]">
                  <span className="text-[#C89B45] mt-1">•</span>
                  <span><strong>Vũ Thành Tài – Thành viên:</strong> Xây dựng giải pháp AI và tối ưu trải nghiệm người dùng.</span>
                </li>
                <li className="flex gap-3 text-[15px] text-[#233B33]">
                  <span className="text-[#C89B45] mt-1">•</span>
                  <span><strong>Lê Đình Huy – Thành viên:</strong> Thu thập dữ liệu văn hóa và thiết kế giao diện.</span>
                </li>
              </ul>
              <p className="text-[15px] leading-relaxed text-[#233B33]">
                Với niềm yêu thích công nghệ và văn hóa Việt Nam, chúng tôi mong muốn tạo ra một sản phẩm giúp thế hệ trẻ tiếp cận trang phục truyền thống theo cách mới mẻ, dễ hiểu và dễ trải nghiệm.
              </p>
            </div>

            {/* 02 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-black text-[#C89B45] opacity-30">02</span>
                <h2 className="text-xl font-bold text-[#0B4A38] uppercase tracking-wide">VÌ SAO SMART VIỆT PHỤC RA ĐỜI ?</h2>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              <p className="text-[15px] leading-relaxed text-[#233B33]">
                Bạn muốn mặc Việt phục nhưng chưa biết nên chọn kiểu dáng, màu sắc hay phong cách nào cho phù hợp ?
              </p>
              <p className="text-[15px] leading-relaxed text-[#233B33]">
                Bạn yêu thích trang phục truyền thống nhưng cũng muốn thể hiện cá tính hiện đại?
              </p>
              <p className="text-[15px] leading-relaxed text-[#233B33]">
                Việc tự tìm kiếm hình ảnh, đọc thông tin từ nhiều nguồn và tưởng tượng cách phối đồ đôi khi mất thời gian, đặc biệt với những người mới tìm hiểu Việt phục.
              </p>
              <p className="text-[15px] leading-relaxed font-bold text-[#0B4A38]">
                Smart Việt Phục được xây dựng để giúp bạn khám phá, lựa chọn và hình dung cách phối đồ ngay trên một nền tảng duy nhất.
              </p>
              <p className="text-[15px] leading-relaxed text-[#233B33]">
                Dự án được phát triển trong khuôn khổ thử thách "Việt phục Remix – Phối trang phục truyền thống theo phong cách Gen Z", với mong muốn kết nối công nghệ AI và giá trị văn hóa Việt Nam.
              </p>
            </div>

            {/* 03 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-black text-[#C89B45] opacity-30">03</span>
                <h2 className="text-xl font-bold text-[#0B4A38] uppercase tracking-wide">ĐIỀU GÌ KHIẾN SMART VIỆT PHỤC KHÁC BIỆT ?</h2>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-[#0B4A38] text-[15px] mb-1">Khám phá theo hoàn cảnh của bạn</h3>
                  <p className="text-[15px] leading-relaxed text-[#233B33]">Thay vì phải tự tìm kiếm từ nhiều nguồn, bạn có thể bắt đầu bằng cách chọn đối tượng và sự kiện như đi lễ chùa, tham gia hoạt động tại trường, lễ hội, dạo phố hay dự tiệc.</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#0B4A38] text-[15px] mb-1">Một bộ trang phục – Hai phong cách</h3>
                  <p className="text-[15px] leading-relaxed text-[#233B33] mb-1">Từ một bộ sưu tập Việt phục, bạn có thể khám phá hai hướng thể hiện:</p>
                  <ul className="pl-5 space-y-1">
                    <li className="list-disc text-[15px] text-[#233B33]">Truyền thống: Trang nhã, giữ nét nguyên bản.</li>
                    <li className="list-disc text-[15px] text-[#233B33]">Gen Z: Trẻ trung, phối hiện đại.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-[#0B4A38] text-[15px] mb-1">Phối màu trực quan</h3>
                  <p className="text-[15px] leading-relaxed text-[#233B33]">Mỗi bộ sưu tập cung cấp năm màu sắc và hai phong cách, cho phép bạn xem các phương án phối đồ bằng hình ảnh được chuẩn bị riêng cho từng lựa chọn.</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#0B4A38] text-[15px] mb-1">AI Stylist đồng hành</h3>
                  <p className="text-[15px] leading-relaxed text-[#233B33]">Trợ lý AI Stylist được thiết kế để hỗ trợ gợi ý phối đồ theo sự kiện và sở thích, giúp bạn có thêm định hướng khi lựa chọn màu sắc và phong cách.</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#0B4A38] text-[15px] mb-1">Khám phá giá trị văn hóa</h3>
                  <p className="text-[15px] leading-relaxed text-[#233B33]">Bên cạnh hình ảnh, Smart Việt Phục hướng đến việc cung cấp thông tin về đặc điểm, bối cảnh sử dụng và giá trị văn hóa của trang phục, đồng thời phân biệt nét truyền thống với cách thể hiện đương đại.</p>
                </div>
              </div>
            </div>

            {/* 04 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-black text-[#C89B45] opacity-30">04</span>
                <h2 className="text-xl font-bold text-[#0B4A38] uppercase tracking-wide">GIÁ TRỊ DÀNH CHO THẾ HỆ GEN Z</h2>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              <p className="text-[15px] leading-relaxed text-[#233B33] mb-4">Smart Việt Phục mong muốn giúp người trẻ:</p>
              <ul className="space-y-3">
                <li className="flex gap-3 text-[15px] text-[#233B33]">
                  <span className="text-[#C89B45] mt-1">•</span>
                  <span><strong>Tự tin khám phá Việt phục:</strong> Bắt đầu từ những thao tác đơn giản, không cần có sẵn kiến thức chuyên sâu.</span>
                </li>
                <li className="flex gap-3 text-[15px] text-[#233B33]">
                  <span className="text-[#C89B45] mt-1">•</span>
                  <span><strong>Thể hiện phong cách cá nhân:</strong> Tìm kiếm sự kết hợp giữa màu sắc, hoàn cảnh và tinh thần truyền thống.</span>
                </li>
                <li className="flex gap-3 text-[15px] text-[#233B33]">
                  <span className="text-[#C89B45] mt-1">•</span>
                  <span><strong>Hiểu hơn về văn hóa Việt:</strong> Không chỉ nhìn thấy một bộ trang phục đẹp mà còn tìm hiểu câu chuyện và ý nghĩa đằng sau nó.</span>
                </li>
                <li className="flex gap-3 text-[15px] text-[#233B33]">
                  <span className="text-[#C89B45] mt-1">•</span>
                  <span><strong>Đưa di sản đến gần đời sống:</strong> Khơi gợi cảm hứng mặc Việt phục trong các hoạt động học tập, giao lưu và những dịp phù hợp.</span>
                </li>
              </ul>
            </div>

            {/* 05 */}
            <div className="space-y-4 pb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-black text-[#C89B45] opacity-30">05</span>
                <h2 className="text-xl font-bold text-[#0B4A38] uppercase tracking-wide">HÀNH TRÌNH TIẾP THEO</h2>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              <p className="text-[15px] leading-relaxed text-[#233B33]">
                Smart Việt Phục hiện là bản demo được phát triển với định hướng trở thành công cụ hỗ trợ khám phá và phối Việt phục dễ tiếp cận hơn.
              </p>
              <p className="text-[15px] leading-relaxed text-[#233B33] mb-6">
                Trong tương lai, nhóm mong muốn mở rộng thư viện trang phục, hoàn thiện khả năng tư vấn cá nhân hóa, bổ sung nguồn tư liệu văn hóa đáng tin cậy và nghiên cứu những hình thức mô phỏng trực quan hơn.
              </p>
              
              <div className="bg-[#0B4A38]/5 border border-[#0B4A38]/10 rounded-2xl p-6 text-center">
                <p className="text-[15px] leading-relaxed font-bold text-[#0B4A38] uppercase tracking-wide">
                  SMART VIỆT PHỤC – KHÔNG CHỈ LÀ CHỌN MỘT BỘ TRANG PHỤC, MÀ LÀ KHÁM PHÁ CÁCH BẢN SẮC VIỆT ĐỒNG HÀNH CÙNG THẾ HỆ MỚI.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AboutModal;







