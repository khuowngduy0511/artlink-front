import { notificationItemType } from "./components/Notification";
import { axiosPrivate } from "./hooks/useAxios";
import { ChatboxItemType } from "./layout/ChatScreen/ChatRelatedTypes";
import { arraysNotisEqual } from "./util/ArrayUtil";
import { getAuthInfo } from "./util/AuthUtil";

export const BASE_URL_Elt =
  process.env.REACT_APP_REAL_API_ELASTICSEARCH_URL || "https://artlink-back.onrender.com";
export const BASE_URL = process.env.REACT_APP_REAL_API_BASE_URL || "https://artlink-back.onrender.com";
export const WS_URL = process.env.REACT_APP_REAL_API_WS_BASE_URL || "https://artlink-back.onrender.com";

/**
 * This function casts a chatbox to a notification
 *
 * @param chatbox - chatbox to cast
 * @returns notification
 * @version 1.0.0
 * @author 
 */
export function castChatboxToNotification(chatbox: ChatboxItemType): notificationItemType {
  const notification: notificationItemType = {
    notificationId: chatbox.id,
    content: chatbox?.text || "Tin nhắn mới ...",
    notifyType: "chat",
    isSeen: chatbox.isSeen,
    creationDate: chatbox.time,
    createdBy: chatbox.author.fullname,
    avatar: chatbox.avatar,
  };

  return notification;
}

/**
 *
 * This function validates the access token
 *
 * @param setIsLogin (opt) - set the login status
 * @returns true if the access token is valid, false otherwise
 * @version 1.2.0
 * @author 
 */
export async function ValidateAccessToken(setIsLogin?: (value: boolean) => void) {
  try {
    const authInfo = getAuthInfo();
    
    console.log("[ValidateAccessToken] Starting validation...");
    console.log("[ValidateAccessToken] Has authInfo:", !!authInfo);
    console.log("[ValidateAccessToken] Has accessToken:", !!authInfo?.accessToken);
    console.log("[ValidateAccessToken] API Base URL:", BASE_URL);
    
    if (!authInfo?.accessToken) {
      console.log("[ValidateAccessToken] No access token found");
      setIsLogin && setIsLogin(false);
      return false;
    }

    const res = await axiosPrivate.get(`/auth/validate-access-token`);
    console.log("[ValidateAccessToken] Response:", res.data);

    if (res?.data) {
      console.log("[ValidateAccessToken] ✅ Token is valid");
      setIsLogin && setIsLogin(true);
      return true;
    } else {
      console.log("[ValidateAccessToken] ❌ Token is invalid");
      setIsLogin && setIsLogin(false);
      return false;
    }
  } catch (error: any) {
    console.error("[ValidateAccessToken] ❌ Error:", error?.response?.status, error?.message);
    
    // Nếu lỗi 401, token không hợp lệ
    if (error?.response?.status === 401) {
      console.log("[ValidateAccessToken] Token expired or invalid");
      setIsLogin && setIsLogin(false);
      return false;
    }
    
    // Nếu lỗi network, giữ login status (offline mode)
    if (!error?.response) {
      console.log("[ValidateAccessToken] Network error - keeping login status");
      // Không set isLogin = false nếu là lỗi network
      return false;
    }
    
    setIsLogin && setIsLogin(false);
    return false;
  }
}

/**
 *
 * This function gets the notifications of the current account in real-time
 *
 * @param setChatNotis - set the chat notifications
 * @returns a promise that resolves to a function to close the WebSocket connection
 * @version 1.0.0
 */
export async function GetNotificationsCurrentAccountRt(
  setChatNotis: (value: notificationItemType[]) => void
) {
  const authenticationInfo = getAuthInfo();
  const url = `${WS_URL}/api/accounts/${authenticationInfo?.id}/notifications/ws?PageNumber=1&PageSize=10`;
  const socket = new WebSocket(url);

  let _tmpChatNotis: notificationItemType[] = [];

  return new Promise<() => void>((resolve, reject) => {
    socket.onopen = () => {
      // console.log("WS GetNotificationsCurrentAccountRt established");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const notis = data?.Items?.map((noti: any) => {
        return {
          notificationId: noti.Id,
          content: noti.Content,
          notifyType: noti.NotifyType,
          isSeen: noti.IsSeen,
          creationDate: noti.CreatedOn,
          createdBy: noti.createdBy,
          avatar: noti.avatar,
        };
      });

      if (Array.isArray(notis) && !arraysNotisEqual(_tmpChatNotis, notis)) {
        _tmpChatNotis = notis;
        setChatNotis(notis);
      }
    };

    socket.onclose = () => {
      // console.log("WebSocket connection GetNotificationsCurrentAccountRt closed");
    };

    socket.onerror = (error) => {
      // console.error("WebSocket GetNotificationsCurrentAccountRt error:", error);
      reject(error);
    };

    resolve(() => {
      socket.close();
    });
  });
}
