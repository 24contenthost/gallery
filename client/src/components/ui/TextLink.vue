<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>

<template>
  <router-link
      :to="to"
      class="text-primary hover:underline font-medium"
  >
    <slot />
  </router-link>
</template>
