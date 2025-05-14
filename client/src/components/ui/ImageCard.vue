<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
</script>

<template>
  <Card class="overflow-hidden">
    <CardContent class="p-0">
      <slot />
    </CardContent>

    <CardFooter v-if="$slots.actions" class="justify-end gap-2 px-3 py-2">
      <slot name="actions" />
    </CardFooter>
  </Card>
</template>
