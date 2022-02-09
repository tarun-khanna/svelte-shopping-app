require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const nanoid = require("nanoid").nanoid;
const crypto = require("crypto");

const router = express.Router();

router.post("/orders", async (req, res) => {
  const { price } = req.body;
  if (!price) {
    return res
      .status(400)
      .send({ message: "Price is mandatory for order creation." });
  }
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: +price * 100,
      currency: "INR",
      receipt: nanoid(),
      line_items_total: +price * 100,
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/verify", async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature)
      return res.status(400).send({ msg: "Transaction not legit!" });

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/shippingInfo", async (req, res) => {
  const addresses = req.body.addresses;
  if (!addresses || !addresses.length) {
    return res.status(400).send({ msg: "Adresses are mandatory!" });
  }
  res.json({
    addresses: addresses.map((addr) => ({
      serviceable: Math.random() < 0.5,
      cod: Math.random() < 0.5,
      cod_fee: 5000,
      shipping_fee: 6000,
      ...addr,
    })),
  });
});

router.post("/getPromotions", async (req, res) => {
  res.json({
    promotions: [
      {
        code: "EUREKA",
        summary: "short summary",
        description: "Eu excepteur enim laboris dolore.",
        tnc: ["Dagdasga", "Sahhqw"],
      },
      {
        code: "SVELTE-CASHBACK",
        summary: "short summary 2",
        description: "Ea cupidatat occaecat irure nostrud.",
        tnc: ["Dagdasga", "Sahhqw"],
      },
    ],
  });
});

router.post("/applyPromotion", async (req, res) => {
  res.json({
    promotion: {
      reference_id: nanoid(),
      code: req.body.code,
      value: 20000,
      description: "Velit ut laboris anim non sunt quis dolore culpa.",
    },
  });
});

module.exports = router;
