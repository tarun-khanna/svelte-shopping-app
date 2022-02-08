<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import { fade, fly } from 'svelte/transition';

  const handleClick = () => {
    dispatch('close', {});
  };
</script>

<div on:click={handleClick} transition:fade class="modal-container">
  <div on:click|stopPropagation transition:fly={{ y: 200, duration: 600, delay: 100 }} class="modal-box"><slot /></div>
</div>

<style>
  .modal-container {
    position: fixed;
    z-index: 1000;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-box {
    width: 24%;
    height: 40%;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
  }

  @media only screen and (max-width: 989px) {
    .modal-box {
      width: 80%;
      height: 50%;
    }
  }
</style>
