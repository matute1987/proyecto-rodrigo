import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import "./Header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  // Cerrar el menú al cambiar de ruta
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Cerrar si se hace click fuera del panel
  useEffect(() => {
    function onClickOutside(e) {
      if (open && panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  // Cerrar con Escape y bloquear scroll del body cuando está abierto
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

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
      <div className="site-header__container">
        {/* Brand */}
        <Link to="/" className="brand">
          <span className="brand__logo" aria-hidden="true">RF</span>
          <span className="brand__name">Rodrigo Freire</span>
        </Link>

        {/* Nav desktop */}
        <nav className="nav" aria-label="Navegación principal">
          <Link to="/" className={`nav__link ${location.pathname === "/" ? "is-active" : ""}`}>Inicio</Link>
          <Link to="/proyectos" className={`nav__link ${location.pathname.startsWith("/proyectos") ? "is-active" : ""}`}>Proyectos</Link>
          <Link to="/contacto" className={`nav__link ${location.pathname.startsWith("/contacto") ? "is-active" : ""}`}>Contacto</Link>
        </nav>

        {/* Actions desktop */}
        <div className="actions">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
              <button type="button" onClick={handleLogout} className="btn btn-primary">Salir</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Registrate</Link>
            </>
          )}
        </div>

        {/* Botón hamburguesa (solo mobile) */}
        <button
          type="button"
          className={`hamburger ${open ? "is-open" : ""}`}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      {/* Backdrop */}
      <div className={`backdrop ${open ? "show" : ""}`} onClick={() => setOpen(false)} />

      {/* Panel móvil */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`mobile-menu ${open ? "open" : ""}`}
      >
        <nav className="mobile-menu__nav" aria-label="Navegación móvil">
          <Link to="/" className="mobile-link">Inicio</Link>
          <Link to="/proyectos" className="mobile-link">Proyectos</Link>
          <Link to="/contacto" className="mobile-link">Contacto</Link>
        </nav>
        <div className="mobile-menu__actions">
          {user ? (
            <>
              <Link to="/dashboard" className="m-btn m-btn-outline">Dashboard</Link>
              <button type="button" onClick={handleLogout} className="m-btn m-btn-primary">Salir</button>
            </>
          ) : (
            <>
              <Link to="/login" className="m-btn m-btn-outline">Login</Link>
              <Link to="/register" className="m-btn m-btn-primary">Registrate</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
