# Smart Việt Phục

Smart Việt Phục là một ứng dụng web thử nghiệm (demo) giúp người dùng khám phá và phối trang phục truyền thống Việt Nam theo phong cách hiện đại. 

## 🎯 Mục đích dự án
Sản phẩm đóng vai trò là bản demo phục vụ mục đích khám phá và trải nghiệm cá nhân. Các hình ảnh phối đồ, gợi ý từ AI Stylist, đánh giá tính phù hợp và thông tin văn hóa mang tính chất tham khảo, không khẳng định độ chính xác tuyệt đối về mặt lịch sử hay thay thế cho các nghiên cứu chuyên sâu.

## 🛠 Tính năng chính
- **Khám phá Việt phục:** Lựa chọn trang phục Nam (Áo Dài Nam, v.v.) hoặc Nữ (Áo Tấc, v.v.).
- **Tùy chỉnh phối đồ:** Chọn màu sắc, phong cách (Truyền thống hoặc Gen Z) và phụ kiện (sắp ra mắt).
- **AI Stylist:** Tích hợp AI (Google Gemini) để đưa ra các gợi ý màu sắc và phong cách phù hợp nhất với dịp sự kiện bạn chọn.
- **Bộ sưu tập của tôi (Lookbook):** Lưu lại các dấu ấn Việt yêu thích, xem lại hoặc tiếp tục phối đồ bất cứ lúc nào (dữ liệu lưu cục bộ trong trình duyệt).

## 🚀 Công nghệ sử dụng
- **Frontend:** React, Vite, TailwindCSS
- **State Management:** Zustand
- **AI Integration:** Google Gemini API (\gemini-1.5-flash\)

## ⚙️ Hướng dẫn cài đặt và chạy

1. Clone dự án:
   \\\ash
   git clone <repo-url>
   cd smart-viet-phuc
   \\\

2. Cài đặt các gói phụ thuộc:
   \\\ash
   npm install
   \\\

3. Cấu hình biến môi trường:
   Sao chép file \.env.example\ thành \.env\ và điền API key của bạn:
   \\\env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   \\\
   *(Lưu ý: Không bao giờ commit file \.env\ chứa key thật lên GitHub!)*

4. Chạy môi trường phát triển:
   \\\ash
   npm run dev
   \\\
   Truy cập \http://localhost:5173\ để trải nghiệm.

## ⚠️ Giới hạn của bản Demo
- Tính năng AI Stylist có thể tự động chuyển về chế độ gợi ý cục bộ (Fallback) nếu bạn không cung cấp API key hoặc gặp giới hạn từ phía Google API.
- Các phụ kiện (Nón lá, v.v.) hiện tại mới chỉ hiển thị ở mức độ giao diện chờ.
- Một số đánh giá điểm văn hóa/thẩm mỹ hiện đã được loại bỏ để tập trung vào cảm nhận phối đồ của người dùng.
