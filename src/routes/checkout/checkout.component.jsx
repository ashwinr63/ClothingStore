import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import {
  CheckoutContainer,
  CheckoutHeader,
  CheckoutTitle,
  EmptyCartMessage,
  HeaderBlock,
  Total,
} from './checkout.styles.jsx';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import MockPaymentForm from '../../components/payment-form/mock-payment-form.component';
import RazorpayPaymentForm from '../../components/payment-form/razorpay-payment-form.component';
import { isMockPaymentEnabled } from '../../utils/payment/payment.config';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const mockPaymentEnabled = isMockPaymentEnabled();

  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.length ? (
        <>
          {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          ))}
          <Total>Total: ₹{cartTotal}</Total>
          {mockPaymentEnabled ? (
            <MockPaymentForm amount={cartTotal} cartItems={cartItems} />
          ) : (
            <RazorpayPaymentForm amount={cartTotal} cartItems={cartItems} />
          )}
        </>
      ) : (
        <EmptyCartMessage>Your cart is empty. Add products from the shop.</EmptyCartMessage>
      )}
    </CheckoutContainer>
  );
};

export default Checkout;
