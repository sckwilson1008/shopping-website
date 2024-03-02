<template>
  <div>
    <h2 v-if="!isLoggedIn">Please login first!</h2>
    <div v-else>
      <div v-for="item in cart" :key="item.name">
        <p>{{ item.name }} ({{ item.price }} NTD) x {{ item.quantity }}</p>
        <base-button @click="removeFromCart(item)">Remove 1</base-button>
      </div>
      <p>Total: {{ totalPrice }} NTD</p>
      <base-button @click="goCheckout">結帳</base-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BaseButton from '../ui/BaseButton.vue';

export default {
  components: { BaseButton },
  computed: {
    ...mapState(['isLoggedIn', 'cart']),
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    goCheckout() {
      this.$router.push('/checkout');
    },
    removeFromCart(item) {
      this.$store.commit('removeFromCart', item);
    }
  },
};
</script>