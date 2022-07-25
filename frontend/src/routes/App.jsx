import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout'
import Home from '../screens/Home';
import Product from '../screens/Product/Product';
import ProductList from '../screens/ProductList/ProductList';
import PageNotFound from '../screens/PageNotFound';

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/items/:id"  element={<Product/>} />
                    <Route path="/items"  element={<ProductList/>} />
                    <Route path="*" element={ <PageNotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
