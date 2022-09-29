import React from 'react'
import { Routes, Route } from 'react-router-dom'

import IndexProduct from '../components/products/Index'
import NotFound from '../components/NotFound'
import NewProduct from '../components/products/New'
import EditProduct from '../components/products/Edit'

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={ <IndexProduct /> } />
                <Route path="/product/new" element={ <NewProduct /> } />
                <Route path="/product/edit/:id" element={ <EditProduct /> } />
                <Route path="/*" element={ <NotFound /> } />
            </Routes>
        </div>
    )
}

export default Router