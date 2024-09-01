<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Connexion</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
              type="email"
              id="email"
              v-model="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre email"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input
              type="password"
              id="password"
              v-model="password"
              required
              class="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre mot de passe"
          />
        </div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Connexion
        </button>
      </form>
      <p class="mt-6 text-center text-gray-600">
        Vous n'avez pas de compte ?
        <router-link to="/register" class="text-blue-500 hover:underline">Inscrivez-vous ici</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from "../services/authService"

const email = ref<string>('')
const password = ref<string>('')
const router = useRouter()
const login = async () => {
  try {
    await authService.login(email.value, password.value)
    router.push('/enterprises')
  } catch (error: any) {
    console.error('erreur de connexion:', error.response?.data || error.message)
  }
}
</script>