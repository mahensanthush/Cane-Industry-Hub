const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const createPaymentIntent = async (req, res) => {
  const { amount, items } = req.body;

  try {
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: 'lkr',
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPaymentIntent };