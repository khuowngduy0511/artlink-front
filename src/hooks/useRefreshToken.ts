import axios from "axios";
import { getAuthInfo, setNewAccessToken } from "../util/AuthUtil";

const BASE_URL = process.env.REACT_APP_REAL_API_BASE_URL || "https://dummyjson.com";

const useRefreshToken = () => {
  const refresh = async () => {
    const authInfo = getAuthInfo();
    
    if (!authInfo?.refreshToken) {
      console.error("No refresh token found");
      return null;
    }

    try {
      const body = { refreshToken: authInfo.refreshToken }; // Send the actual refresh token
      
      // Use plain axios (NO interceptor) to prevent infinite loop
      const response = await axios.post(`${BASE_URL}/auth/refresh-token`, body);
      
      if (response?.data?.isSuccess) {
        const newAccessToken = response?.data?.result?.accessToken;
        setNewAccessToken(newAccessToken);
        return newAccessToken;
      }
      
      return null;
    } catch (error) {
      console.error("Refresh token failed:", error);
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
