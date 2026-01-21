<template>
  <div class="flex flex-col gap-1.5 w-full mb-4">
    <label
        v-if="label"
        :for="id"
        class="text-sm font-semibold text-gray-700 ml-1"
    >
      {{ label }}
    </label>

    <div class="relative">
      <input
          :id="id"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          @input="$emit('update:modelValue', $event.target.value)"
          class="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
               transition-all duration-200 placeholder:text-gray-400"
          :class="{'border-red-500 focus:ring-red-500': error}"
      />
    </div>

    <p v-if="error" class="text-xs text-red-500 ml-1 mt-1 font-medium">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  },
  id: String,
  modelValue: [String, Number],
  error: String
});

defineEmits(['update:modelValue']);
</script>