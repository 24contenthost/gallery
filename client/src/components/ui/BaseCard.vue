<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <Card class="max-w-md mx-auto mt-12">
    <CardHeader v-if="title || description">
      <CardTitle>
        <slot name="title">
          {{ title }}
        </slot>
      </CardTitle>
      <CardDescription v-if="description">{{ description }}</CardDescription>
    </CardHeader>

    <CardContent>
      <slot />
    </CardContent>

    <CardFooter v-if="$slots.footer">
      <slot name="footer" />
    </CardFooter>
  </Card>
</template>
