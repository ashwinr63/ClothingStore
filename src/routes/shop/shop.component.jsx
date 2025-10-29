import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component.jsx';
import Category from '../category/category.component.jsx';
import { Routes, Route } from 'react-router-dom';
import { fetchCategoriesAsync } from '../../store/categories/category.thunks';
import { selectCategoriesIsLoading } from '../../store/categories/category.selector.js';
import Spinner from '../../components/spinner/spinner.component.jsx';
const Shop = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCategoriesIsLoading);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={isLoading ? <Spinner /> : <CategoriesPreview />} />
      <Route path=':category' element={isLoading ? <Spinner /> : <Category />} />
    </Routes>
  );
};

export default Shop;