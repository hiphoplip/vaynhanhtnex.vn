# ⚡ Quick Start - Deploy lên GitHub Pages

Hướng dẫn nhanh nhất để deploy website lên GitHub Pages trong 5 phút.

## 🎯 Các bước thực hiện

### Bước 1: Tạo GitHub Repository

1. Truy cập https://github.com và đăng nhập
2. Click nút **"+"** góc phải > **"New repository"**
3. Điền thông tin:
   - **Repository name**: `vaynhanhtnex.vn`
   - **Visibility**: Chọn **Public**
   - **KHÔNG** check "Initialize with README"
4. Click **"Create repository"**

### Bước 2: Deploy bằng Script (Cách dễ nhất)

Mở Terminal và chạy:

```bash
cd /Users/amz-newit-04/workspace/prj/vaynhanhtnex.vn
./deploy.sh
```

Script sẽ tự động:
- ✅ Khởi tạo git (nếu chưa có)
- ✅ Add tất cả files
- ✅ Commit với message
- ✅ Push lên GitHub

**Lưu ý**: Khi script hỏi repository URL, copy URL từ GitHub (ví dụ: `https://github.com/username/vaynhanhtnex.vn.git`)

### Bước 3: Enable GitHub Pages

1. Vào repository trên GitHub
2. Click **Settings** (tab cuối bên phải)
3. Scroll xuống menu bên trái, click **Pages**
4. Trong **Source**, chọn:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**

### Bước 4: Chờ và truy cập

Đợi 2-3 phút, sau đó truy cập:

```
https://YOUR_USERNAME.github.io/vaynhanhtnex.vn/
```

Thay `YOUR_USERNAME` bằng username GitHub của bạn.

## 🚀 Cập nhật website sau này

Mỗi khi có thay đổi, chỉ cần chạy:

```bash
./deploy.sh
```

Hoặc thủ công:

```bash
git add .
git commit -m "Update website"
git push
```

## 📱 Deploy bằng GitHub Desktop (Không dùng Terminal)

### Bước 1: Cài GitHub Desktop
- Download: https://desktop.github.com/
- Cài đặt và đăng nhập

### Bước 2: Add Repository
1. Mở GitHub Desktop
2. **File** > **Add Local Repository**
3. Chọn folder: `/Users/amz-newit-04/workspace/prj/vaynhanhtnex.vn`
4. Click **Add Repository**

### Bước 3: Publish
1. Viết commit message (ví dụ: "Initial commit")
2. Click **Commit to main**
3. Click **Publish repository**
4. Chọn:
   - ✅ **Public**
   - Repository name: `vaynhanhtnex.vn`
5. Click **Publish Repository**

### Bước 4: Enable GitHub Pages
- Follow Bước 3 từ hướng dẫn trên

## ⚙️ Cấu hình Custom Domain (Tùy chọn)

Nếu bạn có domain riêng (ví dụ: `vaynhanhtnex.vn`):

### 1. Tạo file CNAME

```bash
echo "vaynhanhtnex.vn" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

### 2. Cấu hình DNS

Vào nhà cung cấp domain (VD: GoDaddy, Namecheap), thêm:

**A Records:**
```
Host: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**CNAME Record:**
```
Host: www
Value: YOUR_USERNAME.github.io
```

### 3. Enable trên GitHub

1. **Settings** > **Pages**
2. **Custom domain**: Nhập `vaynhanhtnex.vn`
3. Click **Save**
4. Đợi DNS propagate (24-48 giờ)

## ✅ Checklist

Trước khi deploy, đảm bảo:

- [ ] Tất cả links đều hoạt động
- [ ] Images load được
- [ ] Form submission hoạt động
- [ ] Mobile responsive OK
- [ ] Đã test trên Chrome/Safari/Firefox

## 🐛 Troubleshooting

### Lỗi: "Permission denied"

```bash
chmod +x deploy.sh
./deploy.sh
```

### Lỗi: "Authentication failed"

```bash
# Sử dụng SSH thay vì HTTPS
git remote set-url origin git@github.com:username/vaynhanhtnex.vn.git
```

Hoặc setup Personal Access Token:
1. GitHub > **Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)**
2. **Generate new token** > Chọn **repo** scope
3. Copy token và dùng thay password khi push

### Website không hiện sau 10 phút

1. Check **Actions** tab xem build có lỗi không
2. Clear browser cache (Ctrl/Cmd + Shift + R)
3. Kiểm tra Settings > Pages đã enable đúng branch chưa

### CSS/JS không load

Trong `index.html`, đổi:
```html
<!-- Từ -->
<link rel="stylesheet" href="assets/css/main.css">

<!-- Thành -->
<link rel="stylesheet" href="/vaynhanhtnex.vn/assets/css/main.css">
```

## 📞 Cần giúp đỡ?

- 📖 [Full Deployment Guide](DEPLOYMENT.md)
- 🐙 [GitHub Pages Docs](https://docs.github.com/en/pages)
- 💬 [GitHub Community](https://github.community/)

---

**🎉 Chúc bạn deploy thành công!**

Sau khi deploy xong, share link website để nhận feedback nhé!
