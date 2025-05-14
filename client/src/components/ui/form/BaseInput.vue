<script setup lang="ts">
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Variant = 'default' | 'email' | 'password'

const props = defineProps<{
  name: string
  label?: string
  variant?: Variant
  placeholder?: string
  error?: string
}>()

const modelValue = defineModel<string>()

const inputType = computed(() => {
  switch (props.variant) {
    case 'password':
      return 'password'
    case 'email':
      return 'email'
    default:
      return 'text'
  }
})
</script>

<template>
  <div class="space-y-1">
    <Label v-if="label" :for="name">{{ label }}</Label>
    <Input
        :id="name"
        :name="name"
        :type="inputType"
        :placeholder="placeholder"
        v-model="modelValue"
    />
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>
