<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
              v-model="email"
              type="email"
              required
              placeholder="email@example.com"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
              v-model="password"
              type="password"
              required
              placeholder="********"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
            type="submit"
            class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
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

const email = ref('');
const password = ref('');
const message = ref('');

const handleLogin = () => {
  // 1. Generate a mock JWT-like token
  const randomToken = btoa(email.value + Date.now());

  // 2. Create the user object
  const userData = {
    email: email.value,
    token: `mock_token_${randomToken}`,
    loginTime: new Date().toISOString()
  };

  // 3. Save to localStorage
  localStorage.setItem('user_session', JSON.stringify(userData));

  message.value = "Login successful";

  if (message.value === "Login successful") window.location.reload();

  email.value = '';
  password.value = '';

  console.log("Saved to LocalStorage:", userData);
};
</script>