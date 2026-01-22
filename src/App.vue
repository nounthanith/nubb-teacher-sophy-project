<script setup>
import { authState } from "./store/auth";
import Layout from "./layouts/Layout.vue";
import Login from "./pages/Login.vue";
</script>

<template>
  <Login v-if="!authState.isAuthenticated" />
  <Layout v-else>
    <RouterView />
  </Layout>
</template>