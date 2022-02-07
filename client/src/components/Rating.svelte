<script>
  import starFilled from '../assets/images/star-filled.svg';
  export let rating = {};
  let customClass;
  export { customClass as class };
</script>

<div class="{customClass} rating-box">
  <span class="rating-star">{rating.rate}</span>
  <img class="star" src={starFilled} alt="star" />
</div>
<span class="rating-count">{rating.count} reviews</span>

<style>
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

  .star {
    width: 14px;
  }
  .rating-count {
    color: #878787;
    font-family: 'Lato-Bold';
    font-size: 14px;
  }

  @media only screen and (max-width: 989px) {
    .rating-star {
      font-size: 10px;
    }
    .star {
      width: 8px;
    }
    .rating-count {
      font-size: 12px;
    }
  }
</style>
