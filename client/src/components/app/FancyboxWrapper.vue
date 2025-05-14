<script setup lang="ts">
import { onMounted, onUpdated, onUnmounted, ref } from "vue";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const container = ref<HTMLElement | null>(null);

const initFancybox = () => {
  if (container.value) {
    Fancybox.bind(container.value, "[data-fancybox='gallery']", {
      Thumbs: false,
      Wheel: "slide",
      Toolbar: true,
      loop: true,
    });
  }
};

onMounted(initFancybox);

onUpdated(() => {
  Fancybox.unbind(container.value);
  Fancybox.close();
  initFancybox();
});

onUnmounted(() => {
  Fancybox.destroy();
});
</script>

<template>
  <div ref="container">
    <slot></slot>
  </div>
</template>
