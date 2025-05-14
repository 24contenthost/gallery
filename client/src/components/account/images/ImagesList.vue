<script setup lang="ts">
import { ref } from "vue"
import type { Image } from "@/types/images"
import ImageItem from "./ImageItem.vue"
import FancyboxWrapper from "@/components/app/FancyboxWrapper.vue"
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue"
import { useFormRequest } from "@/composables/useFormRequest"
import { accountImagesService } from "@/services/accountImages"

const props = defineProps<{
  images: Image[]
}>()

const images = ref<Image[]>([...props.images])
const imageToDelete = ref<Image | null>(null)
const isDeleteModalOpen = ref(false)

const { submit: deleteImage } = useFormRequest<number, void>(
    (imageId) => accountImagesService.deleteImage(imageId),
    {
      onSuccess: (_, imageId) => {
        images.value = images.value.filter((img) => img.id !== imageId)
        imageToDelete.value = null
        isDeleteModalOpen.value = false
      }
    }
)

const openDeleteModal = (image: Image) => {
  imageToDelete.value = image
  isDeleteModalOpen.value = true
}

const confirmDelete = () => {
  if (imageToDelete.value) {
    deleteImage(imageToDelete.value.id)
  }
}
</script>

<template>
  <FancyboxWrapper>
    <div v-if="images.length" class="grid grid-cols-3 md:grid-cols-4 gap-4">
      <ImageItem
          v-for="(image, index) in images"
          :key="image.id"
          :image="image"
          :index="index"
      >
        <template #actions="{ image }">
          <button
              @click.stop="openDeleteModal(image)"
              class="text-red-600 text-xl hover:text-red-700"
              title="Delete image"
          >
            <i class="fa fa-trash" />
          </button>
        </template>
      </ImageItem>
    </div>
    <p v-else class="text-sm text-gray-400 text-center py-4">
      No images found.
    </p>
  </FancyboxWrapper>

  <ConfirmDialog
      v-if="imageToDelete"
      v-model:open="isDeleteModalOpen"
      @confirm="confirmDelete"
  >
    Are you sure you want to delete
    <span class="text-red-500 font-medium">{{ imageToDelete.name }}</span>
    from your account?
  </ConfirmDialog>
</template>
