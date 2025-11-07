# 🔧 ĐÃ SỬA: Fix Refresh Token Bug

## ❌ CÁC LỖI ĐÃ TÌM THẤY:

### 1. **useRefreshToken.ts** (LỖI NGHIÊM TRỌNG)
**Dòng 8 - Đang gửi sai token:**
```typescript
// ❌ TRƯỚC (SAI):
const body = { refreshToken: authInfo?.accessToken }; // Đang gửi accessToken!!!

// ✅ SAU (ĐÚNG):
const body = { refreshToken: authInfo.refreshToken }; // Gửi refreshToken
```

**Vấn đề**: 
- Backend nhận `accessToken` thay vì `refreshToken`
- Backend reject request → User bị logout ngay lập tức

---

### 2. **useAxios.ts** (Response Interceptor)
**Dòng 32 - Bắt sai HTTP status code:**
```typescript
// ❌ TRƯỚC (SAI):
if (error?.response?.status === 403 && !error.config?.retry) {
  // 403 là Forbidden, không phải Unauthorized!
}

// ✅ SAU (ĐÚNG):
if (error?.response?.status === 401 && !originalRequest?._retry) {
  // 401 là Unauthorized - token hết hạn
  originalRequest._retry = true;
  
  const newAccessToken = await refresh();
  
  if (newAccessToken) {
    // Retry với token mới
    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
    return instance(originalRequest);
  } else {
    // Refresh thất bại → Redirect login
    window.location.href = "/login";
  }
}
```

**Vấn đề**:
- Backend trả về **401** khi token hết hạn
- Code đang bắt **403** → Không bao giờ refresh token
- User bị logout mỗi khi access token hết hạn (3 giờ)

---

### 3. **service.ts** (ValidateAccessToken)
**Cải thiện error handling:**
```typescript
// ✅ Thêm kiểm tra authInfo trước khi gọi API
if (!authInfo?.accessToken) {
  setIsLogin && setIsLogin(false);
  return false;
}

// ✅ Kiểm tra response.data.isSuccess
if (res?.data?.isSuccess) {
  setIsLogin && setIsLogin(true);
  return true;
}
```

---

## ✅ NHỮNG GÌ ĐÃ ĐƯỢC SỬA:

### File: `src/hooks/useRefreshToken.ts`
- ✅ Gửi đúng `refreshToken` thay vì `accessToken`
- ✅ Thêm null check và error handling
- ✅ Return null nếu refresh thất bại

### File: `src/hooks/useAxios.ts`
- ✅ Bắt HTTP 401 thay vì 403
- ✅ Đổi tên biến `error.config` thành `originalRequest` (rõ ràng hơn)
- ✅ Check `_retry` flag để tránh infinite loop
- ✅ Redirect đến `/login` nếu refresh thất bại
- ✅ Proper error handling với try-catch

### File: `src/service.ts`
- ✅ Kiểm tra `authInfo?.accessToken` trước khi call API
- ✅ Validate `response.data.isSuccess` 
- ✅ Better console logging cho debug

---

## 🔄 FLOW MỚI (SAU KHI SỬA):

```
User Login
   ↓
Save accessToken + refreshToken to localStorage
   ↓
Make API Request with accessToken
   ↓
Backend checks token
   ↓
[Token hết hạn] → Backend trả về 401
   ↓
useAxios interceptor bắt 401
   ↓
Call /auth/refresh-token với refreshToken
   ↓
Backend trả về accessToken mới
   ↓
Save new accessToken to localStorage
   ↓
Retry original request với token mới
   ↓
✅ Success!

[Nếu refresh token cũng hết hạn]
   ↓
Refresh API fails
   ↓
Redirect to /login
   ↓
User đăng nhập lại
```

---

## ⚠️ QUAN TRỌNG: CẦN LÀM THÊM

### 1. **Set Environment Variables trên Vercel**

Vercel **KHÔNG TỰ ĐỘNG** đọc file `.env.production`!

Bạn phải set thủ công:

1. Vào: https://vercel.com/dashboard
2. Chọn project **artlink-front**
3. **Settings** → **Environment Variables**
4. Thêm các biến sau (cho **Production** environment):

```
REACT_APP_REAL_API_BASE_URL=https://artlink-back.onrender.com/api
REACT_APP_REAL_API_ELASTICSEARCH_URL=https://artlink-back.onrender.com
REACT_APP_REAL_API_WS_BASE_URL=wss://artlink-back.onrender.com
REACT_APP_GOOGLE_OAUTH_CLIENT_ID=288851654336-5032vgjp1jgernijanj50fp9i2j1rqtt.apps.googleusercontent.com
REACT_APP_ENVIRONMENT=production
```

5. **Save** → **Redeploy** (hoặc push code lại)

---

### 2. **Kiểm tra Backend Endpoint**

Test backend có hoạt động không:

```bash
# Test refresh token endpoint
curl -X POST https://artlink-back.onrender.com/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "YOUR_REFRESH_TOKEN_HERE"}'
```

Expected response:
```json
{
  "isSuccess": true,
  "result": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. **Test trên Production**

Sau khi Vercel deploy xong (2-3 phút):

1. Mở https://artlink-front.vercel.app/
2. **F12** → Console tab
3. Login với tài khoản
4. Kiểm tra Console log:
   ```
   ValidateAccessToken: {data: {...}}
   ```
5. Kiểm tra localStorage:
   ```javascript
   JSON.parse(localStorage.getItem('authData'))
   ```
   Phải có cả `accessToken` và `refreshToken`

6. **Network tab** → XHR
7. Xem request `/auth/refresh-token` có được gọi sau 3 giờ không

---

## 🐛 DEBUG NẾU VẪN LỖI:

### Lỗi: "Vẫn bị logout sau khi login"

**Check 1: Environment variables**
```javascript
// Mở Console trên https://artlink-front.vercel.app/
console.log(process.env.REACT_APP_REAL_API_BASE_URL);
// Phải hiện: "https://artlink-back.onrender.com/api"
// Nếu là "https://dummyjson.com" → Env vars chưa được set!
```

**Check 2: localStorage**
```javascript
const authData = JSON.parse(localStorage.getItem('authData'));
console.log('Access Token:', authData?.accessToken);
console.log('Refresh Token:', authData?.refreshToken);
// Cả 2 phải có giá trị
```

**Check 3: Network requests**
- Login request phải trả về cả `accessToken` và `refreshToken`
- Header Authorization phải có: `Bearer eyJhbGciOiJIUzI1NiIs...`

**Check 4: Backend CORS**
- Backend phải allow origin: `https://artlink-front.vercel.app`
- Backend phải allow credentials

---

## 📋 CHECKLIST HOÀN THÀNH:

- [x] ✅ Fix useRefreshToken.ts - gửi đúng refreshToken
- [x] ✅ Fix useAxios.ts - bắt HTTP 401 thay vì 403
- [x] ✅ Improve service.ts error handling
- [x] ✅ Push code lên GitHub
- [x] ✅ Vercel auto-deploy triggered
- [ ] ⏳ **TODO: Set environment variables trên Vercel Dashboard**
- [ ] ⏳ **TODO: Test trên production sau khi deploy xong**

---

## 🎯 KẾT QUẢ MONG ĐỢI:

Sau khi deploy xong và set env vars:

✅ User login thành công  
✅ Không bị logout ngay lập tức  
✅ Access token tự động refresh sau 3 giờ  
✅ User chỉ phải login lại sau 7 ngày (khi refresh token hết hạn)  
✅ API calls hoạt động bình thường  

---

**🚀 Deployment đã trigger! Đợi 2-3 phút rồi set env vars trên Vercel!**
