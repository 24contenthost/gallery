<script lang="ts" setup>
import { nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth.ts";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const router = useRouter();

const logout = async () => {
  await authStore.logout();
  await nextTick();
  await router.push({ name: "login" });
};
</script>

<template>
  <header class="flex justify-between p-4 bg-white shadow">
    <router-link :to="{ path: '/' }" class="text-xl font-semibold text-blue-600">
      Gallery Webapp
    </router-link>

    <nav class="flex items-center space-x-4">
      <template v-if="user && user.id">
        <div class="flex items-center space-x-2">
          <span class="fas fa-user-circle text-blue-800"></span>
          <span>{{ user?.name }}</span>
        </div>

        <router-link :to="{ name: 'account' }" class="text-blue-800 hover:underline">
          Account Info
        </router-link>
<!--        <router-link :to="{ name: 'account-images' }" class="text-blue-800 hover:underline">
          Photos
        </router-link>-->
        <router-link :to="{ name: 'account-galleries' }" class="text-blue-800 hover:underline">
          Galleries
        </router-link>
        <router-link :to="{ path: `/u/${user.id}` }" class="text-blue-800 hover:underline">
          My Public Profile
        </router-link>
        <button class="text-blue-800 hover:underline" @click="logout">
          Logout
        </button>
      </template>

      <template v-else>
        <router-link :to="{ path: '/auth/register' }" class="text-blue-500 hover:underline">
          Register
        </router-link>
        <router-link :to="{ path: '/auth/login' }" class="text-blue-500 hover:underline">
          Login
        </router-link>
      </template>
    </nav>
  </header>
</template>
