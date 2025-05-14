<script setup lang="ts">

import {useAuthStore} from "../../../stores/auth.ts";

import {useField, useForm} from "vee-validate";
import {AccountEditData} from "../../../types/auth.ts";
import {accountEditSchema} from "../../../schemas";
import {applyFormErrors, useFormRequest, ValidationErrors} from "../../../composables/useFormRequest.ts";
import {useRouter} from "vue-router";

const authStore = useAuthStore();

const {handleSubmit, setFieldError, errors} = useForm<AccountEditData>({
  validationSchema: accountEditSchema,
  initialValues: {
    name: authStore.user?.name
  },
});

const {value: name} = useField("name");


const router = useRouter();

const { submit, isLoading } = useFormRequest<AccountEditData>(
    authStore.accountEdit,
    {
      onSuccess: async () =>  {
        console.log("Edit success");
        await router.push({ name: "account" })
      },
      onFormError: (errors: ValidationErrors) => {
        applyFormErrors<AccountEditData>(errors, setFieldError);
      },
    }
);

const onSubmit = handleSubmit(submit);

</script>

<template>
  <div class="w-full max-w-md bg-white border border-gray-200 mx-auto mt-12">
    <div class="p-6 space-y-4">
      <h1 class="font-semibold text-gray-900 text-xl text-center">
        Edit account info
      </h1>
      <form action="#" class="space-y-4" @submit.prevent="onSubmit">
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2" for="name">Your name</label>
          <input
              id="name"
              v-model="name"
              class="w-full border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Name"
              type="text"

          >
          <span v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</span>
        </div>

        <button
            class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            type="submit"
            :disabled="isLoading"
        >
          Save changes
        </button>
      </form>
    </div>
  </div>
</template>

