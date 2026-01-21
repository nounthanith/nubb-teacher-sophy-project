<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="space-y-4 mb-6">
          <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              v-model="email"
          />

          <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              v-model="password"
          />
        </div>

        <button
            type="submit"
            class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Sign In
        </button>
      </form>

      <p v-if="message" class="mt-4 text-center text-sm text-green-600 font-medium">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Input from "../components/Input.vue";

const router = useRouter();
const email = ref('');
const password = ref('');
const message = ref('');

const handleLogin = () => {
  const randomToken = btoa(email.value + Date.now());

  const userData = {
    email: email.value,
    token: `mock_token_${randomToken}`,
  };

  localStorage.setItem('user_session', JSON.stringify(userData));

  message.value = "Login successful!";

  setTimeout(() => {
    router.push('/dashboard');
  }, 1000);
};
</script>