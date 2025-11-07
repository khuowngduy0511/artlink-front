import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuthInfo } from "../util/AuthUtil";

type Props = {
  children?: ReactNode;
};

/**
 * Route guard component that restricts access to Admin and Moderator roles only
 * Redirects to 401 (Unauthorized) if user is not an Admin or Moderator
 * Redirects to login if user is not authenticated
 */
export default function RequireAdminAuth({ children }: Props) {
  const authenticationInfo = getAuthInfo();
  const location = useLocation();

  // Check if user is logged in
  if (!authenticationInfo?.id) {
    // Not logged in -> redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  // Check if user has Admin or Moderator role
  const userRole = Array.isArray(authenticationInfo.role) 
    ? authenticationInfo.role[0] 
    : authenticationInfo.role;

  const isAdminOrModerator = 
    userRole === "Admin" || 
    userRole === "Moderator" ||
    userRole === "0" || // RoleEnum.Admin = 0
    userRole === "1";   // RoleEnum.Moderator = 1

  if (!isAdminOrModerator) {
    // Logged in but not Admin/Moderator -> redirect to 401
    return <Navigate to="/401" state={{ from: location }} replace={true} />;
  }

  // User is Admin or Moderator -> allow access
  return <Outlet />;
}
