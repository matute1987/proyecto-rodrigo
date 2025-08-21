import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/UserContext";
import AuthLayout from "../components/AuthLayout";
import "../styles/Auth.css";

export default function Login() {
  const [username, setUsername] = useState(localStorage.getItem("lastUser") || "");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(Boolean(localStorage.getItem("lastUser")));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!username.trim() || !password.trim()) {
      setError("Completá usuario y contraseña."); return;
    }
    try {
      setLoading(true);
      const ok = await login(username, password);
      if (!ok) return setError("Usuario o contraseña inválidos.");
      remember ? localStorage.setItem("lastUser", username) : localStorage.removeItem("lastUser");
      navigate(state?.from || "/", { replace: true });
    } catch (err) {
      setError(err?.message || "No se pudo iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Inicia sesión"
      subtitle="Hola, bienvenido de nuevo"
      theme="dark"              // o "light" si preferís
    >
      {error && <div className="error" role="alert">{error}</div>}

      <form onSubmit={onSubmit} noValidate>
        <div className="input-group">
          <label htmlFor="user">Nombre de usuario</label>
          <div className="input-wrapper">
            <FaUser aria-hidden="true" />
            <input id="user" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="pass">Contraseña</label>
          <div className="input-wrapper input-wrapper--with-btn">
            <FaLock aria-hidden="true" />
            <input
              id="pass"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button type="button" className="eye-btn" onClick={() => setShow(s => !s)}>
              {show ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="auth-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "6px 0 12px" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            Recordarme
          </label>
          <Link className="auth-link" to="/recuperar">¿Olvidaste tu contraseña?</Link>
        </div>

        <button className="auth-submit" disabled={loading} aria-busy={loading}>
          {loading ? "Ingresando…" : "Ingresar"}
        </button>

        <p className="auth-alt">¿No tenés cuenta? <Link to="/register">Registrate</Link></p>
      </form>
    </AuthLayout>
  );
}