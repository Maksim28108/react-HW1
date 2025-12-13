import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Order from "./pages/order/Order";
import RequireAuth from "./components/authorization/RequireAuth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />

          <Route
            path="/order"
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
