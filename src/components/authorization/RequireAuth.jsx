import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const { user, loading } = useSelector((s) => s.auth);

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  return children;
}
