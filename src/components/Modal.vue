<template>
  <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-lg font-bold mb-4 text-black">{{ title }}</h2>
      <slot></slot>
      <div class="mt-4 flex justify-end">
        <button @click="closeModal" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps<{
  show: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const closeModal = () => {
  emit('close')
}
</script>