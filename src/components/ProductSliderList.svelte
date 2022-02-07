<script>
  import ProductCard from '../components/ProductCard.svelte';
  export let category = '';
  export let products = [];
</script>

<section id={category} class="product-list-container">
  <h3 class="category-title">{category}</h3>
  <div class="category-list">
    {#each products as product (product.id)}
      <ProductCard {product} />
    {:else}
      No Items to show !
    {/each}
  </div>
</section>

<style>
  .category-title {
    margin-bottom: 40px;
    font-family: 'Lato-Bold';
    font-size: 24px;
    text-transform: capitalize;
  }

  .product-list-container {
    margin: var(--section-vertical-spacing) auto;
    padding: 0px var(--section-horizontal-spacing);
  }

  .category-list {
    display: flex;
    flex-wrap: wrap;
  }

  @media only screen and (max-width: 989px) {
    .category-title {
      font-size: 18px;
      margin-bottom: 20px;
    }

    .category-list {
      justify-content: center;
    }
  }
</style>
