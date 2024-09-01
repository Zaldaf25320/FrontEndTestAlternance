<template>
  <Modal :show="show" title="Modifier entreprise" @close="close">
    <form @submit.prevent="updateEnterprise">
      <div class="mb-4">
        <label class="block text-sm text-black">Nom</label>
        <input v-model="selectedEnterprise!.name" class="w-full px-3 py-2 border rounded text-black" />
      </div>
      <div class="mb-4">
        <label class="block text-sm text-black">Adresse</label>
        <input v-model="selectedEnterprise!.adress" class="w-full px-3 py-2 border rounded text-black" />
      </div>
      <div class="mb-4">
        <label class="block text-sm text-black">SIREN</label>
        <input v-model="selectedEnterprise!.siren" class="w-full px-3 py-2 border rounded text-black" />
      </div>
      <div class="mb-4">
        <label class="block text-sm text-black">TVA</label>
        <input v-model="selectedEnterprise!.tva" class="w-full px-3 py-2 border rounded text-black" />
      </div>
      <div class="flex justify-end">
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">modifier</button>
      </div>
    </form>
  </Modal>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import Modal from '../components/Modal.vue'

const props = defineProps<{
  show: boolean
  enterprise: { id: number; name: string; adress: string; siren: string; tva: string } | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update', updatedEnterprise: { id: number; name: string; adress: string; siren: string; tva: string }): void
}>();

const selectedEnterprise = ref<{ id: number; name: string; adress: string; siren: string; tva: string } | null>(null)

watch(() => props.enterprise, (newEnterprise) => {
  if (newEnterprise) {
    selectedEnterprise.value = { ...newEnterprise }
  }
});

const close = () => {
  emit('close')
}

const updateEnterprise = () => {
  if (selectedEnterprise.value) {
    emit('update', { ...selectedEnterprise.value })
  }
  close()
};
</script>