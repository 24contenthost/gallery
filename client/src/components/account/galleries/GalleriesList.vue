<script setup lang="ts">
import type { Gallery } from "@/types/galleries"
import GalleryItem from "./GalleryItem.vue"

const props = defineProps<{
  galleries: Gallery[]
}>()

const emit = defineEmits<{
  (e: "delete", galleryId: number): void
}>()

const handleDelete = (galleryId: number) => {
  emit("delete", galleryId)
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <GalleryItem
        v-for="gallery in galleries"
        :key="gallery.id"
        :gallery="gallery"
        @delete="handleDelete"
    />
  </div>
</template>
