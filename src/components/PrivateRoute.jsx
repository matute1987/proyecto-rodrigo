import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

// ⛔ NO importes PrivateRoute aquí (te estabas importando a vos mismo)

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}