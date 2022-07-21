
// import { useContext, Fragment } from 'react'

// import { CategoriesContext } from '../../contexts/categories.context'
  import CategoriesPreview from '../categories-preview/categories-preview.component.jsx'
// import CategoryPreview from '../../components/category-preview/category-preview.component'

import {Routes, Route} from 'react-router-dom'

import './shop.styles.scss'

const Shop = () => {
  

    return (
        <Routes>
            <Route index element={ < CategoriesPreview />}/>
        </Routes>
        
    )
}


export default Shop