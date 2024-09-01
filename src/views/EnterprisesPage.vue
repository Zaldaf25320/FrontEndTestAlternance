<template>
    <div class="min-h-screen p-6 bg-gray-100">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-black">Enterprise</h1>
        <button @click="logout" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Déconnexion</button>
      </div>
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <tr>
          <th class="py-3 px-6 text-left">Nom</th>
          <th class="py-3 px-6 text-left">Adresse</th>
          <th class="py-3 px-6 text-left">SIREN</th>
          <th class="py-3 px-6 text-left">TVA</th>
          <th class="py-3 px-6 text-right">Actions</th>
        </tr>
        </thead>
        <tbody class="text-gray-600 text-sm">
        <tr v-for="enterprise in enterprises" :key="enterprise.siren" class="border-b border-gray-200 hover:bg-gray-100">
          <td class="py-3 px-6 text-left">{{ enterprise.name }}</td>
          <td class="py-3 px-6 text-left">{{ enterprise.adress }}</td>
          <td class="py-3 px-6 text-left">{{ enterprise.siren }}</td>
          <td class="py-3 px-6 text-left">{{ enterprise.tva }}</td>
          <td class="py-3 px-6 text-right">
            <button @click="openUpdateModal(enterprise)" class="text-blue-500 hover:underline mr-2">Modifier</button>
            <button @click="openDeleteModal(enterprise)" class="text-red-500 hover:underline">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>

      <div class="mt-6">
        <button @click="openAddModal" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Ajouter une entreprise</button>
      </div>
    </div>
  <AddEnterprise
    :show="showAddModal" @close="closeAddModal" @add="addEnterprise"
  />
  <UpdateEnterprise
      :show="showUpdateModal"
      :enterprise="selectedEnterprise"
      @close="closeUpdateModal"
      @update="updateEnterprise"
  />
  <DeleteEnterprise
      :show="showDeleteModal"
      :enterprise="selectedEnterprise"
      @close="closeDeleteModal"
      @delete="deleteEnterprise"
  />
</template>

<script lang="ts" setup>
import AddEnterprise from '../components/AddEnterprise.vue';
import UpdateEnterprise from '../components/UpdateEnterprise.vue'
import DeleteEnterprise from '../components/DeleteEnterprise.vue'
import { ref, onMounted } from 'vue'
import axiosInstance from "../services/axiosIntstance"

const enterprises = ref<Array<{ id: number; name: string; adress: string; siren: string; tva: string }>>([])
const showAddEnterpriseForm = ref(false)
const siret = ref('')

const showAddModal = ref(false)
const showUpdateModal = ref(false)
const showDeleteModal = ref(false)
const openAddModal = () => {
  showAddModal.value = true
};
const closeAddModal = () => {
  showAddModal.value = false
};

const selectedEnterprise = ref<typeof enterprises.value[0] | null>(null)

const openUpdateModal = (enterprise: typeof enterprises.value[0]) => {
  selectedEnterprise.value = enterprise;
  showUpdateModal.value = true
};

const closeUpdateModal = () => {
  showUpdateModal.value = false
};

const openDeleteModal = (enterprise: typeof enterprises.value[0]) => {
  selectedEnterprise.value = enterprise
  showDeleteModal.value = true
};

const closeDeleteModal = () => {
  showDeleteModal.value = false
};
const fetchEnterprises = async () => {
  try {
    const response = await axiosInstance.get('/user/enterprises')
    enterprises.value = response.data
  } catch (error: any) {
    alert('Erreur a trouvé les entreprises: ' + error.message)
  }
}


const addEnterprise = async (enterprise: { siret: number | null }) => {
  try {
    const response = await axiosInstance.post('/enterprise/register', {
      siret: enterprise.siret,
    })
    const newEnterprise = response.data.enterprise
    enterprises.value.push(newEnterprise)
    showAddEnterpriseForm.value = false
    enterprise.siret = null
  } catch (error: any) {
    alert('Erreur ajout entreprise: ' + error.message)
  }
}

const updateEnterprise = async (updatedEnterprise: { id: number; name: string; adress: string; siren: string; tva: string }) => {
  try {
    const response = await axiosInstance.put(`/enterprise/${updatedEnterprise.id}`, updatedEnterprise)
    const index = enterprises.value.findIndex(e => e.id === updatedEnterprise.id)
    if (index !== -1) {
      enterprises.value[index] = response.data.enterprise
    }
    closeUpdateModal()
  } catch (error: any) {
    alert('Erreur modification entreprise: ' + error.message)
  }
}
const deleteEnterprise = async (id: number) => {
  try {
    await axiosInstance.delete(`/enterprise/${id}`)
    enterprises.value = enterprises.value.filter(enterprise => enterprise.id !== id)
  } catch (error: any) {
    alert('Erreur supprimer entreprise: ' + error.message)
  }
  closeDeleteModal()
}

const logout = () => {
  window.location.href = '/';
};


onMounted(fetchEnterprises)
</script>