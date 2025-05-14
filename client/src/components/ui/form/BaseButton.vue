<script setup lang="ts">
import { Button } from '@/components/ui/button'

const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'secondary' | 'ghost' | 'outline' | 'destructive'
  disabled?: boolean
  isLoading?: boolean
}>()
</script>

<template>
  <Button
      :type="props.type || 'button'"
      :variant="props.variant || 'default'"
      :disabled="props.disabled || props.isLoading"
  >
    <span
        v-if="props.isLoading"
        class="mr-2 animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
    />
    <slot />
  </Button>
</template>
