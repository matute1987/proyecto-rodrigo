import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="site-header">
      <div className="brand">
        <img
          className="brand_img"
          src="https://frrba.utn.edu.ar/wp-content/uploads/2018/08/logo-utn-ba-horizontal-ex4705172440006.jpeg"
          alt="Logo UTN.BA"
        />
      </div>

      <nav className="site-actions">
        {user ? (
          <>
            <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-primary">
              <FaSignOutAlt style={{ marginRight: 8 }} /> Salir
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline">
              <FaSignInAlt style={{ marginRight: 6 }} /> Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              <FaUserPlus style={{ marginRight: 6 }} /> Registrate
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}