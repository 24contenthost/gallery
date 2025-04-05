<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const galleryId = Number(route.params.id);


</script>

<template>
  <div class="p-4 space-y-4">
    <h1 class="text-2xl font-semibold">Manage Images for Gallery #{{ galleryId }} !</h1>
    <p class="text-gray-500">This will be the page to add, remove, or organize images inside the gallery.</p>
  </div>
</template>
