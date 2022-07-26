<script context="module">
  import { writable } from 'svelte/store';
  import Modal from './Modal.svelte';
  import { PAYMENT_STATE } from '../utils/constants';
  import successIcon from '../assets/images/success.svg';
  export const paymentState = writable({});

  export const initiatePayment = async (price, selectedTheme, isStandard) => {
    const { env } = process;
    const { RAZORPAY_KEY_ID, API_ENDPOINT, BASE_PATH } = env;

    const orderData = await fetch(`${API_ENDPOINT}/payment/orders`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price }),
    }).then((res) => res.json());

    const { amount, id } = orderData;

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: `${amount * 100}`,
      currency: 'INR',
      name: 'Digital Dukaan',
      description: 'Test Transaction',
      image: `${BASE_PATH ? `/${BASE_PATH}` : ''}/assets/images/logo.svg`,
      theme: {
        color: '#e8af01',
        bg_theme: selectedTheme,
      },
      one_click_checkout: true,
      prefill: {
        name: 'Tarun Khanna',
        email: 'test@gmail.com',
        contact: '9999999999',
      },
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

    if(!isStandard) {
      options.order_id = id
    }
    console.log('🚀 ~ initiatePayment ~ options', options);
    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (error) {
      paymentState.set({ status: PAYMENT_STATE.FAILURE });
    });

    rzp1.open();
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
