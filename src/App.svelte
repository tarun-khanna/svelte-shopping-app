<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte';
  import ProductDetail from './pages/ProductDetail.svelte';

  export let url = '';
</script>

<main>
  <Router {url}>
    <Route path="/" component={Home} />
    <Route path="detail" component={ProductDetail} />
  </Router>
</main>
