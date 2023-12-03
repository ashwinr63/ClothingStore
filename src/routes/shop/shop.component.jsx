import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import CategoriesPreview from '../categories-preview/categories-preview.component.jsx'
import Category from '../category/category.component.jsx'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils.js'
import { setCategoriesMap } from '../../store/categories/category.action.js'
import { Routes, Route } from 'react-router-dom'

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments('categories');
			dispatch(setCategoriesMap(categoryMap));
		};

		getCategoriesMap();
	}, []);
    return (
        <Routes>
            <Route index element={< CategoriesPreview />} />
            <Route path=':category' element={<Category />}/>
        </Routes>

    )
}

export default Shop