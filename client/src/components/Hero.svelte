<script>
  import blob from '../assets/images/blob.svg';
  import illustration from '../assets/images/illustr-shop.svg';
</script>

<section class="hero-container">
  <img class="bg-blob" src={blob} alt="bg-img" />
  <div class="content-box">
    <h3 class="title">Find something <br /> you will <br /> love !</h3>
    <img class="illustr" src={illustration} alt="shop-illustration" />
  </div>
</section>

<style>
  .hero-container {
    position: relative;
  }
  .content-box {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 66vh;
  }

  .bg-blob {
    position: absolute;
    left: 10%;
    top: 8%;
    height: 86%;
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

  @media only screen and (max-width: 989px) {
    .hero-container {
      margin-top: 24px;
    }
    .content-box {
      flex-direction: column;
      height: auto;
      padding: 60px 0px 0px 60px;
      align-items: flex-start;
    }

    .bg-blob {
      height: 54vw;
    }

    .title {
      font-size: 22px;
    }

    .illustr {
      height: 184px;
      margin: 0px 0px 0px 32px;
    }
  }
</style>
