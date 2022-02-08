<script>
  import { navigate } from 'svelte-routing';
  export let categories = [];
  const { env } = process;
  const { BASE_PATH } = env;

  const handleClick = (categoryLink) => {
    if (categoryLink) {
      const section = document.getElementById(categoryLink);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
      else navigate(`${BASE_PATH ? `/${BASE_PATH}` : '/'}`);
    } else navigate(`${BASE_PATH ? `/${BASE_PATH}` : '/'}`);
  };
</script>

<div class="container header-container">
  <button on:click={handleClick} class="container logo-container">
    <img class="logo-img" src={`${BASE_PATH ? `/${BASE_PATH}` : ''}/assets/images/logo.svg`} alt="logo-dukaan" />
    <h1 class="logo-text">Dukaan</h1>
  </button>
  <div class="container category-container">
    {#each categories as category}
      <button on:click={() => handleClick(category)} class="category-text">{category}</button>
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

  @media only screen and (max-width: 989px) {
    .logo-img {
      height: 46px;
    }

    .logo-text {
      font-size: 18px;
    }
    .category-container {
      display: none;
    }
  }
</style>
