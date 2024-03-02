<template>
  <div>
    <base-card v-for="product in products" :key="product.name">
        <h1>{{ product.name }} {{ product.price }} NTD</h1>
        <p>{{ product.name }}，一張可以讓你參與民主選舉的證件。</p>
        <base-button @click="addToCartAndNavigate(product)">Add to Cart</base-button>
    </base-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import BaseCard from '../ui/BaseCard.vue';

export default {
  components: { BaseCard },
  data() {
    return {
      products: [
        { name: '民進黨黨證', price: 150 },
        { name: '國民黨黨證', price: 150 },
        { name: '民眾黨黨證', price: 150 }
      ]
    };
  },
  methods: {
    ...mapMutations(['addToCart']),
    addToCartAndNavigate(product) {
      this.addToCart(product);
      this.$router.push('/cart');
    }
  },
};
</script>