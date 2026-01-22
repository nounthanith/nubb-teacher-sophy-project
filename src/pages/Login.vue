<template>
  <div class="fixed inset-0 z-[100] bg-slate-100 flex items-center justify-center font-kantum p-4">

    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold uppercase text-slate-800">LOGISTIC Solution</h1>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="space-y-4 mb-6">
          <Input
              label="Email"
              type="email"
              placeholder="hahahabro@gmail.com"
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Input from "../components/Input.vue";
import {toast} from "vue3-toastify";
import 'vue3-toastify/dist/index.css';

const router = useRouter();
const email = ref('');
const password = ref('');
const message = ref('');

const handleLogin = () => {
  if (!email.value || !password.value) {
    toast.error("Please sign in to your account");
    return;
  }

  const randomToken = (email.value + Date.now());

  const userData = {
    email: email.value,
    token: `whenIWasYourMen${randomToken}konKhmer`,
  };

  localStorage.setItem('user_session', JSON.stringify(userData));

  message.value = "Login successful!";

  if (message.value === "Login successful!") {
    toast.success("Login successful!");

    setTimeout(() => {
      router.push("/dashboard").then(() => {
        window.location.reload();
      });
    }, 2000);
  }
};
</script>