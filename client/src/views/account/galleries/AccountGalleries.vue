<script setup lang="ts">
import { onMounted, ref } from "vue"
import {Gallery, GalleryDeleteData} from "../../../types/galleries.ts";
import {AccountTabsLabels} from "../../../constants/accountTabsLabels.ts";
import GalleryItem from "../../../components/account/galleries/GalleryItem.vue";
import {useFormRequest} from "../../../composables/useFormRequest.ts";
import {useQuery} from "../../../composables/useQuery.ts";
import AccountTabs from "../../../components/users/AccountTabs.vue";
import {accountGalleriesService} from "../../../services/accountGalleries.ts";


const galleries = ref<Gallery[]>([])

const { isLoading, query: getGalleries } = useQuery<Gallery[]>(accountGalleriesService.getGalleries, {
  onSuccess: (fetchedGalleries: Gallery[]) => {
    galleries.value = fetchedGalleries
  }
})

const { submit: deleteGallery } = useFormRequest<GalleryDeleteData, void>(
    accountGalleriesService.deleteGallery,
    {
      onSuccess: (_, inputData) => {
        galleries.value = galleries.value.filter(gallery => gallery.id !== inputData.galleryId)
      }
    }
)

const handleDeleteGallery = (galleryId: number) => {
  deleteGallery({ galleryId })
}

onMounted(() => {
  getGalleries()
})
</script>

<template>


  <div class="p-4">
    <AccountTabs :active-tab="AccountTabsLabels.Galleries" />
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">My Galleries</h1>
      <router-link :to="{ path: '/account/galleries/create' }" class="btn btn-primary">Create New Gallery</router-link>
    </div>

    <div v-if="isLoading">Galleries loading...</div>

    <ul v-else-if="galleries.length" class="gallery-list grid gap-4">
      <GalleryItem
          v-for="gallery in galleries"
          :key="gallery.id"
          :gallery="gallery"
          @delete="handleDeleteGallery"
      />
    </ul>

    <p v-else>No galleries found.</p>
  </div>
</template>
