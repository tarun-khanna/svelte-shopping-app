<script>
  import starFilled from '../assets/images/star-filled.svg';
  export let product;

  const { title, image, price, rating } = product;
</script>

<div class="card-container">
  <img class="card-img" src={image} alt="product-img" />
  <p class="card-title">{title}</p>
  <p class="card-price">₹ {price}</p>
  <div class="rating-box">
    <span class="rating-star">{rating.rate}</span>
    <img class="star" src={starFilled} alt="star" />
  </div>
  <span class="rating-count">{rating.count} reviews</span>
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

  .rating-box {
    background-color: #26a541;
    display: flex;
    justify-content: center;
    padding: 2px 6px;
    border-radius: 8px;
    display: inline-block;
    margin-right: 4px;
  }

  .rating-star {
    color: #fff;
    font-size: 14px;
    margin-right: 4px;
  }

  .rating-count {
    color: #878787;
    font-family: 'Lato-Bold';
    font-size: 14px;
  }

  .star {
    width: 14px;
  }
</style>
