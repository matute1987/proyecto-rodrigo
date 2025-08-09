import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext";
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [titleEdit, setTitleEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");

  const { user } = useAuth();

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" });
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchingProducts();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleOpenEdit = (product) => {
    setShowPopup(true);
    setProductToEdit(product);
    setTitleEdit(product.title);
    setPriceEdit(product.price);
    setDescriptionEdit(product.description);
    setCategoryEdit(product.category);
    setImageEdit(product.image);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit,
    };

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const data = await response.json();
        setProducts((prev) =>
          prev.map((p) => (p.id === productToEdit.id ? data : p))
        );
      }
      setShowPopup(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Bienvenido a Nuestra Tienda</h1>
          <p className="hero__subtitle">
            Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.
          </p>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <ul className="features__grid">
          <li className="feature-card">
            <h3>Envíos a todo el país</h3>
            <p>Recibí tu compra en la puerta de tu casa estés donde estés.</p>
          </li>
          <li className="feature-card">
            <h3>Pagos seguros</h3>
            <p>Trabajamos con plataformas que garantizan tu seguridad.</p>
          </li>
          <li className="feature-card">
            <h3>Atención personalizada</h3>
            <p>Estamos disponibles para ayudarte en todo momento.</p>
          </li>
        </ul>
      </section>

      <section className="products">
        <div className="products__header">
          <h2 className="section-title">Nuestros productos</h2>
          <p className="section-subtitle">Elegí entre nuestras categorías más populares.</p>
        </div>

        {showPopup && (
          <div className="modal" role="dialog" aria-modal="true">
            <div className="modal__card">
              <div className="modal__header">
                <h3>Editando producto</h3>
                <button className="btn btn--ghost" onClick={() => setShowPopup(null)}>
                  ✕
                </button>
              </div>

              <form className="form" onSubmit={handleUpdate}>
                <label className="form__field">
                  <span>Título</span>
                  <input
                    type="text"
                    placeholder="Ingrese el título"
                    value={titleEdit}
                    onChange={(e) => setTitleEdit(e.target.value)}
                  />
                </label>

                <label className="form__field">
                  <span>Precio</span>
                  <input
                    type="number"
                    placeholder="Ingrese el precio"
                    value={priceEdit}
                    onChange={(e) => setPriceEdit(e.target.value)}
                  />
                </label>

                <label className="form__field">
                  <span>Descripción</span>
                  <textarea
                    placeholder="Ingrese la descripción"
                    value={descriptionEdit}
                    onChange={(e) => setDescriptionEdit(e.target.value)}
                  />
                </label>

                <label className="form__field">
                  <span>Categoría</span>
                  <input
                    type="text"
                    placeholder="Ingrese la categoría"
                    value={categoryEdit}
                    onChange={(e) => setCategoryEdit(e.target.value)}
                  />
                </label>

                <label className="form__field">
                  <span>URL de imagen</span>
                  <input
                    type="text"
                    placeholder="Ingrese la URL de la imagen"
                    value={imageEdit}
                    onChange={(e) => setImageEdit(e.target.value)}
                  />
                </label>

                <div className="form__actions">
                  <button type="button" className="btn btn--ghost" onClick={() => setShowPopup(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn--primary">Actualizar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="products__grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-card__media">
                <img src={product.image} alt={`Imagen de ${product.title}`} />
              </div>
              <div className="product-card__body">
                <h3 className="product-card__title">{product.title}</h3>
                <p className="product-card__price">${product.price}</p>
                <p className="product-card__desc">{product.description}</p>
                <p className="product-card__tag">{product.category}</p>

                {user && (
                  <div className="product-card__actions">
                    <button className="btn btn--secondary" onClick={() => handleOpenEdit(product)}>
                      Actualizar
                    </button>
                    <button className="btn btn--danger" onClick={() => handleDelete(product.id)}>
                      Borrar
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export { Home };