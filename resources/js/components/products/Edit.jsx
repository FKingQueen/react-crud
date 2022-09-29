import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'



const Edit = () => {

    const navigate = new useNavigate()

    const {id}  = useParams();

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState(null)
    const [type, setType] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        await axios.get(`/api/get_edit_product/${id}`)
            .then(({data})=> {
                // console.log('data', data)
                const { name, description, photo, type, quantity, price } = data.product
                setName(name)
                setDescription(description)
                setPhoto(photo)
                setType(type)
                setQuantity(quantity)
                setPrice(price)
            })
            .catch (({response:{data}})=>{
                
            })
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-center ">
                <div className="container-1">
                    <div className=" text-center bg-primary border">
                        <h1 className="text-white mt-1">New Product</h1>
                    </div>
                    <div className="text-center bg-secondary border d-flex ">
                        <div className="bg-secondary flex-fill">
                            <div className="container-sm p-4">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="Product Name"/>
                                    <label className="fw-lighter fs-6" >Input Name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <textarea className="form-control" placeholder="Product Description" ></textarea>
                                    <label  className="fw-lighter fs-6">Product Description</label>
                                </div>

                                <div  className="form-floating ">
                                    <input className="form-control form-control-sm" type="file" />
                                    <label  className=" fw-lighter fs-6">Product Photo</label>
                                </div>
                            </div>
                        </div>

                        <div className="bg-light flex-md-fill">
                            <div className="container-sm p-4">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder="Product Type"/>
                                    <label className="fw-lighter fs-6" >Product Type</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" placeholder="Product Quantity"/>
                                    <label className="fw-lighter fs-6" >Product Quantity</label>
                                </div>

                                <div className="form-floating">
                                    <input type="text" className="form-control" placeholder="Product Price"/>
                                    <label className="fw-lighter fs-6" >Product Price</label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="d-flex justify-content-end p-2">
                        <button className="btn btn-primary" >Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit