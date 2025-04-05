<script lang="ts" setup>
</script>


<template>
  <div class="w-full max-w-md bg-white border border-gray-200 mx-auto mt-12">
    <div class="p-6 space-y-6 text-center">
      <h1 class="font-semibold text-gray-900 text-3xl">
        Welcome to Our Website
      </h1>
      <p class="text-gray-600 text-sm">
        This is a placeholder for the main content. Stay tuned for exciting features and updates coming soon. We are working hard to bring you the best experience.
      </p>

      <div class="text-sm font-light text-gray-600">
        Don’t have an account yet?
      </div>
      <div class="flex justify-between gap-4">
        <router-link
            to="/register"
            class="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 text-center"
        >
          Sign up
        </router-link>
        <router-link
            to="/login"
            class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 text-center"
        >
          Log in
        </router-link>
      </div>
    </div>
  </div>
</template>
