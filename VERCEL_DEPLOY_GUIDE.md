# 🚀 Hướng dẫn Deploy Frontend lên Vercel

## ✅ ĐÃ FIX CÁC LỖI:

### 1. TypeError: t.map is not a function
- **Nguyên nhân**: API trả về null/undefined thay vì array
- **Fix**: Thêm validation `Array.isArray()` trong CategoryCarousel và TagCarousel

### 2. Logo192.png not found
- **Nguyên nhân**: File không tồn tại trong public/
- **Fix**: Cập nhật manifest.json chỉ dùng favicon.svg

### 3. Environment Variables sai
- **Nguyên nhân**: `.env.production` dùng tên biến sai
- **Fix**: Đổi sang đúng tên biến:
  - `REACT_APP_REAL_API_BASE_URL` (thay vì REACT_APP_API_URL)
  - `REACT_APP_REAL_API_WS_BASE_URL` (thay vì REACT_APP_WS_URL)

---

## 📋 BƯỚC 1: Cập nhật Environment Variables trên Vercel

### Vào Vercel Dashboard:
1. Truy cập: https://vercel.com/dashboard
2. Click vào project **artlink-front**
3. Settings → **Environment Variables**

### Thêm các biến sau:

```bash
# Backend API URL
REACT_APP_REAL_API_BASE_URL=https://artlink-back.onrender.com/api

# WebSocket URL
REACT_APP_REAL_API_WS_BASE_URL=wss://artlink-back.onrender.com

# Elasticsearch (optional)
REACT_APP_REAL_API_ELASTICSEARCH_URL=https://artlink-back.onrender.com

# Environment
REACT_APP_ENVIRONMENT=production

# Google OAuth Client ID (lấy từ Google Cloud Console)
REACT_APP_GOOGLE_OAUTH_CLIENT_ID=your-google-oauth-client-id
```

### Cách thêm từng biến:
1. Click **Add New**
2. **Name**: Nhập tên biến (ví dụ: `REACT_APP_REAL_API_BASE_URL`)
3. **Value**: Nhập giá trị (ví dụ: `https://artlink-back.onrender.com/api`)
4. **Environment**: Chọn **Production, Preview, Development** (hoặc chỉ Production)
5. Click **Save**

---

## 📋 BƯỚC 2: Deploy Code mới

### Option A: Deploy qua Git Push (Recommended)
```bash
cd D:\Clone\artworks-sharing-platform

# Add files đã sửa
git add .env.production
git add src/layout/HomeScreen/CategoryAndTag/CategoryCarousel/CategoryCarousel.tsx
git add src/components/TagCarousel.tsx
git add public/manifest.json

# Commit
git commit -m "Fix production build - Update env vars, add array validation, fix manifest"

# Push
git push origin main
```

Vercel sẽ tự động deploy sau khi push.

### Option B: Deploy thủ công qua Vercel CLI
```bash
# Install Vercel CLI (nếu chưa có)
npm i -g vercel

# Login
vercel login

# Deploy
cd D:\Clone\artworks-sharing-platform
vercel --prod
```

---

## 📋 BƯỚC 3: Cấu hình Google OAuth (Nếu chưa có)

### 1. Tạo OAuth Client ID:
1. Truy cập: https://console.cloud.google.com/apis/credentials
2. Click **Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `ArtLink Frontend`
5. **Authorized JavaScript origins**:
   - `https://artlink-front.vercel.app`
   - `http://localhost:3000` (cho development)
6. **Authorized redirect URIs**:
   - `https://artlink-front.vercel.app`
   - `http://localhost:3000`
7. Click **Create**
8. Copy **Client ID**

### 2. Thêm Client ID vào Vercel:
1. Vercel Dashboard → artlink-front → Settings → Environment Variables
2. Add new:
   - Name: `REACT_APP_GOOGLE_OAUTH_CLIENT_ID`
   - Value: `[Client ID vừa copy]`
3. Save

### 3. Redeploy:
```bash
# Vercel sẽ tự động redeploy khi thêm env var
# Hoặc trigger manual deploy:
cd D:\Clone\artworks-sharing-platform
vercel --prod
```

