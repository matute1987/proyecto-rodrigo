
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">

        {/* Marca / copy */}
        <div className="footer__brand">
          <span className="footer__logo">RF</span>
          <p className="footer__text">
            © {year} Desarrollado por{" "}
            <a
              href="https://www.linkedin.com/in/rodrigo-freire1987"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              Rodrigo Freire
            </a>
          </p>
        </div>

        {/* Navegación rápida */}
        <nav className="footer__nav" aria-label="Enlaces del sitio">
          <a href="/" className="footer__navLink">Inicio</a>
          <a href="/proyectos" className="footer__navLink">Proyectos</a>
          <a href="/contacto" className="footer__navLink">Contacto</a>
        </nav>

        {/* Redes sociales */}
        <div className="footer__social" aria-label="Redes sociales">
          <a
            href="https://www.linkedin.com/in/rodrigo-freire1987"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="footer__iconLink"
          >
            <FaLinkedin className="footer__icon" />
          </a>

          <a
            href="https://github.com/matute1987"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="footer__iconLink"
          >
            <FaGithub className="footer__icon" />
          </a>

          <a
            href="mailto:tuemail@ejemplo.com"
            aria-label="Email"
            className="footer__iconLink"
          >
            <FaEnvelope className="footer__icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}