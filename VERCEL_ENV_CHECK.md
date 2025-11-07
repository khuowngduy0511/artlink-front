# Kiểm tra Environment Variables trên Vercel

## ⚠️ LƯU Ý QUAN TRỌNG

Bạn cần set environment variables trên Vercel Dashboard thủ công!

## 🔧 Cách Setup trên Vercel:

### 1. Vào Vercel Dashboard
1. Vào project `artlink-front`
2. Click **Settings**
3. Click **Environment Variables** (sidebar bên trái)

### 2. Thêm các biến sau:

| Key | Value | Environment |
|-----|-------|-------------|
| `REACT_APP_REAL_API_BASE_URL` | `https://artlink-back.onrender.com/api` | Production |
| `REACT_APP_REAL_API_ELASTICSEARCH_URL` | `https://artlink-back.onrender.com` | Production |
| `REACT_APP_REAL_API_WS_BASE_URL` | `wss://artlink-back.onrender.com` | Production |
| `REACT_APP_GOOGLE_OAUTH_CLIENT_ID` | `288851654336-5032vgjp1jgernijanj50fp9i2j1rqtt.apps.googleusercontent.com` | Production |
| `REACT_APP_ENVIRONMENT` | `production` | Production |

### 3. Redeploy

Sau khi thêm xong, click **Redeploy** để áp dụng:
```bash
# Hoặc trigger redeploy bằng cách push code
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

## 🧪 Test Environment Variables

Sau khi deploy, mở Console trên browser và chạy:

```javascript
// Kiểm tra backend URL
console.log('API URL:', process.env.REACT_APP_REAL_API_BASE_URL);
console.log('WS URL:', process.env.REACT_APP_REAL_API_WS_BASE_URL);
```

Phải thấy URL đúng là `https://artlink-back.onrender.com/api`

## 🐛 Debug Refresh Token Issue

Nếu vẫn bị logout sau khi login:

1. **Mở DevTools** (F12)
2. **Network tab** → Filter: XHR
3. **Login** và xem các request:
   - `POST /api/auth/login` → Phải trả về `accessToken` và `refreshToken`
   - Kiểm tra localStorage có lưu đúng không
4. **Console tab** → Xem có lỗi gì không

### Expected Flow:
```
1. Login → Save accessToken + refreshToken to localStorage
2. Make API request → Send accessToken in Authorization header
3. If 401 → Call /auth/refresh-token với refreshToken
4. Get new accessToken → Retry original request
5. If refresh fails → Redirect to /login
```

## 🔐 Check LocalStorage

Mở Console và chạy:
```javascript
// Xem authData
console.log(JSON.parse(localStorage.getItem('authData')));

// Kiểm tra có refreshToken không
const authData = JSON.parse(localStorage.getItem('authData'));
console.log('Access Token:', authData?.accessToken);
console.log('Refresh Token:', authData?.refreshToken);
```

## ✅ Checklist

- [ ] Environment variables đã được set trên Vercel Dashboard
- [ ] Đã redeploy sau khi set env vars
- [ ] Backend `/auth/refresh-token` endpoint hoạt động đúng
- [ ] localStorage lưu đúng cả `accessToken` và `refreshToken`
- [ ] Console không có lỗi CORS
- [ ] Network tab cho thấy refresh token được gửi đúng format
