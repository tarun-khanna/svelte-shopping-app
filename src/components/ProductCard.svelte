<script>
  import { navigate } from 'svelte-routing';
  import Rating from './Rating.svelte';
  export let product;

  const { title, image, price, rating } = product;

  const handleCardClick = () => {
    navigate('detail', { state: product });
  };
</script>

<div on:click={handleCardClick} class="card-container">
  <img class="card-img" src={image} alt="product-img" />
  <p class="card-title">{title}</p>
  <p class="card-price">₹ {price}</p>
  <Rating {rating} />
</div>

<style>
  .card-container {
    margin-right: 20px;
    width: 200px;
    height: 320px;
    padding: 12px;
    transition: box-shadow 0.3s ease-in, transform 0.2s ease-in;
  }

  .card-container:hover {
    cursor: pointer;
    box-shadow: 0px 0px 30px -10px rgb(0 0 0 / 25%);
    transform: scale(1.02);
  }

  .card-img {
    height: 200px;
    width: 100%;
    object-fit: contain;
    background-color: white;
    margin-bottom: 12px;
  }

  .card-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
  }

  .card-price {
    font-family: 'Lato-Bold';
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 989px) {
    .card-container {
      height: auto;
      width: 142px;
    }

    .card-title {
      font-size: 14px;
    }
    .card-img {
      height: 150px;
    }
  }
</style>
