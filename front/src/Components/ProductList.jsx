import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then(setProducts)
      .catch((err) => console.error("Problema:", err));
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Eliminar ${name}?`)) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold py-6">Lista de Productos</h1>

      <Link to="/product/new">
        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Cargar nuevo producto
        </button>
      </Link>

      <table className="w-full border-collapse border mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, name, price, stock }) => (
            <tr key={id}>
              <td className="border p-2">{name}</td>
              <td className="border p-2">{price}</td>
              <td className="border p-2">{stock}</td>
              <td className="border p-2 flex gap-2">
                <Link to={`/products/edit/${id}`}>
                  <button className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer">
                    Editar
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(id, name)}
                  className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
