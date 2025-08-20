import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Login.css"; // usa el CSS que te pasé antes

export default function Login() {
  const [username, setUsername] = useState(localStorage.getItem("lastUser") || "");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(Boolean(localStorage.getItem("lastUser")));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // si venías de una ruta protegida, redirige allí
  const redirectTo = location.state?.from || "/";

  useEffect(() => {
    setError("");
  }, [username, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Completá usuario y contraseña.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      // tu login debe devolver true/false o lanzar error; cubrimos ambas
      const ok = await Promise.resolve(login(username, password));
      if (ok) {
        if (remember) localStorage.setItem("lastUser", username);
        else localStorage.removeItem("lastUser");
        setUsername("");
        setPassword("");
        navigate(redirectTo, { replace: true });
      } else {
        setError("Usuario o contraseña inválidos.");
      }
    } catch (err) {
      // si tu login lanza error con message, lo mostramos
      setError(err?.message || "No se pudo iniciar sesión. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <main className="login" role="main">
        <section className="login__wrap">
          <header className="login__header">
            <h1 className="login__title">Inicia sesión</h1>
            <p className="login__subtitle">Hola, bienvenido de nuevo</p>
          </header>

          <form className="login__box" onSubmit={handleLogin} noValidate>
            {error && (
              <div className="login__alert" role="alert">
                {error}
              </div>
            )}

            <div className="login__field">
              <label htmlFor="username">Nombre de usuario</label>
              <div className="input input--withIcon">
                <span className="input__icon" aria-hidden="true">👤</span>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="tu-usuario"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="login__field">
              <label htmlFor="password">Contraseña</label>
              <div className="input input--withIcon">
                <span className="input__icon" aria-hidden="true">🔒</span>
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="input__toggle"
                  aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                  onClick={() => setShowPass((s) => !s)}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div className="login__row">
              <label className="check">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Recordarme</span>
              </label>

              <a href="/recuperar" className="login__link">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              className="btn btn--primary"
              type="submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Ingresando…" : "Ingresar"}
            </button>

            <p className="login__alt">
              ¿No tenés cuenta?{" "}
              <a href="/register" className="login__link">Registrate</a>
            </p>
          </form>
        </section>
      </main>
    </Layout>
  );
}