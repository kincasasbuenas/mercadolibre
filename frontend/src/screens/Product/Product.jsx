import React, { useEffect } from 'react'
import Breadcrumbs from '../../components/Breadcrumb'
import './Product.scss'
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../../slices/productsSlice';


const Product = () => {

    let { id } = useParams();
    const dispatch = useDispatch();
    let { product } = useSelector((state) => state.products);

    useEffect(() => {

        if (typeof id !== 'undefined' && id.trim() !== '') {
            dispatch(fetchProduct(id));
        }

    }, []);

    //(Object.keys(product).length !== 0 ) && 
    return (
        <section>
            {
                (Object.keys(product).length !== 0 ) && (
                    <div className="container product__container">

                        {/* {
                    product.categories.length > 0 && (
                        <Breadcrumbs
                            categories={product.categories}
                        />)
                } */}




                        <section className="product-body">
                            <div className="product-image">
                                <img
                                    src={product.item?.picture}
                                    alt="Imagen del Producto"
                                />
                            </div>
                            <div className="product-resume">
                                <div>
                                    <small className="product-usage">
                                        {product.item?.condition === 'new'
                                            ? 'Nuevo'
                                            : 'Usado'}
                                        <span>&nbsp;-&nbsp;</span>
                                        {product.item.sold_quantity} vendidos
                                    </small>
                                </div>
                                <p className="product-title">
                                    {product.item?.title}
                                </p>
                                <h2 className="product-price">
                                    <span>{product.item?.price.currency}{Math.round(product.item?.price.amount)}</span>
                                </h2>
                                <button type="button" className="product-add-to-cart">
                                    Comprar
                                </button>
                            </div>
                        </section>

                        <section className="product-description">
                            <h3 className="label">Descripción del producto</h3>
                            <p className="description">
                                {product.item?.description}
                            </p>
                        </section>
                    </div>
                )
            }

        </section>
    )
}

export default Product