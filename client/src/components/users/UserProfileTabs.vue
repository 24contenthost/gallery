<script lang="ts" setup>
import { computed } from "vue";
import { UserProfileTabs } from "../../constants/userProfileTabs.ts";
import { UserProfile } from "../../types/userProfile.ts";

defineProps<{
  userProfile: UserProfile | null;
  activeTab: UserProfileTabs;
}>();

const tabs = computed(() => [
  { name: "Info", key: UserProfileTabs.Info },
  { name: "Galleries", key: UserProfileTabs.Galleries },
  { name: "Images", key: UserProfileTabs.Images }
]);
</script>

<template>
  <div class="border-b p-4 flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
        <i class="fas fa-user-circle text-4xl"></i>
      </div>
      <div>
        <h1 class="text-xl font-semibold">
          {{ userProfile ? userProfile.name : "User Profile" }}
        </h1>
      </div>
    </div>

    <div class="flex space-x-4">
      <router-link
          v-for="tab in tabs"
          :key="tab.key"
          :to="`/u/${userProfile?.id}/${tab.key}`"
          class="px-4 py-2 font-semibold"
          :class="activeTab === tab.key ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'"
      >
        {{ tab.name }}
      </router-link>
    </div>
  </div>
</template>
