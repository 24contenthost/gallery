<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue"
import { useFormRequest } from "../../composables/useFormRequest.ts"
import { galleriesService } from "../../services/galleries.ts"
import { UploadImagesData, Gallery } from "../../types/galleries.ts"

const props = defineProps<{ galleryId: number }>()
const emit = defineEmits<{
  (event: 'images-uploaded', gallery: Gallery): void
  (event: 'need-closed'): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const previewFiles = ref<{ name: string; preview: string }[]>([])
const uploadableFiles = ref<File[]>([])
const errorMessage = ref<string | null>(null)

const { isLoading: uploadLoading, submit } = useFormRequest<UploadImagesData, Gallery>(
    galleriesService.uploadImages,
    {
      onSuccess: (res) => {
        previewFiles.value = []
        uploadableFiles.value = []
        errorMessage.value = null
        emit("images-uploaded", res)
      }
    }
)

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files) return

  previewFiles.value = []
  uploadableFiles.value = []
  errorMessage.value = null

  Array.from(input.files).forEach((file) => {
    if (!file.type.startsWith("image/")) return

    const reader = new FileReader()
    reader.onload = (e) => {
      if (!e.target?.result) return
      previewFiles.value.push({ name: file.name, preview: e.target.result as string })
      uploadableFiles.value.push(file)
    }
    reader.readAsDataURL(file)
  })
}

const removeFile = (index: number) => {
  previewFiles.value.splice(index, 1)
  uploadableFiles.value.splice(index, 1)
}

const handleUpload = () => {
  if (!uploadableFiles.value.length) {
    errorMessage.value = "No files selected. Please choose files to upload."
    return
  }

  submit({
    galleryId: props.galleryId,
    images: uploadableFiles.value
  })
}
</script>

<template>
  <div class="p-4 flex flex-col items-center space-y-4 w-full">
    <button class="flex flex-col items-center" @click="fileInput?.click()">
      <i class="fa fa-upload text-3xl text-gray-500"></i>
      <span>Upload files</span>
    </button>

    <input ref="fileInput" type="file" multiple accept="image/*" class="hidden" @change="handleFileSelect" />

    <div v-if="previewFiles.length" class="w-full max-h-60 overflow-auto border-t pt-2">
      <div v-for="(fileData, index) in previewFiles" :key="index" class="flex justify-between items-center p-2">
        <img :src="fileData.preview" alt="preview" class="w-10 h-10 rounded" />
        <span class="text-sm truncate">{{ fileData.name }}</span>
        <button class="text-red-500" @click="removeFile(index)">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>

    <div v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</div>

    <button
        class="px-4 py-2 bg-blue-500 text-white rounded text-sm"
        :disabled="uploadLoading"
        @click="handleUpload"
    >
      Upload images
    </button>
  </div>
</template>
