<script>
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';
  import Rating from '../components/Rating.svelte';
  let product = window.history.state;

  const { title, image, price, description, category, rating } = product;
</script>

<Header />
<div class="detail-container">
  <img class="prod-img" src={image} alt="prod-img" />

  <div class="info-box">
    <h2 class="title">{title}</h2>
    <h3 class="price">₹ {price}</h3>
    <Rating {rating} class="rating-box" />
    <p class="desc">{description}</p>
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
  }

  .prod-img {
    width: 32vw;
    margin-right: 80px;
    object-fit: contain;
    height: 60vh;
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
  }
</style>
