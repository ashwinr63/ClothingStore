// Netlify serverless function to create a Razorpay order
// Env vars required (set in Netlify or local dev):
// - RAZORPAY_KEY_ID
// - RAZORPAY_KEY_SECRET
//
// Client must never receive the secret; only this function talks to Razorpay with secret.

const Razorpay = require('razorpay');

const badRequest = (message) => ({
  statusCode: 400,
  body: JSON.stringify({ error: message }),
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error:
          'Server is missing Razorpay credentials. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.',
      }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return badRequest('Invalid JSON');
  }

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return badRequest('Invalid amount');
  }

  try {
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Amount expected in paise
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
      notes: body.notes || {},
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      }),
    };
  } catch (error) {
    console.error('Razorpay order error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Order creation failed' }),
    };
  }
};

