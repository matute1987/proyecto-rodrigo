import Footer from "./Footer";
import Header from "./Header";
import "../styles/layout.css";

export default function Layout({ children, center = true }) {
  return (
    <div className="app-shell">
      <Header />
      <main className={`layout-main ${center ? "centered" : ""}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}