<script setup lang="ts">
import { computed } from 'vue'
import {AccountTabsLabels} from "../../constants/accountTabsLabels.ts";
import {useAuthStore} from "../../stores/auth.ts";


defineProps<{
  activeTab: AccountTabsLabels
}>()

const auth = useAuthStore()

const tabs = computed(() => [
  { name: 'Images', routeName: AccountTabsLabels.Images },
  { name: 'Galleries', routeName: AccountTabsLabels.Galleries },
  { name: 'Info', routeName: AccountTabsLabels.Info },

])
</script>

<template>
  <div class="border-b p-4 flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
        <i class="fas fa-user-circle text-4xl"></i>
      </div>
      <div>
        <h1 class="text-xl font-semibold">{{ auth.user?.name || 'My Account' }}</h1>
      </div>
    </div>

    <div class="flex space-x-4">
      <router-link
          v-for="tab in tabs"
          :key="tab.routeName"
          :to="{ name: tab.routeName }"
          class="px-4 py-2 font-semibold"
          :class="activeTab === tab.routeName ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'"
      >
        {{ tab.name }}
      </router-link>
    </div>
  </div>
</template>
