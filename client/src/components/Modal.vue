<script setup lang="ts">
import { useEventListener } from "@vueuse/core";

const isOpen = defineModel<boolean>({ required: true });

const close = () => (isOpen.value = false);

useEventListener("keydown", (event) => {
  if (event.key === "Escape") close();
});
</script>

<template>
  <teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-200" @click.self="close">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-lg">
        <div class="space-y-4">
          <div v-if="$slots.header" class="flex justify-between items-center">
            <slot name="header" />
            <button @click="close" class="text-xl font-bold">&times;</button>
          </div>
          <div v-if="$slots.content">
            <slot name="content" />
          </div>
          <div v-if="$slots.footer" class="text-right">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>