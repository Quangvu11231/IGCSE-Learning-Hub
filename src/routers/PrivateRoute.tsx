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
  const { user, initialLoading } = useAuth();

  // Hiển thị loading nếu đang kiểm tra auth lần đầu
  if (initialLoading) {
    return <>{loadingFallback}</>;
  }

  const token = localStorage.getItem("token");
  const isAuthenticated = !!(user || token);

  // Xử lý trang auth (login/register)
  if (isAuthPage) {
    // Nếu đã login -> redirect về trang chủ
    return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
  }

  // Trang bình thường - yêu cầu đăng nhập
  // Nếu CHƯA login -> redirect về trang login
  return isAuthenticated ? <>{children}</> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;