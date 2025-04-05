<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue"
import { useFormRequest } from "../../composables/useFormRequest"
import { galleriesService } from "../../services/galleries"
import { UploadImagesData, Gallery } from "../../types/galleries"

const props = defineProps<{ galleryId: number }>()
const emit = defineEmits<{ (event: "images-uploaded", gallery: Gallery): void }>()

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFiles = ref<{ file: File; preview: string }[]>([])

const { isLoading: uploadLoading, submit } = useFormRequest<UploadImagesData, Gallery>(
    galleriesService.uploadImages,
    {
      onSuccess: (res) => {
        selectedFiles.value = []
        emit("images-uploaded", res)
      }
    }
)

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files) return

  selectedFiles.value = []

  Array.from(input.files).forEach((file) => {
    if (!file.type.startsWith("image/")) return

    const reader = new FileReader()
    reader.onload = (e) => {
      if (!e.target?.result) return
      selectedFiles.value.push({ file, preview: e.target.result as string })
    }
    reader.readAsDataURL(file)
  })
}

const removeFile = (index: number) => selectedFiles.value.splice(index, 1)

const handleUpload = () => {
  if (!selectedFiles.value.length) return

  submit({
    galleryId: props.galleryId,
    images: selectedFiles.value.map((f) => f.file)
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

    <div v-if="selectedFiles.length" class="w-full max-h-60 overflow-auto border-t pt-2">
      <div v-for="(fileData, index) in selectedFiles" :key="index" class="flex justify-between items-center p-2">
        <img :src="fileData.preview" alt="preview" class="w-10 h-10 rounded" />
        <span class="text-sm truncate">{{ fileData.file.name }}</span>
        <button class="text-red-500" @click="removeFile(index)">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>

    <button
        class="px-4 py-2 bg-blue-500 text-white rounded text-sm"
        :disabled="uploadLoading || !selectedFiles.length"
        @click="handleUpload"
    >
      Upload images
    </button>
  </div>
</template>
