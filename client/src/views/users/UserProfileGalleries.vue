<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { userProfileService } from "../../services/userProfile.ts";
import { useQuery } from "../../composables/useQuery";
import { Gallery } from "../../types/galleries.ts";
import { UserProfile } from "../../types/userProfile.ts";
import UserProfileTabs from "../../components/users/UserProfileTabs.vue";
import { UserProfileTabs as ProfileTabs } from "../../constants/userProfileTabs.ts";

const route = useRoute();
const userId = ref(Number(route.params.id));
const galleries = ref<Gallery[]>([]);
const userProfile = ref<UserProfile | null>(null);
const fetchError = ref<string | null>(null);

const { isLoading, query: getUserGalleries } = useQuery(
    () => userProfileService.getUserProfileGalleries(userId.value),
    {
      onSuccess: (data) => {
        userProfile.value = data.profile;
        galleries.value = data.galleries;
        fetchError.value = null;
      },
      onError: (err: unknown) => {
        fetchError.value = "Failed to fetch galleries";
        console.error(err);
      },
    }
);

onMounted(() => {
  getUserGalleries();
});
</script>

<template>
  <div class="container mx-auto mt-6">
    <UserProfileTabs :userProfile="userProfile" :activeTab="ProfileTabs.Galleries" />

    <div v-if="isLoading" class="flex justify-center items-center h-40">
      <span class="text-gray-500 text-lg">Loading galleries...</span>
    </div>

    <div v-if="fetchError" class="text-center text-red-500 mt-6">
      {{ fetchError }}
    </div>

    <div v-else class="mt-6 px-4">
      <h2 class="text-lg font-semibold mb-4">Galleries</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="gallery in galleries" :key="gallery.id" class="border rounded-lg overflow-hidden shadow-sm">
          <router-link :to="`/galleries/${gallery.id}`">
            <img v-if="gallery?.images?.length" :src="gallery.images[0].previewUrl" class="w-full h-48 object-cover cursor-pointer" />
            <div class="p-2 text-center text-blue-500 hover:underline">{{ gallery.name }}</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>