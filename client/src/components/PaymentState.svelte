<script context="module">
  import { writable } from 'svelte/store';
  import Modal from './Modal.svelte';
  import { PAYMENT_STATE } from '../utils/constants';
  import successIcon from '../assets/images/success.svg';
  export const paymentState = writable({});

  export const initiatePayment = async (price, isOneCC, selectedTheme) => {
    const { env } = process;
    const { RAZORPAY_KEY_ID, API_ENDPOINT, BASE_PATH } = env;

    const orderPayload = {
      amount: price,
    };
    if (false) {
      orderPayload.line_items_total = price;
    }
    // const orderData = await fetch(`${API_ENDPOINT}/payment/orders`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(orderPayload),
    // }).then((res) => res.json());

    // const { amount, id } = orderData;

    const options = {
      key: 'rzp_live_fQOafVJoJqscJ6',
      amount: `${price * 100}`,
      currency: 'MYR',
      name: 'Digital Dukaan',
      description: 'Test Transaction',
      image: `${BASE_PATH ? `/${BASE_PATH}` : ''}/assets/images/logo.svg`,
      // order_id: id,
      theme: {
        color: '#e8af01',
        bg_theme: selectedTheme,
      },
      prefill: {
        email: 'test@gmail.com',
        contact: '88888888',
      },
      // redirect: true,
      disable_redesign_v15: false,
      handler: function (response) {
        paymentState.set({ status: PAYMENT_STATE.SUCCESS, amount: response.amount });

        const data = {
          orderCreationId: id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        fetch(`${API_ENDPOINT}/payment/verify`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (error) {
      paymentState.set({ status: PAYMENT_STATE.FAILURE });
    });

    rzp1.open();
    // fetch('https://checkout.razorpay.com/v1/checkout.js')
    //   .then((response) => response.text())
    //   .then((txt) => eval(txt))
    //   .then(async () => {
    //     const rzp1 = new window.Razorpay(options);
    //     rzp1.on('payment.failed', function (error) {
    //       paymentState.set({ status: PAYMENT_STATE.FAILURE });
    //     });

    //     rzp1.open();
    //   });
  };

  const handleModalClick = () => {
    paymentState.set({});
  };
</script>

{#if $paymentState.status === PAYMENT_STATE.SUCCESS}
  <Modal on:close={handleModalClick}>
    <div class="modal-content">
      <img class="success-img" src={successIcon} alt="success-icon" />
      <h2 class="success-title">Success !</h2>
      <p class="info-text">Your payment has been successfully processed.</p>
    </div>
    <button on:click={handleModalClick} class="modal-btn">OK</button>
  </Modal>
{/if}

<style>
  .modal-content {
    display: flex;
    padding: 42px 12px 12px;
    align-items: center;
    height: 100%;
    border-top: 8px solid #22b43e;
    flex-direction: column;
  }

  .success-img {
    height: 54px;
    margin-bottom: 20px;
  }
  .success-title {
    font-family: 'Lato-Bold';
    color: #22b43e;
    margin-bottom: 8px;
  }

  .info-text {
    font-size: 14px;
    color: #878787;
    text-align: center;
  }

  .modal-btn {
    position: absolute;
    bottom: 0px;
    width: 100%;
    background-color: #f7f7f7;
    padding: 18px;
    display: flex;
    justify-content: center;
    font-size: 18px;
    color: #878787;
  }
</style>
