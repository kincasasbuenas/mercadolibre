import React from 'react'
import { Link } from 'react-router-dom';
import shippingImage from '../../assets/ic_shipping.png';
import './ProductListItem.scss'

const ProductListItem = ({product}) => {
  return (
    <Link to={`/items/${product.id}`}>
    <section className="product-item">
      <section className="product-item__thumbnail">
        <img className="img" src={product.picture} alt="" />
      </section>
      <section className="product-item__info">
        <h1 className="product-item__price">
            {product.price.currency}{Math.round(product.price.amount)}
            {product.free_shipping ? <img src={ shippingImage } alt="shipping"/> : ''}
        </h1>
        <h2 className="product-item__title">{product.title}</h2>
      </section>
    </section>
  </Link>
  )
}

export default ProductListItem