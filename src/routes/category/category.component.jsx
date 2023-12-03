import {CategoryContainer, CategoryTitle} from './category.styles.jsx'
import { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductCard from '../../components/product-card/product-card.component'
import { selectCategoriesMap } from '../../store/categories/category.selector.js'
const Category = () => {

    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap)
    console.log('render/re-rendering category')
    const [products, setProducts] = useState(categoriesMap[category])
   
    useEffect(() => {
        console.log('effect fired calling setProducts')
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>

                {products &&
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </CategoryContainer>
        </Fragment>
    )

}

export default Category