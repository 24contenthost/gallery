<script setup lang="ts">
import {Image} from "@/types/images.ts";
const props = defineProps<{ image: Image; index: number }>();
</script>

<template>
  <div class="cursor-pointer space-y-2">
    <a :href="image.url" data-fancybox="gallery">
      <div class="aspect-square overflow-hidden rounded border border-gray-300">
        <img
            :src="image.previewUrl"
            alt="Image"
            class="w-full h-full object-cover"
        />
      </div>
    </a>
    <slot name="actions" :image="props.image" />
  </div>
</template>
