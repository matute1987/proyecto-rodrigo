import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    const v = name === "email" ? value.toLowerCase() : value;
    setForm((f) => ({ ...f, [name]: v }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // limpia error del campo
  };

  const validate = () => {
    const f = {
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
      confirm_password: form.confirm_password,
    };
    const errs = {};
    if (!f.username) errs.username = "Ingresá un nombre de usuario.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) errs.email = "Correo inválido.";
    if (f.password.length < 6) errs.password = "Mínimo 6 caracteres.";
    if (f.confirm_password !== f.password)
      errs.confirm_password = "Las contraseñas no coinciden.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;

    try {
      setLoading(true);
      // TODO: llamada real a tu API/register(...)
      await new Promise((r) => setTimeout(r, 700));
      navigate("/login");
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: err?.message || "No se pudo registrar." }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container" aria-labelledby="registerTitle">
      <section className="auth-card" role="region" aria-describedby="registerHint">
        <h1 id="registerTitle" className="auth-title">Crear cuenta</h1>
        <p id="registerHint" className="auth-subtitle">
          Hola, ¡bienvenido! Completá tus datos para registrarte.
        </p>

        <form onSubmit={onSubmit} noValidate>
          {errors.general && (
            <span className="error" role="alert" aria-live="polite">
              {errors.general}
            </span>
          )}

          {/* Usuario */}
          <div className={`input-group ${errors.username ? "has-error" : ""}`}>
            <label htmlFor="username">Usuario</label>
            <div className="input-wrapper">
              <FaUser aria-hidden="true" />
              <input
                id="username"
                name="username"
                type="text"
                placeholder="tu_usuario"
                value={form.username}
                onChange={onChange}
                autoComplete="username"
                aria-invalid={Boolean(errors.username)}
                aria-describedby={errors.username ? "err-username" : undefined}
              />
            </div>
            {errors.username && <span id="err-username" className="error">{errors.username}</span>}
          </div>

          {/* Email */}
          <div className={`input-group ${errors.email ? "has-error" : ""}`}>
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-wrapper">
              <FaEnvelope aria-hidden="true" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={onChange}
                inputMode="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "err-email" : undefined}
              />
            </div>
            {errors.email && <span id="err-email" className="error">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className={`input-group ${errors.password ? "has-error" : ""}`}>
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper input-wrapper--with-btn">
              <FaLock aria-hidden="true" />
              <input
                id="password"
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={onChange}
                autoComplete="new-password"
                minLength={6}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "err-password" : undefined}
              />
              <button
                type="button"
                className="eye-btn"
                aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => setShowPwd((v) => !v)}
              >
                {showPwd ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <span id="err-password" className="error">{errors.password}</span>}
          </div>

          {/* Confirmación */}
          <div className={`input-group ${errors.confirm_password ? "has-error" : ""}`}>
            <label htmlFor="confirm_password">Confirmar contraseña</label>
            <div className="input-wrapper input-wrapper--with-btn">
              <FaLock aria-hidden="true" />
              <input
                id="confirm_password"
                name="confirm_password"
                type={showPwd2 ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirm_password}
                onChange={onChange}
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirm_password)}
                aria-describedby={errors.confirm_password ? "err-confirm" : undefined}
              />
              <button
                type="button"
                className="eye-btn"
                aria-label={showPwd2 ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => setShowPwd2((v) => !v)}
              >
                {showPwd2 ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirm_password && <span id="err-confirm" className="error">{errors.confirm_password}</span>}
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Creando..." : "Crear cuenta"}
          </button>
        </form>

        <p className="auth-alt">
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </section>
    </main>
  );
}