---

## 📋 BƯỚC 4: Cấu hình CORS trên Backend

Backend cần cho phép frontend domain:

### Nếu backend trên Render:
1. Truy cập: https://dashboard.render.com
2. Chọn service **artlink-back**
3. Environment → Add:
   - Key: `ALLOWED_ORIGINS`
   - Value: `https://artlink-front.vercel.app,http://localhost:3000`
4. Save Changes → Service sẽ redeploy

### Hoặc update trong code backend:
File: `src/WebApi/Program.cs`
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder
            .WithOrigins(
                "https://artlink-front.vercel.app",
                "http://localhost:3000"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// ...

app.UseCors("AllowFrontend");
```

---

## 📋 BƯỚC 5: Kiểm tra Deployment

### 1. Xem Build Logs:
1. Vercel Dashboard → artlink-front → Deployments
2. Click vào deployment mới nhất
3. Xem **Building** logs để check có lỗi không

### 2. Test Production Site:
```bash
# Mở browser
https://artlink-front.vercel.app

# Kiểm tra:
✅ Trang chủ load không lỗi
✅ Categories và Tags hiển thị
✅ Artworks hiển thị
✅ Login với Google hoạt động
✅ API calls đến https://artlink-back.onrender.com
```

### 3. Check Console Errors:
- F12 → Console tab
- Không nên có lỗi `t.map is not a function`
- Không có lỗi logo192.png
- API calls đến đúng backend URL

---

## 🐛 TROUBLESHOOTING

### Lỗi: Still calling dummyjson.com
**Nguyên nhân**: Environment variables chưa được apply

**Giải pháp**:
1. Kiểm tra Vercel Environment Variables đã thêm đúng chưa
2. Redeploy: Vercel Dashboard → Deployments → ... → Redeploy
3. Clear browser cache và reload

### Lỗi: CORS error
**Nguyên nhân**: Backend chưa cho phép frontend domain

**Giải pháp**:
1. Update CORS config trên backend (xem Bước 4)
2. Restart backend service

### Lỗi: Google OAuth không hoạt động
**Nguyên nhân**: Client ID chưa cấu hình hoặc domain chưa authorize

**Giải pháp**:
1. Kiểm tra `REACT_APP_GOOGLE_OAUTH_CLIENT_ID` đã set chưa
2. Google Cloud Console → Credentials → Kiểm tra Authorized origins

### Lỗi: API returns 500/404
**Nguyên nhân**: Backend có vấn đề hoặc URL sai

**Giải pháp**:
1. Test backend trực tiếp: `curl https://artlink-back.onrender.com/api/health`
2. Kiểm tra backend logs trên Render Dashboard
3. Verify database connection string

---

## ✅ CHECKLIST HOÀN THÀNH

- [ ] Environment variables đã add vào Vercel
- [ ] Code đã push lên GitHub
- [ ] Vercel đã deploy thành công (green checkmark)
- [ ] Google OAuth Client ID đã cấu hình
- [ ] CORS đã cấu hình trên backend
- [ ] Frontend load không lỗi console
- [ ] Categories/Tags hiển thị
- [ ] Artworks hiển thị
- [ ] Login hoạt động
- [ ] API calls đến đúng backend

---

## 📞 NEXT STEPS

Sau khi deploy xong frontend:

1. **Test End-to-End**:
   - Đăng ký tài khoản mới
   - Login
   - Upload artwork
   - Like, comment
   - Buy asset
   - Request service

2. **Monitor Performance**:
   - Vercel Analytics
   - Check response time
   - Monitor error rate

3. **SEO Optimization** (Optional):
   - Add meta tags
   - Generate sitemap
   - Submit to Google Search Console

4. **Custom Domain** (Optional):
   - Vercel → artlink-front → Settings → Domains
   - Add custom domain (ví dụ: artlink.com)
   - Update DNS settings

---

**🎉 Chúc mừng! Frontend của bạn đã sẵn sàng hoạt động!**
