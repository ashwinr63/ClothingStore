import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '../../components/button/button.component';
import { addItemToCart } from '../../store/cart/cart.reducer';
import Spinner from '../../components/spinner/spinner.component';
import { fetchCategoriesAsync } from '../../store/categories/category.thunks';
import {
  selectCategoriesCount,
  selectCategoriesError,
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/category.selector';
import {
  NotFoundMessage,
  ProductDetailContainer,
  ProductImage,
  ProductInfo,
  ProductMeta,
  ProductName,
  ProductPrice,
} from './product-detail.styles';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { category, productId } = useParams();
  const categoriesCount = useSelector(selectCategoriesCount);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const error = useSelector(selectCategoriesError);
  const categoriesMap = useSelector(selectCategoriesMap);

  useEffect(() => {
    if (!categoriesCount) {
      dispatch(fetchCategoriesAsync());
    }
  }, [categoriesCount, dispatch]);

  const product = useMemo(() => {
    const products = categoriesMap[category] || [];
    return products.find((item) => item.id === Number(productId));
  }, [categoriesMap, category, productId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <NotFoundMessage>Unable to load product details: {error}</NotFoundMessage>;
  }

  if (!product) {
    return <NotFoundMessage>Product not found.</NotFoundMessage>;
  }

  const { name, imageUrl, price } = product;

  return (
    <ProductDetailContainer>
      <ProductImage src={imageUrl} alt={name} />
      <ProductInfo>
        <ProductName>{name}</ProductName>
        <ProductPrice>${price}</ProductPrice>
        <ProductMeta>Category: {category}</ProductMeta>
        <Button onClick={() => dispatch(addItemToCart(product))}>Add To Cart</Button>
      </ProductInfo>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
