<script setup lang="ts">
import {useField, useForm} from "vee-validate";
import {galleryCreateSchema} from "../../../schemas";
import {Gallery, GalleryCreateData} from "../../../types/galleries.ts";
import {useRouter} from "vue-router";
import {useFormRequest} from "../../../composables/useFormRequest.ts";
import {accountGalleriesService} from "../../../services/accountGalleries.ts";


const { handleSubmit, errors } = useForm<GalleryCreateData>({
  validationSchema: galleryCreateSchema,
  initialValues: { name: "" },
});

const { value: name } = useField("name");
const router = useRouter();



const { submit, isLoading } = useFormRequest(
    accountGalleriesService.createGallery,
    {
      onSuccess: (gallery: Gallery) => router.push({
        name: 'account-gallery-detail',
        params: { id: gallery.id }
      })
    }
);


const onSubmit = handleSubmit(submit);


// const files = ref<File[]>([]);
//
// const onFilesUpdated = (updatedFiles: File[]) => {
//   files.value = updatedFiles;
// };
//
// const onSubmit = handleSubmit(async (values: GalleryCreateData) => {
//   isLoading.value = true;
//   try {
//     const gallery = await galleriesService.createGallery({
//       name: values.name,
//     });
//    return  router.push({
//       name: 'GalleryDetail',
//       params: { id: gallery.id }
//     })
//   } catch (error: unknown) {
//     console.error("Unexpected error:", error);
//   } finally {
//     isLoading.value = false;
//   }
// });
</script>

<template>
  <div class="w-full max-w-md bg-white border border-gray-200 mx-auto mt-12">
    <div class="p-6 space-y-4">
      <h1 class="font-semibold text-gray-900 text-xl text-center">
        Create gallery
      </h1>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2" for="name">
            Name
          </label>
          <input
              id="name"
              v-model="name"
              class="w-full border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Gallery name"
              type="text"
          />
          <span v-if="errors.name" class="text-red-600 text-sm mt-1">
            {{ errors.name }}
          </span>
        </div>

<!--        <div class="flex flex-col items-center">
          <UploadGalleryImages @filesUpdated="onFilesUpdated" />
        </div>-->

        <button
            class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            type="submit"
            :disabled="isLoading"
        >
          Create gallery
        </button>
      </form>
    </div>
  </div>
</template>
