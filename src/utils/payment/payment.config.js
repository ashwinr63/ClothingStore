const isPlaceholderKey = (key) =>
  !key || key.includes('your_key') || key.includes('rzp_test_xxx');

export const isMockPaymentEnabled = () =>
  process.env.REACT_APP_USE_MOCK_PAYMENT === 'true' ||
  isPlaceholderKey(process.env.REACT_APP_RAZORPAY_KEY_ID);

export const getApiUrl = () =>
  process.env.REACT_APP_API_URL || 'http://localhost:4242';
