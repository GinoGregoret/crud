import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductList (){
    const [products, setProducts] = useState([])
    useEffect(()=>{
        fetch(`/api/products`)
        .then((res) => res.json())
        .then(setProducts)
    },[])
    const handleDelete = async(id,name) => {
        if(!window.confirm(`Eliminar ${name}?`)) return
        await fetch(`/api/products/${id}`, {method: 'DELETE'})
        setProducts((prev) => prev.filter((p)=> p.id !== id))
    }
    return(
        <div className="container mx-auto p-6 ">
            <h1 className="text-3xl font-bold py-6">Lista de Productos</h1>

            <Link to='/product/new'>
            <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-poiter ">
                cargar nuevo producto
                </button>

            <table className="w-full border-collapse border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border p-2">Nombre</th>
                        <th className="border p-2">Precio</th>
                        <th className="border p-2">Stock</th>
                        <th className="border p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(({id, name, price, stock})=>{
                        <tr key={id}>
                            <td className="border p-2">{name}</td>
                            <td className="border p-2">{price}</td>
                            <td className="border p-2">{stock}</td>
                            <Link to={`/products/edit/${id}`}>
                            <button className="bg-green-500 text-white px-2 py-4 rounded cursor-pointer">Editar</button>
                            </Link>

                            <button onClick={()=> handleDelete(id,name)}
                            className="bg-red-500 text-white px-2 py-4 rounded cursor-pointer"
                            
                            ></button>
                        </tr>
                    })}
                </tbody>
            </table>
            </Link>
        </div>
    )
}
export default ProductList;