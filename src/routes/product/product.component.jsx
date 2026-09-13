import { Fragment, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/button.component';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.reducer';
import styled from 'styled-components';

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  margin: 2rem 0;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductTitle = styled.h2`
  margin: 0;
`;

const ProductPrice = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Product = () => {
  const { category, productId } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const dispatch = useDispatch();

  const product = useMemo(() => {
    const items = categoriesMap?.[category] || [];
    const idNum = Number(productId);
    return items.find((p) => p.id === idNum);
  }, [categoriesMap, category, productId]);

  if (!category || !productId) {
    return <Navigate to="/shop" replace />;
  }

  if (!product) {
    return (
      <Fragment>
        <h2>Product not found</h2>
        <p>The product you are looking for does not exist.</p>
      </Fragment>
    );
  }

  const addToCart = () => dispatch(addItemToCart(product));

  return (
    <ProductContainer>
      <img src={product.imageUrl} alt={product.name} />
      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductPrice>${product.price}</ProductPrice>
        <div>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addToCart}>
            Add To Cart
          </Button>
        </div>
      </ProductInfo>
    </ProductContainer>
  );
};

export default Product;

