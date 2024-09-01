<template>
  <Modal :show="show" title="Ajouter une entreprise" @close="close">
    <form @submit.prevent="addEnterprise">
      <div class="mb-4">
        <label class="block text-sm text-black">SIRET</label>
        <input v-model="newEnterprise.siret" class="w-full px-3 py-2 border rounded text-black" />
      </div>
      <div class="flex justify-end">
        <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Ajouter</button>
      </div>
    </form>
  </Modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import Modal from '../components/Modal.vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add', enterprise: {  siret: number; }): void
}>()

const newEnterprise = ref({
  siret: '',
})

const close = () => {
  emit('close')
}

const addEnterprise = () => {
  emit('add', { ...newEnterprise.value })
  close()
}
</script>