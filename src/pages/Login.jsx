import { useState } from "react";
import Layout from "../components/Layout";        // 👈 default export
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const ok = await login(username, password);   // tu función de contexto
    if (ok) {
      setUsername("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <Layout>
      <h1>Inicia sesión</h1>
      <section>
        <h2>Hola, bienvenido de nuevo</h2>

        <form onSubmit={handleLogin}>
          <div>
            <label>Nombre de usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Ingresar</button>
        </form>
      </section>
    </Layout>
  );
}