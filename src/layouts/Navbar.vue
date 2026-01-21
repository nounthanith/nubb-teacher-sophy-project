<template>
  <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
    <button @click="$emit('toggleSidebar')" class="p-2 rounded-md text-gray-500 hover:bg-gray-100">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <div class="flex items-center gap-3">
      <span class="text-sm font-medium text-gray-600 hidden md:block">{{ email }}</span>
      <div class="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
        {{ email.charAt(0).toUpperCase() }}
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps(['email']);
defineEmits(['toggleSidebar']);
</script>