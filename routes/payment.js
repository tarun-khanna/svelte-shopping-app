require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const nanoid = require('nanoid').nanoid;

const router = express.Router();

router.post('/orders', async (req, res) => {
  const { price } = req.body;
  if (!price) {
    res.status(500).send({ message: 'Price is mandatory for order creation.' });
    return;
  }
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: +price * 100,
      currency: 'INR',
      receipt: nanoid(),
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send('Some error occured');

    res.json(order);
  } catch (error) {
    console.log('🚀 ~ file: payment.js ~ line 32 ~ router.post ~ error', error);
    res.status(500).send(error);
  }
});

module.exports = router;
