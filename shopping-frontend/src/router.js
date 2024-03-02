import { createRouter, createWebHistory } from 'vue-router';

import Home from './components/pages/Home.vue';
import Products from './components/pages/Products.vue';
import Cart from './components/pages/Cart.vue';
import Login from './components/pages/Login.vue';
import Checkout from './components/pages/Checkout.vue';

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home'},
    { path: '/home', component: Home },
    { path: '/products', component: Products },
    { path: '/cart', component: Cart },
    { path: '/login', component: Login },
    { path: '/checkout', component: Checkout},
  ],
});

export default routes;