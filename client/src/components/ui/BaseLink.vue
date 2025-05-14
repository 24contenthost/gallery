<script setup lang="ts">
import { computed } from "vue"
import { RouterLink, type RouteLocationRaw } from "vue-router"

const props = defineProps<{
  to: RouteLocationRaw
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md'
}>()

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-md text-sm transition-colors'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    ghost: 'text-gray-700 hover:bg-gray-100',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
  }

  const sizes = {
    sm: 'h-8 px-3',
    md: 'h-10 px-4',
  }

  return [base, variants[props.variant || 'default'], sizes[props.size || 'md']]
})
</script>

<template>
  <RouterLink :to="props.to" :class="classes">
    <slot />
  </RouterLink>
</template>
