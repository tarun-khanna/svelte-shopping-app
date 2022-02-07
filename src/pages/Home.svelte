<script>
  import Hero from '../components/Hero.svelte';
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';
  import ProductSliderList from '../components/ProductSliderList.svelte';
  import { data, fetchCategories, fetchProductsByCategory } from '../services/product';

  let productData = data;
  // onMount(async () => {
  //   const categories = await fetchCategories();

  //   categories.forEach(async (category) => {
  //     productData[category] = [];
  //     const products = await fetchProductsByCategory(category);
  //     productData[category] = products;
  //   });
  // });
</script>

<Header categories={Object.keys(productData)} />
<Hero />
{#each Object.keys(productData) as category (category)}
  <ProductSliderList {category} products={productData[category]} />
{/each}
<Footer />
