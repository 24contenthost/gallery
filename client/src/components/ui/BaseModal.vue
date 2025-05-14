<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

import { useSyncedModal } from "@/composables/useSyncedModal"

const open = defineModel<boolean>("open", { required: true })

const { isOpen } = useSyncedModal(
    () => open.value,
    (val) => (open.value = val)
)
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          <slot name="title" />
        </DialogTitle>

        <DialogDescription v-if="$slots.description">
          <slot name="description" />
        </DialogDescription>
      </DialogHeader>

      <div class="py-2 space-y-4 max-h-[70vh] overflow-y-auto">
        <slot />
      </div>

      <DialogFooter v-if="$slots.footer" class="flex justify-end gap-2 pt-4">
        <slot name="footer" />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
