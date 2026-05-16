require('dotenv').config();
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4242;

const isPlaceholderKey = (key) =>
  !key || key.includes('your_key') || key.includes('rzp_test_xxx');

const useMockPayment =
  process.env.USE_MOCK_PAYMENT === 'true' ||
  isPlaceholderKey(process.env.RAZORPAY_KEY_ID) ||
  isPlaceholderKey(process.env.RAZORPAY_KEY_SECRET);

let razorpay = null;

if (!useMockPayment) {
  const Razorpay = require('razorpay');
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/health', (_, res) => {
  res.status(200).json({
    status: 'ok',
    provider: useMockPayment ? 'mock' : 'razorpay',
  });
});

app.post('/verify-razorpay-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      verified: false,
      error: 'Missing payment verification fields.',
    });
  }

  if (useMockPayment && String(razorpay_order_id).startsWith('order_mock_')) {
    return res.status(200).json({ verified: true, mock: true });
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  const verified = expectedSignature === razorpay_signature;

  if (!verified) {
    return res.status(400).json({
      verified: false,
      error: 'Invalid payment signature.',
    });
  }

  return res.status(200).json({ verified: true });
});

app.post('/create-razorpay-order', async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount < 100) {
      return res.status(400).json({ error: 'Invalid payment amount (min 100 paise).' });
    }

    if (useMockPayment) {
      return res.status(200).json({
        orderId: `order_mock_${Date.now()}`,
        amount,
        currency: 'INR',
        mock: true,
      });
    }

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Razorpay order creation failed.',
    });
  }
});

app.listen(port, () => {
  console.log(
    `Payment server on http://localhost:${port} (${useMockPayment ? 'mock' : 'razorpay'})`
  );
});
