import { useDispatch } from 'react-redux';

import {
  AddButtonWrap,
  Footer,
  ImageWrapper,
  Name,
  Price,
  ProductCardContainer,
  ProductImageLink,
} from './product-card.styles.jsx';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.reducer';

const ProductCard = ({ product, categoryName }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(product));

  return (
    <ProductCardContainer>
      <ImageWrapper>
        <ProductImageLink to={`/shop/${categoryName}/${product.id}`}>
          <img src={imageUrl} alt={name} loading="lazy" />
        </ProductImageLink>
      </ImageWrapper>
      <Footer>
        <Name>{name}</Name>
        <Price>₹{price}</Price>
      </Footer>
      <AddButtonWrap>
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
          Add To Cart
        </Button>
      </AddButtonWrap>
    </ProductCardContainer>
  );
};

export default ProductCard;