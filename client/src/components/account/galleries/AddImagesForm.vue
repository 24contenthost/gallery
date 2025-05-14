<script setup lang="ts">
import {ref, watchEffect} from "vue"
import {useQuery} from "@/composables/useQuery"
import {useFormRequest} from "@/composables/useFormRequest"
import {accountImagesService} from "@/services/accountImages"
import {accountGalleriesService} from "@/services/accountGalleries"
import {AttachImagesToGalleryData} from "@/types/galleries"
import {Image} from "@/types/images"

import AddImageFormItem from "@/components/account/galleries/AddImageFormItem.vue"
import {Button} from "@/components/ui/button"
import BaseModal from "@/components/ui/BaseModal.vue";

const open = defineModel<boolean>("open", { required: true })

const props = defineProps<{
  galleryId: number
}>()

const emit = defineEmits<{
  (e: "success"): void
}>()

const images = ref<Image[]>([])
const selectedIds = ref<number[]>([])

const { isLoading, query: fetchImages } = useQuery<Image[]>(
    accountImagesService.getImages,
    {
      onSuccess: (fetched) => {
        images.value = fetched
      }
    }
)

const { submit: attachImages, isLoading: isSubmitting } = useFormRequest<AttachImagesToGalleryData, void>(
    accountGalleriesService.attachImagesToGallery,
    {
      onSuccess: () => {
        selectedIds.value = []
        emit("success")
        open.value = false
      }
    }
)

const toggleImage = (imageId: number) => {
  if (selectedIds.value.includes(imageId)) {
    selectedIds.value = selectedIds.value.filter(id => id !== imageId)
  } else {
    selectedIds.value.push(imageId)
  }
}

const handleSubmit = () => {
  if (selectedIds.value.length > 0) {
    attachImages({
      galleryId: props.galleryId,
      imageIds: selectedIds.value
    })
  }
}

const handleCancel = () => {
  selectedIds.value = []
  open.value = false
}

watchEffect(() => {
  if (open.value) fetchImages()
})
</script>

<template>
  <BaseModal v-model:open="open">
    <template #title>
      Add Images to Gallery
    </template>

    <div v-if="isLoading">Loading images...</div>

    <div
        v-else
        class="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto"
    >
      <AddImageFormItem
          v-for="image in images"
          :key="image.id"
          :image="image"
          :selected="selectedIds.includes(image.id)"
          @toggle="toggleImage"
      />
    </div>

    <template #footer>
      <Button variant="outline" @click="handleCancel">Cancel</Button>
      <Button
          :disabled="!selectedIds.length"
          :loading="isSubmitting"
          @click="handleSubmit"
      >
        Add Selected
      </Button>
    </template>
  </BaseModal>
</template>
