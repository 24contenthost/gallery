<script setup lang="ts">
import Modal from "./Modal.vue";

const isOpen = defineModel<boolean>({ required: true });
const emit = defineEmits<{ (event: "confirm"): void }>();

const confirm = () => {
  emit("confirm");
  isOpen.value = false;
};
</script>

<template>
  <Modal v-model="isOpen">
    <template #header>
      <h3>Confirm Action</h3>
    </template>
    <template #content>
      <slot />
    </template>
    <template #footer>
      <button @click="isOpen = false" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
      <button @click="confirm" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Confirm</button>
    </template>
  </Modal>
</template>
