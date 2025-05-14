<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useQuery } from "@/composables/useQuery"
import { NotFoundError } from "@/api/apiRequest"
import { DetachImageFromGalleryData, Gallery } from "@/types/galleries"
import { Image } from "@/types/images"
import { accountGalleriesService } from "@/services/accountGalleries"
import { useFormRequest } from "@/composables/useFormRequest"

import ConfirmDialog from "@/components/ui/ConfirmDialog.vue"
import ImageCard from "@/components/ui/ImageCard.vue"
import { Button } from "@/components/ui/button"
import FancyboxWrapper from "@/components/app/FancyboxWrapper.vue"
import AddImagesForm from "@/components/account/galleries/AddImagesForm.vue"

const route = useRoute()
const galleryId = Number(route.params.id)

const notFound = ref(false)
const gallery = ref<Gallery | null>(null)

const imageToDetach = ref<Image | null>(null)
const isDetachModalOpen = ref(false)
const isAddImagesOpen = ref(false)

const openDetachModal = (image: Image) => {
  imageToDetach.value = image
  isDetachModalOpen.value = true
}

const confirmDetach = async () => {
  if (!imageToDetach.value) return
  try {
    await detachImage({
      galleryId,
      imageId: imageToDetach.value.id,
    })
  } catch (err) {
    console.error("[confirmDetach] failed to detach", err)
  }
}

const { isLoading, query: loadGallery } = useQuery<Gallery>(
    () => accountGalleriesService.getGallery(galleryId),
    {
      onSuccess: (fetched) => {
        gallery.value = fetched
      },
      onError: (err) => {
        if (err instanceof NotFoundError) notFound.value = true
      }
    }
)

const { submit: detachImage } = useFormRequest<DetachImageFromGalleryData, void>(
    accountGalleriesService.detachImageFromGallery,
    {
      onSuccess: (_, data) => {
        if (gallery.value) {
          gallery.value.images = gallery.value.images?.filter(img => img.id !== data.imageId) || []
        }
        imageToDetach.value = null
        isDetachModalOpen.value = false
      }
    }
)

const handleImagesAdded = () => {
  loadGallery()
}

onMounted(() => {
  loadGallery()
})
</script>

<template>
  <div v-if="notFound" class="text-red-500">Not found</div>

  <div v-else>
    <div v-if="isLoading">Loading...</div>

    <div v-else-if="gallery">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h1 class="text-xl font-bold">{{ gallery.name }}</h1>
          <p class="text-xs text-gray-400">
            Created at: {{ new Date(gallery.createdAt).toLocaleString() }}
          </p>
        </div>

        <Button variant="default" size="sm" @click="isAddImagesOpen = true">
          Add Images
        </Button>
      </div>

      <FancyboxWrapper>
        <div v-if="gallery.images?.length" class="grid grid-cols-3 md:grid-cols-4 gap-4">
          <ImageCard
              v-for="(image, index) in gallery.images"
              :key="index"
          >
            <a :href="image.url" data-fancybox="gallery">
              <img
                  :src="image.previewUrl"
                  :alt="image.name"
                  class="w-full object-cover"
              />
            </a>

            <template #actions>
              <Button
                  variant="ghost"
                  size="icon"
                  @click="openDetachModal(image)"
                  title="Remove from gallery"
              >
                <i class="fa fa-times-circle text-red-600 text-lg" />
              </Button>
            </template>
          </ImageCard>
        </div>

        <div v-else class="text-gray-400 text-sm italic text-center py-8">
          This gallery doesn't contain any images yet.
        </div>
      </FancyboxWrapper>

      <ConfirmDialog
          v-if="imageToDetach"
          v-model:open="isDetachModalOpen"
          @confirm="confirmDetach"
      >
        Remove
        <span class="text-red-500 font-medium">{{ imageToDetach?.name }}</span>
        from this gallery?
      </ConfirmDialog>

      <AddImagesForm
          v-model:open="isAddImagesOpen"
          :gallery-id="galleryId"
          @success="handleImagesAdded"
      />
    </div>
  </div>
</template>
