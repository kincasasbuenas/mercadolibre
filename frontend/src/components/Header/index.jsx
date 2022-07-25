import React from 'react'
import logoML from '../../assets/Logo_ML.png'
import Search from '../Search/Search'

import './Header.scss'

const index = () => {
  return (
    <header className="header">
      <div className="header__container">
        <img
          src={logoML}
          className="header__logo"
          alt="Mercado Libre"
        />

        <Search />

      </div>
    </header>
  )
}

export default index