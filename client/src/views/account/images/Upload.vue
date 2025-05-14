<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useFormRequest} from "../../../composables/useFormRequest.ts";

import {Image, UploadImagesData} from "../../../types/images.ts";
import {accountImagesService} from "../../../services/accountImages.ts";

const router = useRouter();

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFiles = ref<File[]>([]);
const previewFiles = ref<{ name: string; preview: string }[]>([]);
const errorMessage = ref<string | null>(null);

const { isLoading: uploadLoading, submit } = useFormRequest<UploadImagesData, Image[]>(
    accountImagesService.uploadImages,
    {
      onSuccess: () => {
        selectedFiles.value = [];
        previewFiles.value = [];
        errorMessage.value = null;
        router.push(`/account/images`);
      }
    }
);

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files) return;

  const files = Array.from(input.files).filter(file => file.type.startsWith("image/"));
  if (files.length) {
    selectedFiles.value = files;
    previewFiles.value = [];
    errorMessage.value = null;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target?.result) return;
        previewFiles.value.push({ name: file.name, preview: e.target.result as string });
      };
      reader.readAsDataURL(file);
    });
  } else {
    errorMessage.value = "No valid image files selected.";
  }
};

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
  previewFiles.value.splice(index, 1);
};

const handleUpload = () => {
  if (!selectedFiles.value.length) {
    errorMessage.value = "No files selected. Please choose files to upload.";
    return;
  }

  submit({
    images: selectedFiles.value
  });
};
</script>

<template>
  <div class="p-4 flex flex-col items-center space-y-6 w-full">

      <h1 class="text-2xl font-bold">Upload Images</h1>



    <button class="flex flex-col items-center border-2 border-blue-500 p-6 rounded-lg w-full max-w-md bg-blue-50 hover:bg-blue-100 transition" @click="fileInput?.click()">
      <i class="fa fa-upload text-4xl text-blue-500"></i>
      <span class="text-gray-600 mt-2">Click to select images</span>
      <p class="text-xs text-gray-500 mt-1 text-center">Supported formats: JPG, PNG, GIF. Files must comply with our <a href="#" class="text-blue-500 underline">content policy</a>.</p>
    </button>

    <input ref="fileInput" type="file" multiple accept="image/*" class="hidden" @change="handleFileSelect" />

    <div v-if="previewFiles.length" class="w-full max-w-md border-t pt-4 grid grid-cols-3 gap-4">
      <div v-for="(file, index) in previewFiles" :key="index" class="relative">
        <img :src="file.preview" alt="preview" class="w-full h-24 object-cover rounded" />
        <button class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs" @click="removeFile(index)">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </div>

    <div v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</div>

    <button v-if="selectedFiles.length" class="px-4 py-2 bg-blue-500 text-white rounded text-sm w-full max-w-md hover:bg-blue-600 transition" :disabled="uploadLoading" @click="handleUpload">
      Upload Images
    </button>
  </div>
</template>
