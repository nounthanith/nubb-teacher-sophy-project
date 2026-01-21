<template>
  <Layout>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="i in 3" :key="i" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-gray-500 text-sm font-medium uppercase">Total Sales</h3>
        <p class="text-3xl font-bold text-gray-900 mt-2">$24,500</p>
      </div>
    </div>

    <div class="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center">
      <span class="text-gray-400">Chart or Table Area</span>
    </div>
  </Layout>
</template>

<script setup>
import Layout from '../layouts/Layout.vue';
</script>