<script setup lang="ts">
import { ref, watch } from "vue"
import { useFormRequest } from "@/composables/useFormRequest"
import { accountImagesService } from "@/services/accountImages"
import type { UploadImagesData, Image } from "@/types/images"

import BaseModal from "@/components/ui/BaseModal.vue"
import { Button } from "@/components/ui/button"

const open = defineModel<boolean>("open", { required: true })

const emit = defineEmits<{
  (e: "uploaded"): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFiles = ref<File[]>([])
const previewFiles = ref<{ name: string; preview: string }[]>([])
const errorMessage = ref<string | null>(null)

const { isLoading: isSubmitting, submit } = useFormRequest<UploadImagesData, Image[]>(
    accountImagesService.uploadImages,
    {
      onSuccess: () => {
        resetState()
        emit("uploaded")
        open.value = false
      }
    }
)

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files) return

  const files = Array.from(input.files).filter(file => file.type.startsWith("image/"))
  if (files.length === 0) {
    errorMessage.value = "No valid image files selected."
    return
  }

  selectedFiles.value.push(...files)
  errorMessage.value = null

  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (!e.target?.result) return
      previewFiles.value.push({ name: file.name, preview: e.target.result as string })
    }
    reader.readAsDataURL(file)
  })
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
  previewFiles.value.splice(index, 1)
}

const handleUpload = () => {
  if (!selectedFiles.value.length) {
    errorMessage.value = "No files selected. Please choose files to upload."
    return
  }

  submit({ images: selectedFiles.value })
}

const resetState = () => {
  selectedFiles.value = []
  previewFiles.value = []
  errorMessage.value = null
}

const handleCancel = () => {
  resetState()
  open.value = false
}

watch(() => open.value, (val) => {
  if (!val) resetState()
})
</script>

<template>
  <BaseModal v-model:open="open">
    <template #title>
      Upload Images
    </template>

    <div class="space-y-4">
      <button
          type="button"
          class="w-full border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-600 py-4 px-6 rounded text-center text-sm"
          @click="fileInput?.click()"
      >
        <span class="font-medium">Click to select images</span>
        <p class="mt-1 text-xs text-gray-500">
          JPG, PNG, GIF. Must comply with our
          <a href="#" class="text-blue-500 underline">content policy</a>.
        </p>
      </button>

      <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/*"
          class="hidden"
          @change="handleFileSelect"
      />

      <div
          v-if="previewFiles.length"
          class="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto border-t pt-4"
      >
        <div v-for="(file, index) in previewFiles" :key="index" class="flex flex-col items-center">
          <img :src="file.preview" alt="preview" class="w-full h-24 object-cover rounded" />
          <button
              type="button"
              @click="removeFile(index)"
              class="text-red-600 text-sm mt-1"
          >
            Remove
          </button>
        </div>
      </div>

      <div v-if="errorMessage" class="text-red-500 text-sm">
        {{ errorMessage }}
      </div>
    </div>

    <template #footer>
      <Button variant="outline" @click="handleCancel">Cancel</Button>
      <Button :disabled="!selectedFiles.length" :loading="isSubmitting" @click="handleUpload">
        Upload Images
      </Button>
    </template>
  </BaseModal>
</template>
