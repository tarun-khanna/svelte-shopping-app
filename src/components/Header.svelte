<script>
  export let categories;
</script>

<div class="container header-container">
  <div class="container logo-container">
    <img class="logo-img" src="/assets/images/logo.svg" alt="logo-dukaan" />
    <h1 class="logo-text">Dukaan</h1>
  </div>
  <div class="container category-container">
    {#each categories as category}
      <button class="category-text">{category}</button>
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
  }

  .header-container {
    justify-content: space-between;
    padding: 24px;
  }

  .logo-img {
    height: 60px;
    margin-right: 8px;
  }

  .logo-text {
    font-family: 'Lato-Thin';
  }

  .category-text {
    font-size: 14px;
    margin-right: 20px;
    text-transform: capitalize;
  }

  .category-text:hover {
    color: var(--primary-color);
  }
</style>
