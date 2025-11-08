/* eslint-disable react-hooks/exhaustive-deps */
import "./App.scss";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PrimeReactProvider, addLocale, locale } from "primereact/api";
import "./primereact-theme/themes/mytheme/theme.scss";
import vi from "./primereact-api/locale/vi.json";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
//---------------------------
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
//---------------------------
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./layout/HomeScreen/HomeScreen";
import ProfileScreen from "./layout/ProfileScreen/ProfileScreen";
import LoginScreen from "./layout/LoginScreen/LoginScreen";
import RequireAuth from "./auth/RequireAuth";
import RequireAdminAuth from "./auth/RequireAdminAuth";
import EditProfileTestPage from "./layout/TestingSreen/EditProfileTestPage";
import RegisterScreen from "./layout/RegisterScreen/RegisterScreen";
import ArtlinkDetail from "./layout/ArtlinkDetailScreen/ArtlinkDetail";
import ForgotPasswordScreen from "./layout/ForgotPasswordScreen/ForgotPasswordScreen";
import ResetPasswordScreen from "./layout/ForgotPasswordScreen/ResetPasswordScreen/ResetPasswordScreen";
import ChangePasswordScreen from "./layout/ChangePasswordScreen/ChangePasswordScreen";
import PostArtlinkScreen from "./layout/PostArtlinkScreen/PostArtlinkScreen";
import ArtlinksView from "./layout/ProfileScreen/ArtlinksView/ArtlinksView";
import AssetsView from "./layout/ProfileScreen/AssetsView/AssetsView";
import ServicesView from "./layout/ProfileScreen/ServicesView/ServicesView";
import CollectionsView from "./layout/ProfileScreen/CollectionsView/CollectionsView";
import SubscribeArea from "./layout/ProfileScreen/SubscribeArea/SubscribeArea";
import SetupSubscribeArea from "./layout/ProfileScreen/SetupSubscribeArea/SetupSubscribeArea";
import WalletView from "./layout/ProfileScreen/WalletView/WalletView";
import ProfileSettings from "./layout/ProfileSettingsScreen/ProfileSettingsScreen";
import ChatScreen from "./layout/ChatScreen/ChatScreen";
import CollectionDetailScreen from "./layout/CollectionDetailScreen/CollectionDetailScreen";
import HireScreen from "./layout/HireScreen/HireScreen";
import AdminWithdrawalDashboard from "./pages/admin/AdminWithdrawalDashboard";
import ArtworkModerationScreen from "./layout/ArtworkModerationScreen/ArtworkModerationScreen";

import { getAuthInfo, removeAuthInfo } from "./util/AuthUtil";
import NotFoundPage from "./pages/404";
import SearchScreen from "./layout/SearchScreen/SearchScreen";
import { AuthProvider } from "./auth/context/auth-provider";
import UnknownErrorPage from "./pages/unknown";
import { notificationItemType } from "./components/Notification";
import { GetChatboxesCurrentAccountRealtime } from "./layout/ChatScreen/services/ChatServices";
import InternalServerErrPage from "./pages/500";
import { ChatboxItemType } from "./layout/ChatScreen/ChatRelatedTypes";
import PolicyPage from "./pages/policy";
import RequestScreen from "./layout/RequestScreen/RequestScreen";
import {
  castChatboxToNotification,
  GetNotificationsCurrentAccountRt,
  ValidateAccessToken,
} from "./service";
import VerifyEmailScreen from "./layout/VerifyEmailScreen/VerifyEmailScreen";

