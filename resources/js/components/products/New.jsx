import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const New = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState(null)
    const [type, setType] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")

    const changeHandler = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        let limit = 1024 * 1024 * 2
        if(file['size'] > limit) {
            Swal.fire({
                type: 'error',
                title: 'Oopss...',
                text: 'Something went Wrong',
                footer: 'Why do I have this Issue',
            })
        }
        reader.onloadend = (file) => {
            setPhoto(reader.result)
        }
        reader.readAsDataURL(file)
    }

    const createProduct = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', name)
        formData.append('description', description)
        formData.append('photo', photo)
        formData.append('type', type)
        formData.append('quantity', quantity)
        formData.append('price', price)

        await axios.post("/api/add_product/", formData)
            .then(({data}) => {
                toast.fire({
                    icon: "success",
                    title: "Product add Successfully",
                })
                navigate('/')
            })
            .catch(({response})=>{

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
                                    <input value={name} onChange={(event)=>{setName(event.target.value)}} type="text" className="form-control" placeholder="Product Name"/>
                                    <label className="fw-lighter fs-6" >Input Name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <textarea value={description} onChange={(event)=>{setDescription(event.target.value)}} className="form-control" placeholder="Product Description" ></textarea>
                                    <label  className="fw-lighter fs-6">Product Description</label>
                                </div>

                                <div  className="form-floating ">
                                    <input onChange={changeHandler} className="form-control form-control-sm" type="file" />
                                    <label  className=" fw-lighter fs-6">Product Photo</label>
                                </div>
                            </div>
                        </div>

                        <div className="bg-light flex-md-fill">
                            <div className="container-sm p-4">
                                <div className="form-floating mb-3">
                                    <input value={type} onChange={(event)=>{setType(event.target.value)}} type="text" className="form-control" placeholder="Product Type"/>
                                    <label className="fw-lighter fs-6" >Product Type</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input value={quantity} onChange={(event)=>{setQuantity(event.target.value)}} type="number" className="form-control" placeholder="Product Quantity"/>
                                    <label className="fw-lighter fs-6" >Product Quantity</label>
                                </div>

                                <div className="form-floating">
                                    <input value={price} onChange={(event)=>{setPrice(event.target.value)}} type="text" className="form-control" placeholder="Product Price"/>
                                    <label className="fw-lighter fs-6" >Product Price</label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="d-flex justify-content-end p-2">
                        <button className="btn btn-primary" onClick={(event)=>createProduct(event)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default New