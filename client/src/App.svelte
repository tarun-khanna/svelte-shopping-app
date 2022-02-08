<script>
  import { Router, Route } from 'svelte-routing';
  import Home from './pages/Home.svelte';
  import ProductDetail from './pages/ProductDetail.svelte';

  export let url = '';
  const { env } = process;
  const basepath = env.BASE_PATH;
</script>

<main>
  <Router {url} {basepath}>
    <Route path="/" component={Home} />
    <Route path="detail" component={ProductDetail} />
  </Router>
</main>
