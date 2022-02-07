<script>
  import blob from '../assets/images/blob.svg';
  import illustration from '../assets/images/illustr-shop.svg';
</script>

<img class="bg-blob" src={blob} alt="bg-img" />
<section class="hero-container">
  <h3 class="title">Find something <br /> you will <br /> love !</h3>
  <img class="illustr" src={illustration} alt="shop-illustration" />
</section>

<style>
  .hero-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 66vh;
  }

  .bg-blob {
    position: absolute;
    left: 12%;
    top: 20%;
    height: 60%;
  }

  .title {
    font-family: 'Lato-Black';
    font-size: 50px;
    color: white;
  }

  .illustr {
    height: 400px;
    margin-left: 40px;
  }
</style>
