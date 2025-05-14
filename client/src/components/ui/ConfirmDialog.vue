<script setup lang="ts">
import {Button} from "@/components/ui/button"
import BaseModal from "@/components/ui/BaseModal.vue";

const open = defineModel<boolean>("open", { required: true })

const emit = defineEmits<{ (event: "confirm"): void }>()

const confirm = () => {
  emit("confirm")
  open.value = false
}
</script>

<template>
  <BaseModal v-model:open="open">
    <template #title>
      <slot name="title">Are you sure?</slot>
    </template>

    <template #description v-if="$slots.description">
      <slot name="description" />
    </template>

    <slot />

    <template #footer>
      <slot name="footer">
        <Button variant="outline" class="min-h-[42px]" @click="open = false">
          Cancel
        </Button>
        <Button variant="destructive" class="min-h-[42px]" @click="confirm">
          Confirm
        </Button>
      </slot>
    </template>
  </BaseModal>
</template>
