import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

interface PrivateRouteProps {
  children: React.ReactNode;
  isAuthPage?: boolean;
  redirectTo?: string;
  loadingFallback?: React.ReactNode;
}

const PrivateRoute = ({
  children,
  isAuthPage = false,
  redirectTo = "/login",
  loadingFallback = null,
}: PrivateRouteProps) => {
  const { user, initialLoading } = useAuth(); // Sử dụng initialLoading

  // Hiển thị loading nếu đang kiểm tra auth lần đầu
  if (initialLoading) {
    return <>{loadingFallback}</>;
  }

  // Xử lý trang auth (login/register)
  if (isAuthPage) {
    return user ? <Navigate to="/" replace /> : <>{children}</>;
  }

  // Trang bình thường - yêu cầu đăng nhập
  return user ? <>{children}</> : <Navigate to={redirectTo} replace />;
};
export default PrivateRoute;
