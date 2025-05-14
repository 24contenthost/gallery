<script lang="ts" setup>

import {Image} from "@/types/images.ts";

const props = defineProps<{
  image: Image;
  selected: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle', imageId: number): void;
}>();

const toggleSelection = () => {
  emit("toggle", props.image.id);
};
</script>

<template>
  <div class="flex flex-col items-center gap-2 border rounded p-2 hover:border-blue-400">
    <div class="aspect-square w-full overflow-hidden rounded border">
      <img :src="image.previewUrl" class="w-full h-full object-cover"/>
    </div>

    <input
        :checked="selected"
        class="w-5 h-5 accent-blue-500"
        type="checkbox"
        @change="toggleSelection"
    />
  </div>
</template>
