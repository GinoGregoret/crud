import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";

function ProductForm(){
    const {id} = useParams()
    const navigate = useNavigate()
    const isEdit = id !== 'new'

    const [formData, setFormdata] = useState({
        name: '',
        price: '',
        stock: 0,
        description: ''
    })
    useEffect(()=>{
        fetch(`/api/products/${id}`)
        .then((res)=> res.json())
        .then(formData => setFormdata(formData))
    },[isEdit, id])

    const handleChange = (e) => {
        setFormdata({...formData,[e.target.name] : [e.target.value]})
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!window.confirm('estas seguro?')) return

        const method = isEdit ? 'PUT' : 'POST'
        const url = isEdit ? `/api/products/${id}`: '/api/products'

        await fetch(url,{
            method,
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        })
        navigate('/')
    }
    return(
    <div className="container mx-auto p-6 max-w-md">
      <h1 className="text-3xl font-bold mb-6">
        {isEdit ? "Editar Producto" : "Crear Producto"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Nombre", name: "name", type: "text" },
          { label: "Precio", name: "price", type: "number", step: "0.01" },
          { label: "Stock", name: "stock", type: "number" },
        ].map(({ label, name, type, step }) => (
          <div key={name}>
            <label className="block mb-2">{label}:</label>
            <input
              type={type}
              step={step}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
        ))}

        <div>
          <label className="block mb-2">Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEdit ? "Guardar" : "Crear"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
export default ProductForm;