function App() {
  addLocale("vi", vi.vi);
  locale("vi");
  const primereactConfigValue = {};
  const ggClientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || "";
  const [authInfo, setAuthInfo] = useState(getAuthInfo());
  const [isLogin, setIsLogin] = useState(authInfo?.id ? true : false);
  const [chatboxes, setChatboxes] = useState<ChatboxItemType[]>([]);
  const [chatNotis, setChatNotis] = useState<notificationItemType[]>([]);
  const [numNotis, setNumNotis] = useState(-3);

  useEffect(() => {
    const authData = getAuthInfo();
    
    // Nếu có authInfo trong localStorage, validate token
    if (authData?.accessToken) {
      ValidateAccessToken(setIsLogin).then((res) => {
        if (res) {
          GetNotificationsCurrentAccountRt(setChatNotis);
          GetChatboxesCurrentAccountRealtime(setChatboxes);
        } else {
          // Token không hợp lệ, xóa authInfo
          removeAuthInfo();
          setIsLogin(false);
        }
      }).catch((error) => {
        console.error("ValidateAccessToken error:", error);
        // Nếu lỗi network, giữ user đăng nhập (offline mode)
        // Chỉ logout nếu token thật sự invalid
      });
    } else {
      // Không có token, đảm bảo logout
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    setNumNotis(numNotis + 1);
  }, [chatNotis]);

  return (
    <PrimeReactProvider value={primereactConfigValue}>
      <GoogleOAuthProvider clientId={ggClientId}>
        <AuthProvider>
          <BrowserRouter>
            <Header
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              chatboxesData={chatboxes.map((chatbox) => castChatboxToNotification(chatbox))}
              notisData={chatNotis}
              numNotis={numNotis}
            />

            <Routes>
              <Route path="/" element={<HomeScreen isLogin={isLogin} />} />
              <Route
                path="/login"
                element={
                  <LoginScreen
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    setAuthInfoChanged={setAuthInfo}
                  />
                }
              />
              <Route path="/verify-email" element={<VerifyEmailScreen/>} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
              <Route path="/reset-password" element={<ResetPasswordScreen />} />
              <Route path="/change-pasword" element={<ChangePasswordScreen />} />
              <Route path="/artlink/:id" element={<ArtlinkDetail />} />
              <Route element={<RequireAuth />}>
                {/* Routes need to protect (must log in to access)*/}
                <Route path="/editTest" element={<EditProfileTestPage />} />
                <Route path="/artlink/post" element={<PostArtlinkScreen />} />
                <Route path="/chat" element={<ChatScreen />} />
                <Route path="/chat/:id" element={<ChatScreen />} />
                <Route path="/my-requests" element={<RequestScreen isLogin={isLogin} />} />
              </Route>
              <Route element={<RequireAdminAuth />}>
                {/* Admin/Moderator only routes */}
                <Route path="/admin/withdrawal" element={<AdminWithdrawalDashboard />} />
                <Route path="/admin/moderation" element={<ArtworkModerationScreen />} />
              </Route>
              <Route path="/account/:id" element={<ProfileScreen isLogin={isLogin} />}>
                <Route path="/account/:id/" element={<ArtlinksView />} />
                <Route path="/account/:id/artlink" element={<ArtlinksView />} />
                <Route path="/account/:id/assets" element={<AssetsView />} />
                <Route path="/account/:id/service" element={<ServicesView />} />
                <Route path="/account/:id/collection" element={<CollectionsView />} />
                <Route path="/account/:id/edit" element={<EditProfileTestPage />} />
                <Route path="/account/:id/subscribe" element={<SubscribeArea />} />
                <Route path="/account/:id/subscribe/setup" element={<SetupSubscribeArea />} />
                <Route path="/account/:id/wallet" element={<WalletView />} />
              </Route>
              <Route path="/account/settings" element={<ProfileSettings />} />
              <Route path="/collection/:id" element={<CollectionDetailScreen />} />
              <Route path="/hire" element={<HireScreen isLogin={isLogin} />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/explore" element={<SearchScreen />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/error" element={<UnknownErrorPage />} />
              <Route path="/error-internal-server" element={<InternalServerErrPage />} />
              <Route path="/policy" element={<PolicyPage />} />
            </Routes>
            <Footer />
            <ToastContainer />
          </BrowserRouter>
        </AuthProvider>
      </GoogleOAuthProvider>
    </PrimeReactProvider>
  );
}

export default App;
