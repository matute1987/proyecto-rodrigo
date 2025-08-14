import { useState } from "react";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !price || !description) {
      setError("Completá todos los campos");
      return;
    }
    if (name.length < 4) {
      setError("El nombre debe tener al menos 4 caracteres");
      return;
    }

    const newProduct = { title: name, price: Number(price), description };

    try {
      const resp = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await resp.json();
      console.log("Creado:", data);
      setName("");
      setPrice("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setError("No se pudo crear el producto");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Panel de Administración</h1>

      <section>
        <h2>Cargar nuevo producto</h2>
        <form onSubmit={handleAdd}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Precio</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label>Descripción</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Crear producto</button>
        </form>
      </section>
    </div>
  );
};

export default Dashboard;