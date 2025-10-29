import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { selectCartTotal, selectCartItems } from '../../store/cart/cart.selector';
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

  const handlePayment = async () => {
    if (!cartItems.length) {
      toast.error('Your cart is empty');
      return;
    }

    if (cartTotal === 0) {
      toast.error('Cannot checkout with zero total');
      return;
    }

    setIsProcessing(true);

    try {
      const stripe = await stripePromise;

      if (!stripe) {
        toast.error('Stripe failed to load. Please check your configuration.');
        setIsProcessing(false);
        return;
      }

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

      // Confirm payment with Stripe
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            // This would normally come from Stripe Elements
            // For now, we'll use redirect for simplicity
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setIsProcessing(false);
      } else {
        toast.success('Payment successful!');
        // Clear cart and redirect would happen here
        // For now, just reset processing state
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

