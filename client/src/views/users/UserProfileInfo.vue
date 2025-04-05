<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { userProfileService } from "../../services/userProfile.ts";
import { UserProfile } from "../../types/userProfile.ts";
import { useAuthStore } from "../../stores/auth.ts";
import { useQuery } from "../../composables/useQuery";
import UserProfileTabs from "../../components/users/UserProfileTabs.vue";
import { UserProfileTabs as TabsEnum } from "../../constants/userProfileTabs.ts";

const route = useRoute();
const authStore = useAuthStore();

const userId = ref(Number(route.params.id));
const userProfile = ref<UserProfile | null>(null);

const { isLoading, query: getUserProfile } = useQuery<UserProfile>(() => userProfileService.getUserProfile(userId.value), {
  onSuccess: (fetchedProfile: UserProfile) => {
    userProfile.value = fetchedProfile;
  }
});

onMounted(() => {
  getUserProfile();
});

const isOwner = computed(() => authStore.user?.id === userProfile.value?.id);
</script>

<template>
  <div class="container mx-auto mt-10">
    <UserProfileTabs :userProfile="userProfile" :activeTab="TabsEnum.Info" />

    <h1 v-if="!isLoading" class="text-2xl font-semibold text-center mt-4">
      {{ isOwner ? "Your Profile" : `${userProfile?.name}'s Profile` }}
    </h1>

    <div v-if="isLoading" class="flex justify-center items-center h-40">
      <span class="text-gray-500 text-lg">Loading...</span>
    </div>

    <template v-else>
      <div class="mt-4 flex justify-center">
        <i class="fas fa-user-circle text-gray-400 text-6xl"></i>
      </div>

      <div class="text-center mt-2">
        <p class="text-gray-700">User ID: {{ userProfile?.id }}</p>
        <p class="text-gray-500">Joined: {{ userProfile?.created_at }}</p>
      </div>

      <div v-if="isOwner" class="text-center mt-4">
        <router-link to="/account-edit" class="text-blue-500 hover:underline">
          Edit Profile
        </router-link>
      </div>
    </template>
  </div>
</template>
