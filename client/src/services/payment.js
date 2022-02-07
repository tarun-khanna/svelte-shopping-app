export const initiatePayment = (price) => {
  const { env } = process;
  var options = {
    key: env.RAZORPAY_KEY_ID,
    amount: `${price * 100}`,
    currency: 'INR',
    name: 'Digital Dukaan',
    description: 'Test Transaction',
    image: '/assets/images/logo.svg',
    order_id: 'order_It5IqyaUOSwpCg',
    theme: {
      color: '#e8af01',
    },
    handler: function (response) {
      console.log('🚀 ~ file: ProductDetail.svelte ~ line 19 ~ handleBuy ~ response', response);
    },
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', function (response) {
    console.log('response.error=', response.error);
  });

  rzp1.open();
};
