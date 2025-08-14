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

  // visibilidad de contraseñas
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.username.trim()) errs.username = "Ingresá un nombre de usuario.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Correo inválido.";
    if (form.password.length < 6) errs.password = "Mínimo 6 caracteres.";
    if (form.confirm_password !== form.password)
      errs.confirm_password = "Las contraseñas no coinciden.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      // 👉 aquí iría tu llamada a API real
      await new Promise((r) => setTimeout(r, 700));
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container" aria-labelledby="registerTitle">
      <section className="auth-card">
        <h1 id="registerTitle" className="auth-title">Crear cuenta</h1>
        <p className="auth-subtitle">
          Hola, ¡bienvenido! Completá tus datos para registrarte.
        </p>

        <form onSubmit={onSubmit} noValidate>
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
              />
            </div>
            {errors.username && <span className="error">{errors.username}</span>}
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
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="error">{errors.email}</span>}
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
            {errors.password && <span className="error">{errors.password}</span>}
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
            {errors.confirm_password && (
              <span className="error">{errors.confirm_password}</span>
            )}
          </div>

          <button className="btn btn-primary auth-submit" disabled={loading}>
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
