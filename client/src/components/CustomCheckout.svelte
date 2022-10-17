<script>
  const { env } = process;
  const { RAZORPAY_KEY_ID, API_ENDPOINT, BASE_PATH } = env;
  let razorpayKey = '';
  let cardName = 'Harshil Mathur';
  let cardNumber = '4111 1111 1111 1111';
  let expiryDate = '11 / 23';
  let cvv = '123';
  let isProgress = false;
  $: rzp_key = razorpayKey;
  $: isLoading = isProgress;
  export let itemPrice;

  const initializePayment = () => {
    isProgress = true;
    fetch('https://checkout.razorpay.com/v1/razorpay.js')
      .then((response) => response.text())
      .then((txt) => eval(txt))
      .then(async () => {
        const amountMoney = itemPrice ? itemPrice : 1;
        // create order id from server
        const orderData = await createOrder(amountMoney);

        const options = {
          key: rzp_key ? rzp_key : RAZORPAY_KEY_ID,
          image: 'https://i.imgur.com/n5tjHFD.jpg',
        };

        const razorpay = new Razorpay(options);
        const newCardNumber = cardNumber.replaceAll(' ', '');
        const [month, year] = expiryDate.split('/');

        const data = {
          amount: `${amountMoney * 100}`,
          currency: 'MYR',
          email: 'gaurav.kumar@example.com',
          contact: '9123456780',
          notes: {
            address: 'Ground Floor, SJR Cyber, Laskar Hosur Road, Bengaluru',
          },
          order_id: orderData.id,
          method: 'card',
          'card[name]': cardName,
          'card[number]': newCardNumber,
          'card[cvv]': cvv,
          'card[expiry_month]': month.trim(),
          'card[expiry_year]': year.trim(),
        };

        razorpay.createPayment(data);

        // razorpay.once('ready', function (response) {
        //   console.log(response.methods);
        // });
        isProgress = false;
        razorpay.on('payment.success', function (resp) {
          alert(`Payment with id: ${resp.razorpay_payment_id} against orderId: ${resp.razorpay_order_id} has been successfully completed`);
        });

        razorpay.on('payment.failed', function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
      })
      .catch((err) => {
        isProgress = false;
        alert('error');
      });
  };

  const createOrder = async (price) => {
    const orderData = await fetch(`${API_ENDPOINT}/payment/orders`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: price, currency: 'MYR' }),
    }).then((res) => res.json());

    return orderData;
  };

  const formFieldUpdated = (field, value) => {
    switch (field) {
      case 'razorpaykey':
        razorpayKey = value;
        break;

      default:
        break;
    }
  };
</script>

<div class="form-wrapper">
  <div class="field">
    <label for="razorpaykey">Razorpay Key</label>
    <input
      type="text"
      value={razorpayKey}
      on:change={(event) => {
        formFieldUpdated('razorpaykey', event.target.value);
      }}
    />
  </div>
  <div class="field">
    <label for="name">Name</label>
    <input id="name" maxlength="20" type="text" value={cardName} />
  </div>

  <div class="field">
    <label for="cardnumber">Card Number</label>
    <input id="cardnumber" type="text" pattern="[0-9]*" inputmode="numeric" value={cardNumber} />
  </div>

  <div class="row">
    <div class="field expiry-date">
      <label for="cardnumber">Expiration (mm/yy)</label>
      <input id="cardnumber" type="text" pattern="[0-9]*" inputmode="numeric" value={expiryDate} />
    </div>

    <div class="field cvv">
      <label for="cardnumber">Security Code</label>
      <input id="cardnumber" type="text" pattern="[0-9]*" inputmode="numeric" value={cvv} />
    </div>
  </div>

  <div class="pay-btn" on:click={initializePayment}>
    <div>Pay</div>
    {#if isLoading}
      <div class="loader" />
    {/if}
  </div>
</div>

<style>
  .form-wrapper {
    width: 750px;
    color: #707070;
  }

  .field {
    width: 70%;
    margin-bottom: 10px;
  }

  .row {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .expiry-date,
  .cvv {
    width: 40%;
  }

  label {
    padding-bottom: 5px;
    font-size: 13px;
  }

  input {
    margin-top: 3px;
    padding: 15px;
    font-size: 16px;
    width: 100%;
    border-radius: 3px;
    border: 1px solid #dcdcdc;
  }

  input:focus {
    border: 1px solid #0460f8;
  }

  .pay-btn {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #0460f8;
    color: #fff;
    height: 50px;
    cursor: pointer;
  }

  .loader {
    border: 4px solid #fff;
    border-radius: 50%;
    border-top: 4px solid transparent;
    width: 24px;
    height: 24px;
    margin-left: 10px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
