<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "../../../composables/useQuery.ts";
import { NotFoundError } from "../../../api/apiRequest.ts";
import { Gallery } from "../../../types/galleries.ts";
import ImageItem from "../../../components/galleries/ImageItem.vue";
import FancyboxWrapper from "../../../components/galleries/FancyboxWrapper.vue";
import { accountGalleriesService } from "../../../services/accountGalleries.ts";
import { useFormRequest } from "../../../composables/useFormRequest.ts";
import { Image } from "../../../types/images.ts";

const route = useRoute();
const galleryId = Number(route.params.id);
const notFound = ref(false);
const gallery = ref<Gallery | null>(null);
const images = ref<Image[]>([]);

const { isLoading, query: loadGallery } = useQuery<Gallery>(
    () => accountGalleriesService.getGalleryById(galleryId),
    {
      onSuccess: (fetchedGallery) => {
        gallery.value = fetchedGallery;
      },
      onError: (err) => {
        if (err instanceof NotFoundError) notFound.value = true;
      },
    }
);

const { isLoading: isImagesLoading, query: loadImages } = useQuery<Image[]>(
    () => accountGalleriesService.getGalleryImages(galleryId),
    {
      onSuccess: (fetchedImages) => {
        images.value = fetchedImages;
      },
    }
);

const { submit: detachImage } = useFormRequest<<>, void>(
    (imageId: number) => accountGalleriesService.detachImageFromGallery(galleryId, imageId),
    {
      onSuccess: (_, imageId) => {
        images.value = images.value.filter((img) => img.id !== imageId);
      },
    }
);

const handleDetachImage = (imageId: number) => {
  detachImage(imageId);
};

onMounted(() => {
  loadGallery();
  loadImages();
});
</script>

<template>
  <div v-if="notFound" class="text-red-500">Not found</div>

  <div v-else>
    <div v-if="isLoading || isImagesLoading">Loading...</div>
    <div v-else>
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-bold">{{ gallery?.name }}</h1>

        <router-link
            :to="{ name: 'account-gallery-manage-images', params: { id: galleryId } }"
            class="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Manage Images
        </router-link>
      </div>

      <FancyboxWrapper>
        <div class="grid grid-cols-3 md:grid-cols-4 gap-4">
          <ImageItem
              v-for="(image, index) in images"
              :key="image.id"
              :image="image"
              :index="index"
              @delete="handleDetachImage"
          />
        </div>
      </FancyboxWrapper>
    </div>
  </div>
</template>
