# Tử Vi - Lịch Âm Dương Converter

## Mục tiêu
Xây dựng ứng dụng web cho phép người dùng nhập ngày/tháng/năm sinh (âm lịch hoặc dương lịch) và chuyển đổi giữa hai loại lịch. Đây là bước đầu tiên của hệ thống xem tử vi hoàn chỉnh.

## Tech Stack
- **Framework:** Next.js 14+ (App Router) với JavaScript
- **UI:** CSS modules / Tailwind (tuỳ chọn)
- **Thư viện chính:** `lunar-javascript` (convert âm dương lịch)

## Cấu trúc thư mục
```
the-occult/
├── src/
│   ├── app/
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── globals.css
│   ├── components/
│   │   ├── DateForm.js
│   │   └── LunarResult.js
│   └── utils/
│       └── lunar.js
├── package.json
├── next.config.js
├── jsconfig.json
└── README.md (do user tạo)
```

## Components

### DateForm
- Radio button: chọn loại lịch nhập (Dương lịch / Âm lịch)
- 3 input fields: Ngày, Tháng, Năm
- Button "Xem kết quả"
- Validation: ngày/tháng/năm hợp lệ
- Khi submit, gọi hàm convert và render kết quả

### LunarResult
- Hiển thị kết quả dạng text
- Nếu input là dương lịch: hiển thị ngày âm lịch tương ứng
- Nếu input là âm lịch: hiển thị ngày dương lịch tương ứng

## Luồng dữ liệu
1. User nhập ngày/tháng/năm + chọn loại lịch
2. Submit form → client-side handle
3. Gọi hàm `convertLunar()` hoặc `convertSolar()` trong utils/lunar.js
4. Kết quả trả về → render LunarResult component

## Giao diện
- Single page, responsive
- Dark/light theme cơ bản
- Hiển thị rõ ràng kết quả với Can Chi (nếu có thể)
