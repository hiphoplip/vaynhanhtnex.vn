# TNEX Finance - Vay tiêu dùng online

Trang web landing page cho dịch vụ vay tiêu dùng TNEX Finance, được xây dựng dựa trên nền tảng LadiPage.

## 📁 Cấu trúc thư mục

```
vaynhanhtnex.vn/
├── index.html              # File HTML chính
├── index_backup.html       # File backup
├── assets/                 # Thư mục chứa tài nguyên
│   ├── css/               # CSS files
│   │   ├── main.css       # CSS chính (reset, layout, animations)
│   │   └── loan-calculator.css  # CSS cho máy tính vay
│   └── js/                # JavaScript files
│       ├── viewport.js    # Cấu hình viewport responsive
│       ├── loan-calculator.js   # Logic máy tính khoản vay
│       └── lazyload.js    # Lazy loading cho images
└── README.md              # File này
```

## 🚀 Tính năng

### 1. **Máy tính khoản vay**
- Tính toán số tiền trả hàng tháng
- Điều chỉnh số tiền vay: 3.000.000đ - 100.000.000đ
- Điều chỉnh kỳ hạn: 3 - 36 tháng
- Lãi suất: 2,26%/tháng

### 2. **Form đăng ký vay**
- Thu thập thông tin: Họ tên, Số điện thoại, Địa chỉ
- Validation dữ liệu
- Gửi thông tin đến hệ thống

### 3. **Responsive Design**
- Mobile-first approach
- Tương thích với mọi thiết bị
- Breakpoints: 320px, 420px, 768px, 1024px

### 4. **Performance Optimization**
- Lazy loading cho hình ảnh
- Minified CSS & JS
- Preload critical resources

## 🔧 Cài đặt và chạy

### Cách 1: Mở trực tiếp
```bash
# Mở file index.html trong trình duyệt
open index.html
```

### Cách 2: Sử dụng local server
```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

Sau đó truy cập: `http://localhost:8000`

## 🚀 Deploy lên GitHub Pages

### Quick Start (Cách nhanh nhất)

```bash
# Chạy script deploy tự động
./deploy.sh
```

📖 **Xem hướng dẫn chi tiết**:
- [Quick Start Guide](QUICK_START.md) - Deploy trong 5 phút
- [Full Deployment Guide](DEPLOYMENT.md) - Hướng dẫn đầy đủ

### Các bước cơ bản

1. **Tạo repository trên GitHub**
2. **Push code lên GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/vaynhanhtnex.vn.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**: Settings > Pages > Source: main branch
4. **Truy cập**: `https://username.github.io/vaynhanhtnex.vn/`

## 📝 Chi tiết các file

### `assets/css/main.css`
- CSS reset và base styles
- Layout system (container, wrapper, sections)
- Responsive breakpoints
- Animation keyframes (pulse, bounce)
- Utility classes

### `assets/css/loan-calculator.css`
- Styles cho máy tính khoản vay
- Range slider customization
- Result display styles
- Responsive cho mobile/tablet

### `assets/js/viewport.js`
- Cấu hình viewport động
- Hỗ trợ mobile và desktop
- Setup tracking arrays (Facebook, TikTok)

### `assets/js/loan-calculator.js`
- Logic tính toán khoản vay
- Format tiền tệ (VND)
- Update slider values realtime
- Validation input

### `assets/js/lazyload.js`
- Lazy loading implementation
- Performance optimization
- Scroll event handling

## 🎨 Customization

### Thay đổi màu sắc
Edit trong `assets/css/main.css`:
```css
:root {
  --primary-color: #0288d1;
  --secondary-color: #00b894;
  --text-color: #333;
}
```

### Thay đổi lãi suất
Edit trong `assets/js/loan-calculator.js`:
```javascript
const interestRate = 0.0226; // 2.26%/month
```

### Thay đổi giới hạn khoản vay
Edit trong `index.html` (HTML_CODE4 section):
```html
<input
  type="range"
  id="amount"
  min="3000000"
  max="100000000"
  step="1000000"
  value="100000000"
/>
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Mobile Small**: ≤ 375px
- **Mobile**: ≤ 420px
- **Tablet**: 421px - 768px
- **Desktop Small**: 769px - 1024px
- **Desktop**: ≥ 1025px

## ⚡ Performance

- **Lazy Loading**: Images load only when needed
- **Preload**: Critical CSS and fonts preloaded
- **Minification**: CSS và JS được tối ưu hóa
- **Caching**: Browser caching enabled

## 🔐 Security

- Form validation on client-side
- No sensitive data stored in localStorage
- HTTPS recommended for production

## 📞 Liên hệ

**CÔNG TY TÀI CHÍNH TNHH MTV TNEX**

- **Địa chỉ**: Tầng KT, Thăng Long Tower, 98A Ngụy Như Kon Tum, P. Nhân Chính, Q. Thanh Xuân, Hà Nội
- **Hotline**: 0919 570 488
- **MST**: 0301516782
- **Website**: https://www.tnexfinance.online

## 📄 License

Copyright © 2024 TNEX Finance. All rights reserved.

---

**Lưu ý**: Đây là landing page demo. Các chức năng form submission cần được kết nối với backend API để hoạt động đầy đủ.
