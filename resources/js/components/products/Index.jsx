import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Index = () => {

    const navigate = useNavigate()

    const [products, setProducts] = useState([])

    const newProduct = () => {
        navigate("product/new")
    }

    useEffect(() => {
        getProducts()
    }, [])
    
    const getProducts = async () => {
        await axios.get("/api/get_all_product")
            .then(({data})=>{
                setProducts(data.products)
            })
    }

    const editProduct = (id) => {
        navigate('/product/edit/'+id)
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-center ">
                <div className="container-1">
                    <div className=" text-center bg-primary border justify-content-around d-flex">
                        <h1 className="text-white mt-1">Products</h1>
                        <div className="d-flex align-items-center b-3">
                            <button className="btn btn-light fw-bold text-secondary" onClick={()=>newProduct()}>Add Product</button>
                        </div>
                    </div>
                    <div className=" text-center bg-secondary border">

                        <table className="table border-secondary text-white">
                            <thead>
                                <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Product</th>
                                <th scope="col">Type</th>
                                <th scope="col">Inventory</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.length > 0 && (
                                        products.map((item, key)=> (
                                            /////////////
                                            <tr key={key}>
                                                <th>
                                                    <img src={`upload/${item.photo}`} height="40px" />
                                                </th>
                                                <td>
                                                    {item.name}
                                                </td>
                                                <td>
                                                    {item.type}
                                                </td>
                                                <td>
                                                    {item.quantity}
                                                </td>
                                                <td className="justify-content-around d-flex">
                                                    <button className="btn-sm btn-primary" onClick={()=>editProduct(item.id)}>
                                                        Edit
                                                    </button>
                                                    <button className="btn-sm btn-danger">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                            /////////////
                                        ))
                                    )
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index