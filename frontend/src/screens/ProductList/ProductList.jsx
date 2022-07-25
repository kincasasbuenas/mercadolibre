import React, { useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumb'
import PageNotFound from '../PageNotFound'
import ProductListItem from '../../components/ProductListItem/ProductListItem'
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ReactLoading from "react-loading";
import useParams  from '../../hooks/useParams'
import { fetchProducts } from '../../slices/productsSlice';
import './ProductList.scss'

const ProductList = () => {

  const dispatch = useDispatch();
  let { products } = useSelector((state) => state.products, shallowEqual);
  const { loading } = useSelector((state) => state.ui.loading);
  const query = useParams();
  let searchParam = query.get('q'); 

  useEffect(() => {

     if( typeof searchParam !== 'undefined' && searchParam !== ''){
      dispatch(fetchProducts(searchParam));
    } 

  }, []);

  return (
    <>

      {(loading===true) && (
        <div className='container'>
          <ReactLoading type={'spin'} color="#FFE600" />
        </div>
      )
      }



      {(typeof products !== 'undefined' && products.length !== 0) && (

        <section className='container products__list'>
          {
            products.categories.length > 0 && (
              <Breadcrumbs
                categories={products.categories}
              />)
          }


          <section className="list_items">
            {
              products.items.map(item => (
                <ProductListItem key={item.id} product={item} />
              ))
            }

          </section>
        </section>)

      }

      { (typeof products === 'undefined' || products.items?.length === 0 ) && <PageNotFound />}

    </>
  )
}

export default ProductList