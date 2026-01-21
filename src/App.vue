<script setup>
import { authState } from "./store/auth"; // Import our reactive store
import Layout from "./layouts/Layout.vue";
import Login from "./pages/Login.vue";
</script>

<template>
  <Login v-if="!authState.isAuthenticated" />
  <Layout v-else>
    <RouterView />
  </Layout>
</template>

<style>
html, body {
  font-family: 'Kantumruy Pro', sans-serif;
  margin: 0;
  padding: 0;
}
</style>