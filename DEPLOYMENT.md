# 🚀 Hướng dẫn Deploy lên GitHub Pages

Tài liệu này hướng dẫn chi tiết cách deploy website TNEX Finance lên GitHub Pages.

## 📋 Yêu cầu

- Tài khoản GitHub
- Git đã cài đặt trên máy
- Repository GitHub (public hoặc private với GitHub Pro)

## 🎯 Các bước thực hiện

### Bước 1: Khởi tạo Git Repository (nếu chưa có)

```bash
# Di chuyển vào thư mục project
cd /Users/amz-newit-04/workspace/prj/vaynhanhtnex.vn

# Khởi tạo git
git init

# Thêm tất cả files
git add .

# Commit lần đầu
git commit -m "Initial commit: TNEX Finance website"
```

### Bước 2: Tạo Repository trên GitHub

1. Truy cập https://github.com
2. Click nút **"New"** hoặc **"+"** > **"New repository"**
3. Đặt tên repository: `vaynhanhtnex.vn` (hoặc tên bạn muốn)
4. Chọn **Public** (bắt buộc cho GitHub Pages miễn phí)
5. **KHÔNG** chọn "Initialize with README" (vì đã có README.md)
6. Click **"Create repository"**

### Bước 3: Kết nối Local với GitHub

```bash
# Thay YOUR_USERNAME bằng username GitHub của bạn
git remote add origin https://github.com/YOUR_USERNAME/vaynhanhtnex.vn.git

# Đổi tên branch thành main (nếu cần)
git branch -M main

# Push code lên GitHub
git push -u origin main
```

### Bước 4: Cấu hình GitHub Pages

#### Cách 1: Qua GitHub Web Interface (Dễ nhất)

1. Vào repository trên GitHub
2. Click vào **Settings** (góc phải)
3. Scroll xuống phần **"Pages"** (menu bên trái)
4. Trong **"Source"**, chọn:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **"Save"**
6. Đợi vài phút, website sẽ có tại: `https://YOUR_USERNAME.github.io/vaynhanhtnex.vn/`

#### Cách 2: Sử dụng GitHub Actions (Tự động)

Tạo file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Bước 5: Cấu hình Custom Domain (Tùy chọn)

Nếu bạn có domain riêng (ví dụ: vaynhanhtnex.vn):

#### A. Cấu hình trên GitHub:

1. Vào **Settings** > **Pages**
2. Trong **"Custom domain"**, nhập: `vaynhanhtnex.vn`
3. Click **"Save"**

#### B. Cấu hình DNS tại nhà cung cấp domain:

Thêm các DNS records sau:

**Cho domain chính (vaynhanhtnex.vn):**
```
Type: A
Host: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**Cho subdomain (www.vaynhanhtnex.vn):**
```
Type: CNAME
Host: www
Value: YOUR_USERNAME.github.io
```

#### C. Tạo file CNAME trong project:

```bash
echo "vaynhanhtnex.vn" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### Bước 6: Enable HTTPS (Tự động)

