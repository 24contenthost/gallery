<script lang="ts" setup>
import Header from "./components/Header.vue";
import { useAuthStore } from "./stores/auth.ts";
import { onMounted } from "vue";

const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.user) {
    await authStore.getAuthUser();
    console.log("getAuthUser", authStore.user);
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-screen-lg mx-auto p-4">
      <Header />

      <!-- Main content -->
      <main class="mt-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
