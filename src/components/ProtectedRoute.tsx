import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = localStorage.getItem("nagarSevaAuth");
  const user = localStorage.getItem("nagarSevaUser");
  const isAuthenticated = auth === "true" && Boolean(user);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

