<script setup>
import { authState } from "./store/auth"; // Import our reactive store
import Layout from "./layouts/Layout.vue";
import Login from "./pages/Login.vue";
</script>

<template>
  <template v-if="!authState.isAuthenticated">
    <div class="min-h-screen bg-gray-100 flex items-center justify-center font-kantum">
      <Login />
    </div>
  </template>

  <template v-else>
    <Layout>
      <RouterView />
    </Layout>
  </template>
</template>

<style>
html, body {
  font-family: 'Kantumruy Pro', sans-serif;
  margin: 0;
  padding: 0;
}
</style>