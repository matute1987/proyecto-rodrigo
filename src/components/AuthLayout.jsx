// Reutilizable para Login y Register
export default function AuthLayout({
  title,
  subtitle,
  children,
  theme = "light", // "light" | "dark"
  ariaLabel = "auth-section",
}) {
  const themeClass = theme === "dark" ? "auth--dark" : "auth--light";

  return (
    <main
      className={`auth-container ${themeClass}`}
      role="main"
      aria-label={ariaLabel}
    >
      <section className="auth-card">
        {title && <h1 className="auth-title">{title}</h1>}
        {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        {children}
      </section>
    </main>
  );
}
