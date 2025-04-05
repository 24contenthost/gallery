<script setup lang="ts">
import { ref, onMounted } from "vue";
import {Image} from "../../../types/images.ts";
import {accountImagesService} from "../../../services/accountImages.ts";
import {useFormRequest} from "../../../composables/useFormRequest.ts";
import {AccountTabsLabels} from "../../../constants/accountTabsLabels.ts";
import ImageItem from "../../../components/account/images/ImageItem.vue";
import FancyboxWrapper from "../../../components/galleries/FancyboxWrapper.vue";
import AccountTabs from "../../../components/users/AccountTabs.vue";


const images = ref<Image[]>([]);
const isLoading = ref(false);

const fetchImages = async () => {
  isLoading.value = true;
  images.value = await accountImagesService.getImages();
  isLoading.value = false;
};

const { submit: deleteImage } = useFormRequest<number, void>(

    (imageId: number) => accountImagesService.deleteImage(imageId),
    {
      onSuccess: (_, imageId) => {
        images.value = images.value.filter(img => img.id !== imageId);
      }
    }
);

const handleDeleteImage = (imageId: number) => {
  deleteImage(imageId);
};

onMounted(() => {
  fetchImages();
});
</script>

<template>
  <div class="p-4">
    <AccountTabs :active-tab="AccountTabsLabels.Images" />

    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">My Images</h1>
      <router-link :to="{ path: '/account/images/upload' }" class="btn btn-primary">
        Upload Images
      </router-link>
    </div>

    <div v-if="isLoading">Images loading...</div>

    <FancyboxWrapper v-else>
      <div v-if="images.length" class="grid grid-cols-3 md:grid-cols-4 gap-4">
        <ImageItem
            v-for="(image, index) in images"
            :key="image.id"
            :image="image"
            :index="index"
            @delete="handleDeleteImage"
        />
      </div>
      <p v-else>No images found.</p>
    </FancyboxWrapper>
  </div>
</template>
