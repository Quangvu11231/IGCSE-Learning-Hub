import { Spin } from "antd";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import { Dashboard, Login, Register } from "../pages";
import { Screen404, Screen500, Screen501 } from "../pages/errors";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <PrivateRoute
              isAuthPage
              loadingFallback={
                <Spin
                  size="large"
                  className="flex items-center justify-center h-screen"
                />
              }
            >
              <Login />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <PrivateRoute
              loadingFallback={
                <Spin
                  size="large"
                  className="flex items-center justify-center h-screen"
                />
              }
            >
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute
              loadingFallback={
                <Spin
                  size="large"
                  className="flex items-center justify-center h-screen"
                />
              }
            >
              <div>Profile Page</div>
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="/501" element={<Screen501 />} />
      <Route path="/500" element={<Screen500 />} />
      <Route path="*" element={<Screen404 />} />
    </Routes>
  );
};

export default AppRoutes;
