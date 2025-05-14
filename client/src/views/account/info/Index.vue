<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/stores/auth.ts"
import { AccountTabsLabels } from "@/constants/accountTabsLabels.ts"
import AccountTabs from "@/components/users/AccountTabs.vue"
import BaseCard from "@/components/ui/BaseCard.vue"
import BaseButton from "@/components/ui/form/BaseButton.vue"
import BaseLink from "@/components/ui/BaseLink.vue";

const { user } = storeToRefs(useAuthStore())
</script>

<template>
  <AccountTabs :active-tab="AccountTabsLabels.Info" />

  <BaseCard>
    <template #title>
      <h1 class="text-xl font-semibold text-center">Your account</h1>
    </template>

    <div class="flex justify-center mb-4">
      <i class="fas fa-user-circle text-gray-400 text-6xl" />
    </div>

    <div class="flex justify-between items-start" v-if="user">
      <div class="space-y-3 text-sm text-muted-foreground">
        <p><span class="font-medium text-foreground">Name:</span> {{ user.name }}</p>
        <p><span class="font-medium text-foreground">Email:</span> {{ user.email }}</p>
        <p><span class="font-medium text-foreground">Created:</span> {{ user.created_at }}</p>
        <p><span class="font-medium text-foreground">Updated:</span> {{ user.updated_at }}</p>
      </div>

      <BaseLink :to="{ name: 'account-info-edit' }" variant="outline" size="sm">
        Edit Profile
      </BaseLink>


    </div>
  </BaseCard>
</template>
