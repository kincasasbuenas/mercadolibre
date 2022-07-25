import React, {useState, useEffect} from 'react';
import searchIcon from '../../assets/ic_Search.png'
import './Search.scss'

import { fetchProducts } from '../../slices/productsSlice';
import { useDispatch } from 'react-redux';
import { useParams  } from 'react-router-dom';


const Search = () => {

  let { id } = useParams();

  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const searchProducts = () => {

    if( id !== ''){
      window.location = `/items?q=${inputValue}`;
    }

    if(inputValue.trim().length > 2){
      dispatch(fetchProducts(inputValue));
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    searchProducts();
  }

  const handleKeyDow = (e) => {
    if (e.keyCode === 13) {
      searchProducts();
    }
  }

  const handleInputChange = ( e ) => {
    e.preventDefault();
    setInputValue( e.target.value );
  }

  useEffect(() => {

    setInputValue( inputValue );

  }, []);


  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        placeholder="Nunca dejes de buscar"
        value= { inputValue }
        onChange={ handleInputChange }
        onKeyDown={ handleKeyDow }
      />
      <button type="submit" className="search__button" onClick={ handleClick }>
        <img src={searchIcon} alt="Buscar" />
      </button>
    </div>
  )
}

export default Search