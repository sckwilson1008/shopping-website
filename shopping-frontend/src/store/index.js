import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false,
    cart: [],
  },
  getters: {
    cartItemCount: state => state.cart.length,  // 購物車中的商品數量
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    addToCart(state, product) {  // 新增一個 addToCart mutation 來更新 cart 狀態
      const item = state.cart.find(item => item.name === product.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    clearCart(state) {  // 新增一個 clearCart mutation 來清空購物車
      state.cart = [];
    },
    removeFromCart(state, product) {
      const item = state.cart.find(item => item.name === product.name);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          const index = state.cart.indexOf(item);
          if (index !== -1) {
            state.cart.splice(index, 1);
          }
        }
      }
    },
  },
  actions: {
    logout({ commit }) {
      // 你的登出邏輯...
      commit('setLoggedIn', false);
      commit('clearCart');
    }
  },
  modules: {
  }
})
