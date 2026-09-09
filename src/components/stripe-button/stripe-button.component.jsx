import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartTotal, selectCartItems } from '../../store/cart/cart.selector';
import { clearCart } from '../../store/cart/cart.reducer';
import Button from '../button/button.component';
import styled from 'styled-components';
import toast from 'react-hot-toast';

const StripeButtonContainer = styled.div`
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

// Initialize Stripe with your publishable key
// Set REACT_APP_STRIPE_PUBLISHABLE_KEY in your .env file
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_key_here'
);

const StripeButton = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const cardElementRef = useRef(null);
  const stripeRef = useRef(null);
  const elementsRef = useRef(null);

  useEffect(() => {
    let card;
    let mounted = true;
    (async () => {
      const stripe = await stripePromise;
      if (!stripe || !mounted) return;
      stripeRef.current = stripe;
      const elements = stripe.elements();
      elementsRef.current = elements;
      card = elements.create('card', { hidePostalCode: true });
      if (cardElementRef.current) {
        card.mount(cardElementRef.current);
      }
    })();
    return () => {
      mounted = false;
      try {
        if (card) card.destroy();
      } catch {}
    };
  }, []);

  const handlePayment = async () => {
    if (!cartItems.length) {
      toast.error('Your cart is empty');
      return;
    }

    if (cartTotal === 0) {
      toast.error('Cannot checkout with zero total');
      return;
    }

    const stripe = stripeRef.current;
    const elements = elementsRef.current;
    if (!stripe || !elements) {
      toast.error('Stripe failed to load. Please check your configuration.');
      return;
    }

    setIsProcessing(true);

    try {
      // Call your Netlify serverless function or API endpoint
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(cartTotal * 100), // Stripe amounts are in cents
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error('No client secret returned');
      }

      // Confirm payment with Stripe using the Card Element
      const cardElement = elements.getElement('card');
      if (!cardElement) {
        throw new Error('Payment form is not ready yet.');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        toast.error(error.message);
        setIsProcessing(false);
      } else {
        if (paymentIntent && paymentIntent.status === 'succeeded') {
          toast.success('Payment successful!');
          dispatch(clearCart());
        } else {
          toast.success('Payment submitted!');
        }
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <StripeButtonContainer>
      <div style={{ width: '100%', marginRight: 16, minWidth: 300 }}>
        <div ref={cardElementRef} style={{ padding: '12px 14px', border: '1px solid #ccc', borderRadius: 4, marginBottom: 12 }} />
      </div>
      <Button
        buttonType="inverted"
        onClick={handlePayment}
        disabled={isProcessing || cartTotal === 0}
      >
        {isProcessing ? BUTTON_TEXT.processing : `Pay $${cartTotal}`}
      </Button>
    </StripeButtonContainer>
  );
};

export default StripeButton;

