import React from 'react'
import './PageNotFound.scss'

const index = () => {
    return (
        <div className='container container__not-found'>
            <section>
                <h2>No hay productos que coincidan con tu búsqueda</h2>
                <ul >
                    <li ><strong>Revisa la ortografía</strong> de la palabra.</li>
                    <li >Utiliza <strong>palabras más genéricas</strong> o menos palabras.</li>
                </ul>
            </section>
        </div>
    )
}

export default index