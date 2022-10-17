<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const checkoutType = ['Standard', 'Custom'];
  let selectedOption = 'Checkout Type';
  let isExpanded = false;
  let dropdownRef;
  export let onOptionClick;
  $: expanded = isExpanded;

  const dropdownClicked = () => {
    isExpanded = !isExpanded;
  };

  const optionClicked = (option) => {
    selectedOption = option;
    onOptionClick(option);
    dropdownClicked();
  };

  const onWindowClick = (e) => {
    if (dropdownRef.contains(e.target) == false) isExpanded = false;
  };
</script>

<svelte:window on:click={onWindowClick} />

<div class="dropdown-wrapper" bind:this={dropdownRef}>
  <div class="dropdown-title" on:click={dropdownClicked}>
    <p class="title">{selectedOption}</p>
  </div>
  {#if expanded}
    <div class="options">
      {#each checkoutType as checkout}
        <div class="option" on:click={() => optionClicked(checkout)}>{checkout}</div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .dropdown-wrapper {
    width: 10rem;
    margin-bottom: 10px;
    position: relative;
  }

  .dropdown-title {
    display: flex;
    height: 3rem;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #0460f8;
    border-radius: 5px;
  }
  .dropdown-title .title {
    font-size: 14px;
    font-weight: 600;
    color: white;
  }

  .options {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 14px 35px 0 rgba(9, 9, 12, 0.15);
    padding: 5px;
    position: absolute;
    width: 100%;
  }

  .option {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #0460f8;
    padding: 10px 0px;
    transition: all 200ms linear;
    font-size: 14px;
    font-weight: 500;
  }

  .option:hover {
    color: #fff;
    background-color: #0460f8;
  }
</style>
