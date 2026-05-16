import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component.jsx';
import Category from '../category/category.component.jsx';
import ProductDetail from '../product-detail/product-detail.lazy.js';
import { fetchCategoriesAsync } from '../../store/categories/category.thunks';
import {
  selectCategoriesCount,
  selectCategoriesError,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector.js';
import Spinner from '../../components/spinner/spinner.component.jsx';

const Shop = () => {
  const dispatch = useDispatch();
  const categoriesCount = useSelector(selectCategoriesCount);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const error = useSelector(selectCategoriesError);

  useEffect(() => {
    if (!categoriesCount) {
      dispatch(fetchCategoriesAsync());
    }
  }, [categoriesCount, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div style={{ padding: '1.5rem' }}>
        <p>Unable to load products right now: {error}</p>
        <button type="button" onClick={() => dispatch(fetchCategoriesAsync())}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route
        path=":category/:productId"
        element={
          <Suspense fallback={<Spinner />}>
            <ProductDetail />
          </Suspense>
        }
      />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;