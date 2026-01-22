<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <Sidebar :isOpen="isSidebarOpen" @logout="handleLogout" />

    <div class="flex-1 flex flex-col min-w-0">
      <Navbar :email="userEmail" @toggleSidebar="isSidebarOpen = !isSidebarOpen" />

      <main class="flex-1 overflow-y-auto p-6">
        <RouterView/>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from "./Sidebar.vue";
import Navbar from './Navbar.vue';
import {toast} from "vue3-toastify";

const router = useRouter();
const isSidebarOpen = ref(true);
const userEmail = ref('User');

onMounted(() => {
  const data = localStorage.getItem('user_session');
  if (data) {
    const user = JSON.parse(data);
    userEmail.value = user.email;
  }
});

const handleLogout = () => {
  const response = confirm("Sir, are you sure you want to logout?");

  if (response) {
    localStorage.removeItem('user_session');

    toast.success("Logout successful!");

    setTimeout(() => {
      router.push('/').then(() => {
        window.location.reload();
      });
    }, 2000);

  }
};
</script>