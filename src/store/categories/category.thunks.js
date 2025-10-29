import {
    fetchCategoriesStart,
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
  } from './category.reducer';
  import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
  
  export const fetchCategoriesAsync = () => async (dispatch) => {
    try {
      dispatch(fetchCategoriesStart());
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (err) {
      dispatch(fetchCategoriesFailed(err.message || 'Error fetching categories'));
    }
  };