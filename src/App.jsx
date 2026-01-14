import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import { MainPage } from "./pages/mainpage/MainPage";
import Order from "./pages/order/Order";
import RequireAuth from "./components/authorization/RequireAuth";
import AuthListener from "./components/authorization/AuthListener";

export default function App() {
  return (
    <BrowserRouter>
      <AuthListener />

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<MainPage />} />

          <Route path="login" element={<Login />} />

          <Route
            path="order"
            element={
              <RequireAuth>
                <Order />
              </RequireAuth>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
