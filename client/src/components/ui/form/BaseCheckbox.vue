<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const props = defineProps<{
  id: string
  label?: string
  modelValue: boolean
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = (checked: boolean) => {
  emit('update:modelValue', checked)
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <Checkbox
        :id="id"
        :checked="modelValue"
        @update:checked="toggle"
    />
    <Label v-if="label" :for="id" class="cursor-pointer select-none">
      {{ label }}
    </Label>
  </div>
  <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>
</template>
