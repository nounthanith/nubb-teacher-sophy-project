<template>
  <div class="fixed inset-0 z-[100] bg-slate-100 flex items-center justify-center font-kantum p-4">

    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-slate-800">NITH LOGISTIC</h1>
        <p class="text-slate-500 mt-2">Please sign in to your account</p>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="space-y-4 mb-6">
          <Input
              label="Email Address"
              type="email"
              placeholder="tong@gmail.com"
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
            class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
        >
          Sign In
        </button>
      </form>

      <p v-if="message" class="mt-4 text-center text-sm text-green-600 font-bold">
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
  // 1. Create the token
  const randomToken = btoa(email.value + Date.now());

  const userData = {
    email: email.value,
    token: `mock_token_${randomToken}`,
  };

  localStorage.setItem('user_session', JSON.stringify(userData));

  message.value = "Login successful!";

  if (message.value === "Login successful!") {
    router.push("/dashboard").then(() => {
      window.location.reload();
    });
  }
};
</script>