import React from 'react'
import './Breadcrumb.scss'

export const index = ({categories}) => {
  return (
    <section className="breadcrumb">
        { categories.map( (category, index ) => <span key={index} className="category-item">{category}</span>) }
      </section>
  )
}

export default index
