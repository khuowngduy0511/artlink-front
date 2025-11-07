import axios from "./useAxios";
import { getAuthInfo, setNewAccessToken } from "../util/AuthUtil";

const useRefreshToken = () => {
  const refresh = async () => {
    const authInfo = getAuthInfo();
    
    if (!authInfo?.refreshToken) {
      console.error("No refresh token found");
      return null;
    }

    try {
      const body = { refreshToken: authInfo.refreshToken }; // Send the actual refresh token
      const response = await axios.post("/auth/refresh-token", body);
      
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