1. Vào **Settings** > **Pages**
2. Check ✅ **"Enforce HTTPS"**
3. GitHub sẽ tự động cấp SSL certificate (từ Let's Encrypt)

## 🔧 Cấu hình bổ sung

### Tạo file `.gitignore`

```bash
# Tạo file .gitignore
cat > .gitignore << 'EOF'
# macOS
.DS_Store
.AppleDouble
.LSOverride

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log*

# Temporary files
*.tmp
.cache/

# Backup files
*_backup.html
*.bak
EOF

git add .gitignore
git commit -m "Add .gitignore"
git push
```

### Tạo file `404.html` (Tùy chọn)

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Không tìm thấy trang | TNEX Finance</title>
    <style>
        body {
            font-family: 'Open Sans', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #0d62f2 0%, #06b2e4 100%);
            color: white;
            text-align: center;
            padding: 20px;
        }
        .container {
            max-width: 600px;
        }
        h1 {
            font-size: 120px;
            margin: 0;
            line-height: 1;
        }
        h2 {
            font-size: 32px;
            margin: 20px 0;
        }
        p {
            font-size: 18px;
            margin: 20px 0 40px;
        }
        a {
            display: inline-block;
            padding: 15px 40px;
            background: white;
            color: #0d62f2;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            transition: transform 0.3s;
        }
        a:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <h2>Không tìm thấy trang</h2>
        <p>Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển đi.</p>
        <a href="/">Về trang chủ</a>
    </div>
</body>
</html>
```

## 📝 Cập nhật website

Mỗi khi có thay đổi:

```bash
# Thêm files đã thay đổi
git add .

# Commit với message mô tả
git commit -m "Update: [mô tả thay đổi]"

# Push lên GitHub
git push

# GitHub Pages sẽ tự động deploy sau vài phút
```

## ⚡ Tips và Best Practices

### 1. **Kiểm tra trước khi deploy**
```bash
# Test local trước
python3 -m http.server 8000

# Kiểm tra các links
# Kiểm tra responsive
# Test form submissions
```

### 2. **Tối ưu performance**
- Minify CSS/JS trước khi deploy
- Optimize images
- Enable caching headers

### 3. **SEO cho GitHub Pages**

Thêm vào `<head>` của `index.html`:
```html
<meta name="robots" content="index, follow">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
```

Tạo file `sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://YOUR_USERNAME.github.io/vaynhanhtnex.vn/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 4. **Google Analytics**

Thêm vào `<head>` của `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Troubleshooting

### Lỗi: 404 Not Found sau khi deploy

**Nguyên nhân**: GitHub Pages chưa build xong

**Giải pháp**:
- Đợi 5-10 phút
- Check **Actions** tab để xem build status
- Xóa cache browser (Ctrl + F5)

### Lỗi: CSS/JS không load

**Nguyên nhân**: Đường dẫn file không đúng

**Giải pháp**:
```html
<!-- Thay vì -->
<link rel="stylesheet" href="assets/css/main.css">

<!-- Dùng absolute path -->
<link rel="stylesheet" href="/assets/css/main.css">

<!-- Hoặc với repository name -->
<link rel="stylesheet" href="/vaynhanhtnex.vn/assets/css/main.css">
```

### Lỗi: Custom domain không hoạt động

**Giải pháp**:
1. Kiểm tra DNS đã propagate chưa: https://dnschecker.org
2. Đợi 24-48h để DNS propagate hoàn toàn
3. Xóa và thêm lại custom domain trong Settings

### Lỗi: HTTPS không khả dụng

**Giải pháp**:
1. Chắc chắn DNS đã trỏ đúng
2. Đợi GitHub cấp SSL certificate (có thể mất 24h)
3. Uncheck và check lại "Enforce HTTPS"

## 📊 Monitoring và Analytics

### 1. GitHub Insights
- Vào repository > **Insights** > **Traffic**
- Xem số lượt views, visitors
- Tracking referring sites

### 2. Custom Analytics

Tạo file `assets/js/analytics.js`:
```javascript
// Simple page view tracking
(function() {
  const pageView = {
    url: window.location.href,
    referrer: document.referrer,
    timestamp: new Date().toISOString()
  };
  
  console.log('Page view:', pageView);
  // Send to your analytics endpoint
})();
```

## 🔐 Security Considerations

### 1. Không commit sensitive data
- API keys
- Passwords
- Private tokens

### 2. Sử dụng environment variables

Cho production, sử dụng GitHub Secrets:
1. Vào **Settings** > **Secrets and variables** > **Actions**
2. Add secrets cần thiết
3. Reference trong GitHub Actions workflow

### 3. Content Security Policy

Thêm vào `<head>`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://w.ladicdn.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
```

## 📞 Support

Nếu gặp vấn đề:
1. Check [GitHub Pages Documentation](https://docs.github.com/en/pages)
2. Check [GitHub Status](https://www.githubstatus.com/)
3. Contact GitHub Support

## ✅ Checklist Deploy

- [ ] Code đã được test kỹ local
- [ ] Tất cả assets paths đã đúng
- [ ] Git repository đã push lên GitHub
- [ ] GitHub Pages đã được enable
- [ ] Website accessible tại URL GitHub Pages
- [ ] HTTPS đã được enable
- [ ] Custom domain đã cấu hình (nếu có)
- [ ] 404 page đã tạo
- [ ] Sitemap đã tạo
- [ ] Google Analytics đã setup (nếu cần)
- [ ] Mobile responsive đã test
- [ ] Cross-browser đã test

---

**Chúc bạn deploy thành công! 🎉**

Nếu có thắc mắc, vui lòng tham khảo [GitHub Pages Documentation](https://docs.github.com/en/pages) hoặc liên hệ support.
