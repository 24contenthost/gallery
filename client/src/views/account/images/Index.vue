<script setup lang="ts">
import { ref, onMounted } from "vue"
import { accountImagesService } from "@/services/accountImages"
import { AccountTabsLabels } from "@/constants/accountTabsLabels"
import type { Image } from "@/types/images"

import AccountTabs from "@/components/users/AccountTabs.vue"
import ImagesList from "@/components/account/images/ImagesList.vue"
import UploadImagesForm from "@/components/account/images/UploadImagesForm.vue"
import PageSection from "@/components/ui/PageSection.vue"
import { Button } from "@/components/ui/button"

const images = ref<Image[]>([])
const isLoading = ref(false)
const isUploadOpen = ref(false)

const fetchImages = async () => {
  isLoading.value = true
  images.value = await accountImagesService.getImages()
  isLoading.value = false
}

const handleUploadSuccess = () => {
  isUploadOpen.value = false
  fetchImages()
}

onMounted(fetchImages)
</script>

<template>
  <PageSection>
    <AccountTabs :active-tab="AccountTabsLabels.Images" />

    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">My Images</h1>
      <Button @click="isUploadOpen = true" class="btn btn-primary">
        Upload Images
      </Button>
    </div>

    <div v-if="isLoading">Images loading...</div>

    <ImagesList
        v-else-if="images.length"
        :images="images"
    />

    <p v-else>No images found.</p>

    <UploadImagesForm
        v-model:open="isUploadOpen"
        @uploaded="handleUploadSuccess"
    />
  </PageSection>
</template>
