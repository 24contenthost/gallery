<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { Gallery } from "../../../types/galleries.ts";
import ConfirmDialogModal from "../../ConfirmDialogModal.vue";

const props = defineProps<{ gallery: Gallery }>();
const emit = defineEmits<{ (event: "delete", id: number): void }>();

const isDeleteModalOpen = ref(false);
const openDeleteModal = () => (isDeleteModalOpen.value = true);
const confirmDelete = () => {
  emit("delete", props.gallery.id);
};
</script>

<template>
  <li class="p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
    <router-link
        :to="{ name: 'account-gallery-detail', params: { id: props.gallery.id } }"
        class="text-lg font-semibold text-blue-600 hover:underline"
    >
      {{ props.gallery.name }}
    </router-link>
    <p class="text-sm text-gray-500 mt-1">Created at: {{ new Date(props.gallery.createdAt).toLocaleString() }}</p>

    <div v-if="props.gallery.images?.length" class="mt-2">
      <h4 class="text-md font-medium text-gray-700">Images:</h4>
      <ul class="flex space-x-2 mt-1">
        <li v-for="image in props.gallery.images" :key="image.id">
          <img :src="image.previewUrl" class="w-20 h-20 object-cover rounded-md border border-gray-300" />
        </li>
      </ul>
    </div>

    <div class="flex space-x-2 mt-4">
      <router-link
          :to="{ name: 'account-gallery-manage-images', params: { id: props.gallery.id } }"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Manage Images
      </router-link>

      <button
          @click="openDeleteModal"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Delete
      </button>
    </div>

    <ConfirmDialogModal v-model="isDeleteModalOpen" @confirm="confirmDelete">
      Are you sure you want to delete <strong>{{ props.gallery.name }}</strong>?
    </ConfirmDialogModal>
  </li>
</template>
