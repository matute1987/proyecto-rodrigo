import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa"; // 👈 iconos
import "./Header.css";

export function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="site-header">
      {/* Logo */}
      <Link to="/" className="brand">
        <img
          src="https://frba.utn.edu.ar/wp-content/uploads/2016/08/logo-utn.ba-horizontal-e471b517244000.jpg"
          alt="Logo UTN.BA"
          className="brand__img"
        />
      </Link>

      {/* Acciones */}
      <nav className="auth-actions">
        {user ? (
          <>
            <Link to="/dashboard" className="btn btn-outline">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="btn btn-primary">
              <FaSignOutAlt style={{ marginRight: "8px" }} />
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline">
              <FaSignInAlt style={{ marginRight: "8px" }} />
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              <FaUserPlus style={{ marginRight: "8px" }} />
              Regístrate
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}