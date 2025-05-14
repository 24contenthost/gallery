<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {userProfileService} from "../../services/userProfile.ts";
import {UserProfile} from "../../types/userProfile.ts";
import {useQuery} from "../../composables/useQuery";
import UserProfileTabs from "../../components/users/UserProfileTabs.vue";
import {UserProfileTabs as TabsEnum} from "../../constants/userProfileTabs.ts";
import FancyboxWrapper from "../../components/app/FancyboxWrapper.vue";
import {Image} from "@/types/images.ts";


const route = useRoute();

const userId = ref(Number(route.params.id));
const userProfile = ref<UserProfile | null>(null);
const images = ref<Image[]>([]);
const fetchError = ref<string | null>(null);

const { isLoading, query: getUserProfileImages } = useQuery(
    () => userProfileService.getUserProfileImages(userId.value),
    {
      onSuccess: (data) => {
        userProfile.value = data.profile;
        images.value = data.images;
        fetchError.value = null;
      },
      onError: (err: unknown) => {
        fetchError.value = "Failed to fetch images";
        console.error(err);
      },
    }
);

onMounted(() => {
  getUserProfileImages();
});
</script>

<template>
  <div class="container mx-auto mt-10">
    <UserProfileTabs :userProfile="userProfile" :activeTab="TabsEnum.Images" />

    <h1 class="text-2xl font-semibold text-center mt-4">
      {{ userProfile ? `${userProfile.name}'s Photos` : "User Photos" }}
    </h1>

    <div v-if="isLoading" class="flex justify-center items-center h-40">
      <span class="text-gray-500 text-lg">Loading photos...</span>
    </div>

    <div v-if="fetchError" class="text-center text-red-500 mt-6">
      {{ fetchError }}
    </div>

    <div v-else class="mt-6">
      <h2 class="text-xl font-semibold">Photos</h2>
      <FancyboxWrapper>
        <div class="grid grid-cols-3 md:grid-cols-4 gap-4">
          <a v-for="image in images" :key="image.id" :href="image.url" data-fancybox="gallery">
            <img :src="image.previewUrl" class="w-full h-48 object-cover cursor-pointer" />
          </a>
        </div>
      </FancyboxWrapper>
    </div>
  </div>
</template>
