import { useEffect, useState } from "react";
import Layout from "../components/Layout"; // export default
import { useAuth } from "../context/UserContext";
import "../styles/Home.css";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(""); // "", "asc", "desc"

  const [showPopup, setShowPopup] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [titleEdit, setTitleEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");

  const { user } = useAuth();

  // Cargar productos
  useEffect(() => {
    const fetchingProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setAllProducts(data);
        setProducts(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchingProducts();
  }, []);

  // Filtrar / ordenar
  useEffect(() => {
    let list = [...allProducts];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);

    setProducts(list);
  }, [search, sort, allProducts]);

  // Borrar
  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setAllProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Abrir modal de edición
  const handleOpenEdit = (product) => {
    setShowPopup(true);
    setProductToEdit(product);
    setTitleEdit(product.title);
    setPriceEdit(String(product.price));
    setDescriptionEdit(product.description);
    setCategoryEdit(product.category);
    setImageEdit(product.image);
  };

  // Actualizar
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!productToEdit) return;

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit,
    };

    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productToEdit.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAllProducts((prev) =>
          prev.map((p) => (p.id === productToEdit.id ? data : p))
        );
      }
      setShowPopup(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__content">
          <h1 className="hero__title">Bienvenido a Nuestra Tienda</h1>
          <p className="hero__subtitle">
            Descubrí una selección exclusiva de productos para vos. Calidad,
            confianza y atención personalizada.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products section">
        <div className="container">
          <div className="products__header">
            <h2 className="section-title">Nuestros productos</h2>
            <p className="section-subtitle">
              Elegí entre nuestras categorías más populares.
            </p>
          </div>

          {/* Filtros */}
          <div className="filters">
            <input
              type="search"
              placeholder="Buscar productos…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar productos"
            />
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Ordenar</option>
              <option value="asc">Precio: menor a mayor</option>
              <option value="desc">Precio: mayor a menor</option>
            </select>
          </div>

          {/* Modal editar */}
          {showPopup && (
            <div className="modal" role="dialog" aria-modal="true">
              <div className="modal__card">
                <div className="modal__header">
                  <h3>Editando producto</h3>
                  <button
                    className="btn btn--ghost"
                    onClick={() => setShowPopup(false)}
                  >
                    ✕
                  </button>
                </div>

                <form className="form" onSubmit={handleUpdate}>
                  <label className="form__field">
                    <span>Título</span>
                    <input
                      type="text"
                      value={titleEdit}
                      onChange={(e) => setTitleEdit(e.target.value)}
                    />
                  </label>
                  <label className="form__field">
                    <span>Precio</span>
                    <input
                      type="number"
                      value={priceEdit}
                      onChange={(e) => setPriceEdit(e.target.value)}
                    />
                  </label>
                  <label className="form__field">
                    <span>Descripción</span>
                    <textarea
                      value={descriptionEdit}
                      onChange={(e) => setDescriptionEdit(e.target.value)}
                    />
                  </label>
                  <label className="form__field">
                    <span>Categoría</span>
                    <input
                      type="text"
                      value={categoryEdit}
                      onChange={(e) => setCategoryEdit(e.target.value)}
                    />
                  </label>
                  <label className="form__field">
                    <span>URL de imagen</span>
                    <input
                      type="text"
                      value={imageEdit}
                      onChange={(e) => setImageEdit(e.target.value)}
                    />
                  </label>

                  <div className="form__actions">
                    <button
                      type="button"
                      className="btn btn--ghost"
                      onClick={() => setShowPopup(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn--primary">
                      Actualizar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Grilla */}
          <div className="products__grid">
            {products.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-card__media">
                  <img
                    src={product.image}
                    alt={`Imagen de ${product.title}`}
                  />
                </div>

                <div className="product-card__body">
                  <h3 className="product-card__title">{product.title}</h3>
                  <p className="product-card__price">${product.price}</p>
                  <p className="product-card__desc">{product.description}</p>
                  <p className="product-card__tag">{product.category}</p>

                  {user && (
                    <div className="product-card__actions">
                      <button
                        className="btn btn--secondary"
                        onClick={() => handleOpenEdit(product)}
                      >
                        Actualizar
                      </button>
                      <button
                        className="btn btn--danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Borrar
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
