<template>
  <base-card>
    <div v-if="dialogVisible" class="dialog">
      <p>{{ dialogMessage }}</p>
      <button @click="dialogVisible = false">OK</button>
    </div>
    <form @submit.prevent="submitForm">
      <div class="form-control" v-if="this.mode !== 'login'">
        <label for="name">Name</label>
        <input type="name" id="name" v-model.trim="name"/>
      </div>
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="email"/>
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password"/>
      </div>
      <div class="form-control" v-if="this.mode !== 'login'">
        <label for="passwordConfirm">Password Confirm</label>
        <input type="password" id="passwordConfirm" v-model.trim="passwordConfirm"/>
      </div>
      <p v-if="!formIsValid">Please enter a valid email and password with at least 6 characters.</p>
      <p v-if="isErrorOnce">Email or Password is wrong!!!</p>
      <p v-if="isErrorOnce">Because of skill issue, if you forget your account, you can hardly find it back!</p>
      <base-button>{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="flat" @click="switchMode">{{ switchModeButtonCaption }}</base-button>
    </form>
  </base-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
  components: {
    
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      formIsValid: true,
      isErrorOnce: false,
      mode: 'login',
      dialogVisible: false,
      dialogMessage: ''
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    }
  },
  methods: {
    async submitForm() {
    this.formIsValid = true;
    if (this.email === '' || !this.email.includes('@') || this.password.length < 6) {
      this.formIsValid = false;
      return;
    } else if (this.mode === 'signup' && this.password !== this.passwordConfirm) {
      this.formIsValid = false;
      return;
    } else {
      if (this.mode === 'login') {
        await this.login();  // 加上 await
      } else {
        await this.signup();
      }
    }
  },
    switchMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    async login() {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // name: this.name,
            email: this.email,
            password: this.password
          })
        });
        const responseData = await response.json();
        if (response.ok) {
          console.log(responseData);
          this.$store.commit('setLoggedIn', true);//test
          this.$router.push('/cart');
        } else {
          console.log(responseData);
        }
      } catch (error) {
        console.error('Failed to login:', error);
        this.isErrorOnce = true;
      }
    },
    async signup() {
      try {
        const response = await fetch('http://127.0.0.1:3000/api/v1/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
            passwordConfirm: this.passwordConfirm
          })
        });
        const responseData = await response.json();
        if (response.ok) {
          console.log(responseData);
          this.dialogMessage = 'Signup successful!';
        } else {
          console.log(responseData);
          this.dialogMessage = 'Signup failed: ' + responseData.message;
        }
        this.dialogVisible = true;
      } catch (error) {
        console.error('Failed to signup:', error);
        this.dialogMessage = 'Signup failed: ' + error.message;
        this.dialogVisible = true;
      }
    },
  },
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 1em;
  border: 1px solid black;
}
</style>