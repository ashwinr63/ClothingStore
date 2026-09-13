import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Footer, Name, Price, ProductCardContainer } from './product-card.styles.jsx';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.reducer';

// Accept optional `category` to build a PDP link
const ProductCard = ({ product, category }) => {
  const { id, name, price, imageUrl } = product;
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(product));
  const productLink = category ? `/shop/${category}/${id}` : undefined;

  return (
    <ProductCardContainer>
      {productLink ? (
        <Link to={productLink} aria-label={`View ${name}`}>
          <img src={imageUrl} alt={`${name}`} />
        </Link>
      ) : (
        <img src={imageUrl} alt={`${name}`} />
      )}
      <Footer>
        {productLink ? (
          <Link to={productLink}>
            <Name>{name}</Name>
          </Link>
        ) : (
          <Name>{name}</Name>
        )}
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
        Add To Cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;