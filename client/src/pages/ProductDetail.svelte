<script>
  import Header from '../components/Header/Header.svelte';
  import Footer from '../components/Footer/Footer.svelte';
  import Rating from '../components/Rating.svelte';
  import shopIcon from '../assets/images/shopping-bag.svg';
  import PaymentState, { initiatePayment } from '../components/PaymentState.svelte';
  let product = window.history.state;

  const { title, image, price, description, category, rating } = product;
  let loading = false;

  window.scrollTo(0, 0);

  const handlePayment = () => {
    loading = true;
    initiatePayment(price)
      .catch((err) => console.log('error in 1st api=', err))
      .finally(() => (loading = false));
  };
</script>

<PaymentState />
<Header />
<div class="detail-container">
  <img class="prod-img" src={image} alt="prod-img" />

  <div class="info-box">
    <h2 class="title">{title}</h2>
    <h3 class="price">₹ {price}</h3>
    <Rating {rating} class="rating-box" />
    <p class="desc">{description}</p>
    <div class="btn-container">
      {#if loading}
        <div class="loader" />
      {:else}
        <magic-checkout-btn on:click={handlePayment} />
      {/if}
    </div>
    <!-- <button class="shop-btn" on:click={handlePayment}>
      {#if loading}
        <div class="loader" />
      {:else}
        <img class="shop-icon" alt="shop-icon" src={shopIcon} /> <span>Buy</span>
      {/if}
    </button> -->
  </div>
</div>
<Footer />

<style>
  .detail-container {
    display: flex;
    margin: var(--section-vertical-spacing) var(--section-horizontal-spacing);
  }

  .title {
    font-family: 'Lato-Black';
    margin-bottom: 4px;
  }

  .price {
    margin-bottom: 12px;
  }

  .rating-box {
    margin-bottom: 12px;
  }

  .desc {
    margin-top: 20px;
    color: rgb(102, 102, 102);
    word-spacing: 4px;
    letter-spacing: 0.3px;
    margin-bottom: 20px;
  }

  .prod-img {
    width: 32vw;
    margin-right: 80px;
    object-fit: contain;
    height: 60vh;
  }

  .shop-btn {
    background-color: var(--primary-color);
    border-radius: 4px;
    padding: 8px 32px;
    color: white;
    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.1);
    font-size: 18px;
    font-family: 'Lato-Bold';
    text-transform: uppercase;
    display: flex;
    align-items: center;
    width: 150px;
    justify-content: center;
  }

  .shop-icon {
    width: 18px;
    margin-right: 14px;
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

    .prod-img {
      width: 100%;
      height: 32vh;
      margin: 0px 0px 24px 0px;
    }

    .desc {
      font-size: 12px;
    }

    .shop-btn {
      margin: auto;
    }

    .btn-container {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
</style>
