<template>
  <Modal :show="show" title="Delete Enterprise" @close="close">
    <p class="text-black text-sm">Êtes-vous sur de supprimer l'entreprise : <strong>{{ enterprise!.name }}</strong>?</p>
    <div class="flex justify-end mt-4">
      <button @click="confirmDelete" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Supprimer</button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "../components/Modal.vue"


const props = defineProps<{
  show: boolean
  enterprise: { id: number; name: string; adress: string; siren: string; tva: string } | null
}>()


const emit = defineEmits<{
  (e: 'close'): void
  (e: 'delete', id: number): void
}>()

const close = () => {
  emit('close')
}

const confirmDelete = () => {
  emit('delete', props.enterprise!.id)
  close()
}
</script>