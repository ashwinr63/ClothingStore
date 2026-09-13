import {CategoryContainer, CategoryTitle} from './category.styles.jsx'
import { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductCard from '../../components/product-card/product-card.component'
import { selectCategoriesMap } from '../../store/categories/category.selector.js'
const Category = () => {

    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState(categoriesMap[category])
    const [filterText, setFilterText] = useState('')
   
    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    const filteredProducts = products
        ? products.filter((p) =>
            p.name.toLowerCase().includes(filterText.toLowerCase().trim())
          )
        : [];

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <div style={{ margin: '0 0 16px 0' }}>
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{ padding: '8px', width: '100%', maxWidth: '320px' }}
                />
            </div>
            <CategoryContainer>

                {filteredProducts &&
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} category={category} />
                    ))
                }
            </CategoryContainer>
        </Fragment>
    )

}

export default Category