import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button.component';
import { clearCart, setIsCartOpen } from '../../store/cart/cart.reducer';
import { selectCurrentUser } from '../../store/user/user.selector';
import { createOrderDocument } from '../../utils/firebase/firebase.utils';
import { buildOrderItemsSnapshot } from '../../utils/payment/order-snapshot.utils';
import {
  PaymentButton,
  PaymentFormContainer,
  PaymentMessage,
  TestCardNotice,
} from './payment-form.styles';

const MockPaymentForm = ({ amount, cartItems }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');

  const completeDemoOrder = async (event) => {
    event.preventDefault();

    if (amount <= 0 || !cartItems.length || !currentUser?.uid) return;

    setIsProcessingPayment(true);
    setPaymentMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      await createOrderDocument(currentUser.uid, {
        items: buildOrderItemsSnapshot(cartItems),
        total: amount,
        paymentProvider: 'demo',
        orderId: `demo_${Date.now()}`,
      });

      dispatch(clearCart());
      dispatch(setIsCartOpen(false));
      setPaymentMessage('Demo order completed successfully.');
      toast.success('Order placed (demo mode — no real charge)');
    } catch (error) {
      setPaymentMessage(error.message || 'Could not save demo order.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <PaymentFormContainer>
      <h2>Demo Checkout</h2>
      <TestCardNotice>
        Razorpay keys are not configured yet. Use demo mode to practice checkout, or add
        test keys from dashboard.razorpay.com to enable real test payments.
      </TestCardNotice>
      <PaymentButton>
        <Button
          type='button'
          onClick={completeDemoOrder}
          disabled={isProcessingPayment || amount <= 0 || !currentUser?.uid}
        >
          {isProcessingPayment ? 'Processing...' : `Complete Demo Order (₹${amount})`}
        </Button>
      </PaymentButton>
      {paymentMessage && <PaymentMessage>{paymentMessage}</PaymentMessage>}
    </PaymentFormContainer>
  );
};

export default MockPaymentForm;
