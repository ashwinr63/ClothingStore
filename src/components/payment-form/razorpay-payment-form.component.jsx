import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button.component';
import { clearCart, setIsCartOpen } from '../../store/cart/cart.reducer';
import { selectCurrentUser } from '../../store/user/user.selector';
import { createOrderDocument } from '../../utils/firebase/firebase.utils';
import { getApiUrl } from '../../utils/payment/payment.config';
import { loadRazorpayScript } from '../../utils/payment/load-razorpay';
import { buildOrderItemsSnapshot } from '../../utils/payment/order-snapshot.utils';
import {
  PaymentButton,
  PaymentFormContainer,
  PaymentMessage,
  TestCardNotice,
} from './payment-form.styles';

const RazorpayPaymentForm = ({ amount, cartItems }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');

  const amountInPaise = Math.round(amount * 100);

  const openRazorpayCheckout = async () => {
    if (amountInPaise < 100 || !cartItems.length || !currentUser?.uid) return;

    setIsProcessingPayment(true);
    setPaymentMessage('');

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setPaymentMessage('Unable to load Razorpay checkout.');
      setIsProcessingPayment(false);
      return;
    }

    try {
      const response = await fetch(`${getApiUrl()}/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInPaise }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setPaymentMessage(data.error || 'Could not create payment order.');
        setIsProcessingPayment(false);
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Crwn Clothing',
        description: 'Clothing store purchase',
        order_id: data.orderId,
        prefill: {
          name: currentUser?.displayName || '',
          email: currentUser?.email || '',
        },
        theme: { color: '#000000' },
        handler: async (paymentResponse) => {
          try {
            const verifyResponse = await fetch(`${getApiUrl()}/verify-razorpay-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.verified) {
              setPaymentMessage(
                verifyData.error || 'Payment verification failed. Order was not saved.'
              );
              setIsProcessingPayment(false);
              return;
            }

            await createOrderDocument(currentUser.uid, {
              items: buildOrderItemsSnapshot(cartItems),
              total: amount,
              paymentProvider: 'razorpay',
              paymentId: paymentResponse.razorpay_payment_id,
              orderId: paymentResponse.razorpay_order_id,
            });

            dispatch(clearCart());
            dispatch(setIsCartOpen(false));
            setPaymentMessage('Payment successful!');
            toast.success('Payment completed');
          } catch (error) {
            setPaymentMessage(error.message || 'Could not complete order.');
          } finally {
            setIsProcessingPayment(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (event) => {
        setPaymentMessage(event.error?.description || 'Payment failed.');
        setIsProcessingPayment(false);
      });
      razorpay.open();
    } catch (error) {
      setPaymentMessage(error.message || 'Unexpected payment error.');
      setIsProcessingPayment(false);
    }
  };

  return (
    <PaymentFormContainer>
      <h2>Pay with Razorpay</h2>
      <TestCardNotice>
        Test mode: use Razorpay test keys from dashboard. Amount is charged in INR
        (₹{amount} = {amountInPaise} paise).
      </TestCardNotice>
      <PaymentButton>
        <Button
          type='button'
          onClick={openRazorpayCheckout}
          disabled={isProcessingPayment || amountInPaise < 100 || !currentUser?.uid}
        >
          {isProcessingPayment ? 'Opening checkout...' : `Pay ₹${amount}`}
        </Button>
      </PaymentButton>
      {paymentMessage && <PaymentMessage>{paymentMessage}</PaymentMessage>}
    </PaymentFormContainer>
  );
};

export default RazorpayPaymentForm;
