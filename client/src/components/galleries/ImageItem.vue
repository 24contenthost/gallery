<script setup lang="ts">
import {ref} from "vue";
import {Image} from "@/types/images.ts";

defineProps<{ image: Image; index: number }>();
//const emit = defineEmits<{ (event: "delete", id: number): void }>();

const isDeleteModalOpen = ref(false);
const openDeleteModal = () => (isDeleteModalOpen.value = true);
// const confirmDelete = () => {
//   emit("delete", props.image.id);
// };
</script>

<template>
  <div class="relative cursor-pointer">
    <a :href="image.url" data-fancybox="gallery">
      <img
          :src="image.previewUrl"
          :width="200"
          :height="150"
          alt="Image"
          class="rounded-sm border border-gray-300"
      />
    </a>

    <button
        @click.stop="openDeleteModal"
        class="absolute top-2 right-2 text-red-600 text-xl"
        title="Delete"
    >
      <i class="fa fa-trash"></i>
    </button>


  </div>
</template>
