<template>
  <aside
      :class="isOpen ? 'w-64' : 'w-20'"
      class="bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col shadow-xl border-r border-slate-800"
  >
    <div class="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800 overflow-hidden">
      <span class="text-blue-400 text-2xl font-bold">⚡</span>
      <span v-if="isOpen" class="ml-3 font-bold text-white tracking-widest">ADMIN</span>
    </div>

    <nav class="flex-1 py-4 px-3 space-y-1">
      <router-link to="/dashboard" class="flex items-center p-3 rounded-lg hover:bg-slate-800 transition">
        <span class="text-xl">🏠</span>
        <span v-if="isOpen" class="ml-4 font-medium">Dashboard</span>
      </router-link>
    </nav>

    <button @click="$emit('logout')" class="m-3 flex items-center p-3 rounded-lg hover:bg-red-500 hover:text-white transition">
      <span class="text-xl">🚪</span>
      <span v-if="isOpen" class="ml-4 font-medium">Logout</span>
    </button>
  </aside>
</template>

<script setup>
defineProps(['isOpen']);
defineEmits(['logout']);
</script>