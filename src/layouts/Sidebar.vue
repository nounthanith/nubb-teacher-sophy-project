<template>
  <aside
      :class="isOpen ? 'w-64' : 'w-20'"
      class="bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col shadow-xl border-r border-slate-800 h-screen sticky top-0"
  >
    <div class="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800 overflow-hidden shrink-0">
      <span class="text-blue-400 text-2xl font-bold">▼</span>
      <span v-if="isOpen" class="ml-3 font-bold text-white tracking-widest uppercase">Logistic solution</span>
    </div>

    <nav class="flex-1 py-4 px-3 space-y-1 overflow-y-auto overflow-x-hidden">
      <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center p-3 rounded-lg hover:bg-slate-800 transition group"
          active-class="bg-blue-600 text-white"
      >
        <span class="text-xl min-w-6 flex justify-center">{{ item.icon }}</span>
        <span
            v-if="isOpen"
            class="ml-4 font-medium transition-opacity duration-300 whitespace-nowrap"
        >
          {{ item.name }}
        </span>
      </RouterLink>
    </nav>

    <div class="p-3 border-t border-slate-800">
      <button
          @click="$emit('logout')"
          class="w-full flex items-center p-3 rounded-lg hover:bg-red-500 hover:text-white transition group"
      >
        <span class="text-xl min-w-6 flex justify-center">🚪</span>
        <span v-if="isOpen" class="ml-4 font-medium whitespace-nowrap">Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
defineProps(['isOpen']);
defineEmits(['logout']);

const navItems = [
  { path: "/dashboard", name: "ផ្ទាំងដើម", icon: "🏠" },
  { path: "/order", name: "បង្កើតបញ្ញើ", icon: "🛒" },
  { path: "/users", name: "បុគ្គលិក", icon: "👤" },
]
</script>