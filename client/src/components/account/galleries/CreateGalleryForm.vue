<script setup lang="ts">
import { useField, useForm } from "vee-validate"
import { galleryCreateSchema } from "@/schemas"
import { Gallery, GalleryCreateData } from "@/types/galleries"
import { useFormRequest } from "@/composables/useFormRequest"
import { accountGalleriesService } from "@/services/accountGalleries"

const emit = defineEmits<{ (e: "success", gallery: Gallery): void }>()

const { handleSubmit, errors } = useForm<GalleryCreateData>({
  validationSchema: galleryCreateSchema,
  initialValues: { name: "" },
})

const { value: name } = useField("name")

const { submit, isLoading } = useFormRequest(
    accountGalleriesService.createGallery,
    {
      onSuccess: (gallery: Gallery) => emit("success", gallery),
    }
)

const onSubmit = handleSubmit(submit)
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-900 mb-2">
        Gallery name
      </label>
      <input
          id="name"
          v-model="name"
          type="text"
          placeholder="My gallery"
          class="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
      />
      <span v-if="errors.name" class="text-red-600 text-sm mt-1">
        {{ errors.name }}
      </span>
    </div>

    <button
        type="submit"
        :disabled="isLoading"
        class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
    >
      Create gallery
    </button>
  </form>
</template>
