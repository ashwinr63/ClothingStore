import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import toast from 'react-hot-toast';

import Button from '../button/button.component';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import { clearItemFromCart } from '../../store/cart/cart.reducer';
import { loadRazorpayScript } from '../../utils/payment/load-razorpay';

const PaymentContainer = styled.div`
  margin-top: 30px;
  margin-left: auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const BUTTON_TEXT = {
  default: 'Pay Now',
  processing: 'Processing...',
};

const RazorpayPaymentForm = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSuccess = () => {
    // Clear all items from the cart
    cartItems.forEach((item) => dispatch(clearItemFromCart(item)));
    toast.success('Payment successful!');
  };

  const handlePayment = async () => {
    if (!cartItems.length) {
      toast.error('Your cart is empty');
      return;
    }
    if (cartTotal <= 0) {
      toast.error('Cannot checkout with zero total');
      return;
    }

    setIsProcessing(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error('Failed to load Razorpay. Check your network.');
      setIsProcessing(false);
      return;
    }

    const keyId = process.env.REACT_APP_RAZORPAY_KEY_ID;
    if (!keyId) {
      toast.error('Missing Razorpay key. Set REACT_APP_RAZORPAY_KEY_ID.');
      setIsProcessing(false);
      return;
    }

    try {
      const orderRes = await fetch('/.netlify/functions/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Razorpay expects paise. Treat cartTotal as rupees, multiply by 100.
          amount: Math.round(cartTotal * 100),
          notes: { source: 'ClothingStore Checkout' },
        }),
      });

      if (!orderRes.ok) {
        const { error } = await orderRes.json().catch(() => ({ error: 'Order failed' }));
        throw new Error(error || 'Order creation failed');
      }
      const { orderId, amount, currency } = await orderRes.json();
      if (!orderId) throw new Error('No order id returned');

      const options = {
        key: keyId,
        amount,
        currency: currency || 'INR',
        name: 'ClothingStore',
        description: 'Order Payment',
        order_id: orderId,
        handler: function () {
          handleSuccess();
          setIsProcessing(false);
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.error('Payment cancelled');
          },
        },
        theme: { color: '#6366f1' },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        toast.error(response.error?.description || 'Payment failed');
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Payment error:', err);
      toast.error(err.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <PaymentContainer>
      <Button buttonType="inverted" onClick={handlePayment} disabled={isProcessing || cartTotal === 0}>
        {isProcessing ? BUTTON_TEXT.processing : `Pay ₹${cartTotal}`}
      </Button>
    </PaymentContainer>
  );
};

export default RazorpayPaymentForm;

