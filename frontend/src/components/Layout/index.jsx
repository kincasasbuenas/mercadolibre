import React  from 'react'

import Header from '../Header'
import  './Layout.scss'

const Layout = ({children}) => {
  return (
    <div className='layout__container'>
        <Header/>
        { children }
    </div>
  )
}

export default Layout