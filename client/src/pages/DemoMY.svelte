<script>
  import Header from '../components/Header/Header.svelte';
  import Footer2 from '../components/Footer2/index.svelte';
  import PaymentState, { initiatePayment } from '../components/PaymentState.svelte';

  let product = {
    title: 'APPLE iPhone 14 Pro Max (Silver, 1 TB)',
    price: 200,
    description: `Razorpay provides an end-to-end online payments solution. We accept and validate Internet payments via Credit Card, Debit Card, Net-Banking, UPI and popular Wallets from the end customers in real-time. 
      Ut non aliqua dolore ut anim enim. Aliquip enim tempor amet fugiat veniam reprehenderit magna aliquip laborum laboris officia eiusmod. Ipsum irure quis mollit velit tempor culpa mollit irure nisi consectetur nisi consequat.`,
    images: [
      'https://rukminim1.flixcart.com/image/832/832/xif0q/mobile/k/s/t/-original-imaghxengzjc2djt.jpeg?q=70',
      'https://rukminim1.flixcart.com/image/832/832/xif0q/mobile/q/k/p/-original-imaghxenngtep4kw.jpeg?q=70',
      'https://rukminim1.flixcart.com/image/832/832/xif0q/mobile/n/j/d/-original-imaghxemx2v9wyxa.jpeg?q=70',
      'https://rukminim1.flixcart.com/image/832/832/xif0q/mobile/s/p/d/-original-imaghxemhgfzjgja.jpeg?q=70',
    ],
    rating: {
      rate: 5,
      count: 15000,
    },
  };

  const { title, price, description, images, rating } = product;
  let loading = false;
  let activeImage = images[0];
  window.scrollTo(0, 0);

  const handlePayment = () => {
    loading = true;
    initiatePayment(200, false)
      .catch((err) => console.log('error in 1st api=', err))
      .finally(() => (loading = false));
  };
</script>

<PaymentState />
<div class="body">
  <Header />
  <div class="detail-container">
    <div class="d-flex images-container">
      <img class="mobile-only cover-img" src={activeImage} alt="cover-img" />
      <div class="d-flex gallery-section">
        {#each images as image}
          <img
            on:click={() => {
              activeImage = image;
            }}
            src={image}
            alt="gallery-img"
            class="gallery-img"
          />
        {/each}
      </div>
      <img class="desktop-only cover-img" src={activeImage} alt="cover-img" />
    </div>

    <div class="info-box">
      <h3 class="title">{title}</h3>
      <h1 class="price">RM {price}</h1>
      <div class="d-flex rating">
        {#each new Array(rating.rate).fill('') as item}
          <img src="https://razorpay.com/images/demo/star.svg" alt="Star" />
        {/each}
      </div>
      <p class="desc">{description}</p>
      <div class="btn-container">
        {#if loading}
          <div class="loader" />
        {:else}
          <!-- <div class="magic-btn-container" on:click={() => handlePayment(true)}>
            <div>Buy now</div>
          </div> -->
          <magic-checkout-btn on:click={handlePayment}><span slot="title">Buy now</span></magic-checkout-btn>
        {/if}
      </div>
    </div>
  </div>
</div>
<Footer2 />

<style>
  .body {
    min-height: 85vh;
  }
  img {
    object-fit: contain;
  }

  .detail-container {
    display: flex;
    margin: var(--section-vertical-spacing) 10vw;
  }

  .title {
    margin-bottom: 4px;
  }

  .price {
    /* font-family: 'Lato-Black'; */
    margin-bottom: 12px;
  }

  .d-flex {
    display: flex;
    align-items: center;
  }

  .gallery-section {
    flex-direction: column;
  }

  .rating {
    margin-bottom: 12px;
  }

  .rating img {
    width: 18px;
    height: 18px;
  }

  .desc {
    margin-top: 20px;
    color: rgb(102, 102, 102);
    word-spacing: 4px;
    letter-spacing: 0.3px;
    margin-bottom: 20px;
  }

  .cover-img {
    width: 300px;
    height: 320px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 12px;
  }

  .loader {
    border: 4px solid var(--primary-color);
    border-radius: 50%;
    border-top: 4px solid transparent;
    width: 24px;
    height: 24px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }

  .btn-container {
    width: 250px;
    display: flex;
    flex-direction: column;
  }

  .gallery-img {
    width: 80px;
    height: 80px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .images-container {
    border: 1px solid rgba(0, 0, 0, 0.1);
    align-items: flex-start;
    margin-right: 50px;
  }

  .mobile-only {
    display: none;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 989px) {
    .detail-container {
      flex-direction: column;
      align-items: center;
    }
    .title {
      font-size: 20px;
    }

    .cover-img {
      width: 100%;
      height: 300px;
    }

    .desc {
      font-size: 12px;
    }

    .btn-container {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .gallery-section {
      flex-direction: row;
    }

    .mobile-only {
      display: block;
    }
    .desktop-only {
      display: none;
    }

    .images-container {
      margin-bottom: 40px;
      flex-direction: column;
    }
  }
</style>
