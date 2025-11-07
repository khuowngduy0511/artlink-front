// DEBUG SCRIPT - Copy đoạn này và chạy trên Console của browser
// Mở https://artlink-front.vercel.app/ và paste vào Console (F12)

console.log("=== ENVIRONMENT CHECK ===");
console.log("API Base URL:", process.env.REACT_APP_REAL_API_BASE_URL);
console.log("WS URL:", process.env.REACT_APP_REAL_API_WS_BASE_URL);
console.log("Google OAuth ID:", process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID);

console.log("\n=== LOCALSTORAGE CHECK ===");
const authData = JSON.parse(localStorage.getItem('authData') || '{}');
console.log("Auth Data:", authData);
console.log("Has Access Token:", !!authData?.accessToken);
console.log("Has Refresh Token:", !!authData?.refreshToken);
console.log("Access Token (first 50 chars):", authData?.accessToken?.substring(0, 50));
console.log("Refresh Token (first 50 chars):", authData?.refreshToken?.substring(0, 50));

console.log("\n=== AXIOS BASE URL ===");
// Check xem axios đang dùng URL nào
import("./hooks/useAxios").then(module => {
  console.log("Axios instance created with BASE_URL");
});

console.log("\n=== INSTRUCTIONS ===");
console.log("1. Nếu API Base URL là 'undefined' hoặc 'https://dummyjson.com':");
console.log("   → Environment variables CHƯA được set trên Vercel!");
console.log("   → Vào Vercel Dashboard → Settings → Environment Variables");
console.log("");
console.log("2. Nếu Access Token hoặc Refresh Token là 'undefined':");
console.log("   → Login KHÔNG lưu token vào localStorage!");
console.log("   → Kiểm tra LoginScreen.tsx và AuthService.ts");
console.log("");
console.log("3. Nếu có cả 2 token nhưng vẫn bị logout:");
console.log("   → Kiểm tra Network tab, xem request nào fail");
console.log("   → Có thể là CORS issue hoặc backend không nhận token");
