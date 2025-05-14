<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { Gallery, GalleryDeleteData } from "@/types/galleries"
import { AccountTabsLabels } from "@/constants/accountTabsLabels"
import AccountTabs from "@/components/users/AccountTabs.vue"
import GalleriesList from "@/components/account/galleries/GalleriesList.vue"
import { useFormRequest } from "@/composables/useFormRequest"
import { useQuery } from "@/composables/useQuery"
import { accountGalleriesService } from "@/services/accountGalleries"

import PageSection from "@/components/ui/PageSection.vue"
import BaseModal from "@/components/ui/BaseModal.vue"
import CreateGalleryForm from "@/components/account/galleries/CreateGalleryForm.vue"

const galleries = ref<Gallery[]>([])
const isCreateOpen = ref(false)

const { isLoading, query: getGalleries } = useQuery(accountGalleriesService.getGalleries, {
  onSuccess: (fetched) => {
    galleries.value = fetched
  }
})

const { submit: deleteGallery } = useFormRequest<GalleryDeleteData, void>(
    accountGalleriesService.deleteGallery,
    {
      onSuccess: (_, inputData) => {
        galleries.value = galleries.value.filter(g => g.id !== inputData.galleryId)
      }
    }
)

const handleDeleteGallery = (galleryId: number) => {
  deleteGallery({ galleryId })
}

const handleGalleryCreated = (newGallery: Gallery) => {
  galleries.value.unshift(newGallery)
  isCreateOpen.value = false
}

onMounted(getGalleries)
</script>

<template>
  <PageSection>
    <AccountTabs :active-tab="AccountTabsLabels.Galleries" />

    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold">My Galleries</h1>
      <button class="btn btn-primary" @click="isCreateOpen = true">
        Create New Gallery
      </button>
    </div>

    <div v-if="isLoading">Galleries loading...</div>

    <GalleriesList
        v-else-if="galleries.length"
        :galleries="galleries"
        @delete="handleDeleteGallery"
    />

    <p v-else>No galleries found.</p>

    <BaseModal v-model:open="isCreateOpen">
      <template #title>Create a new gallery</template>
      <CreateGalleryForm @success="handleGalleryCreated" />
    </BaseModal>
  </PageSection>
</template>
