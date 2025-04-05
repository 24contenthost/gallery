<script setup lang="ts">
import { ref } from "vue";

import { Image } from "../../../types/images.ts";
import ConfirmDialogModal from "../../ConfirmDialogModal.vue";

const props = defineProps<{ image: Image; index: number }>();
const emit = defineEmits<{ (event: "delete", id: number): void }>();

const isDeleteModalOpen = ref(false);
const openDeleteModal = () => (isDeleteModalOpen.value = true);
const confirmDelete = () => {
  emit("delete", props.image.id);
};
</script>

<template>
  <div class="relative cursor-pointer">
    <a :href="image.url" data-fancybox="gallery">
      <div class="aspect-square overflow-hidden rounded border border-gray-300">
        <img
            :src="image.previewUrl"
            alt="Image"
            class="w-full h-full object-cover"
        />
      </div>
    </a>

    <button
        @click.stop="openDeleteModal"
        class="absolute top-2 right-2 text-red-600 text-xl"
        title="Delete"
    >
      <i class="fa fa-trash"></i>
    </button>

    <ConfirmDialogModal v-model="isDeleteModalOpen" @confirm="confirmDelete">
      Are you sure you want to delete <strong>{{ props.image.name }}</strong>?
    </ConfirmDialogModal>
  </div>
</template>
