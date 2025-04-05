<script lang="ts" setup>
import {useAuthStore} from "../stores/auth.ts";
import {useRouter} from "vue-router";
import {RegisterData} from "../types/auth.ts";
import {useField, useForm} from "vee-validate";
import {registerSchema} from "../schemas";
import {applyFormErrors, useFormRequest, ValidationErrors} from "../composables/useFormRequest.ts";


const {handleSubmit, errors, setFieldError} = useForm<RegisterData>({
  validationSchema: registerSchema,
  initialValues: {
    name: "htchtc052",
    email: "htchtc052+1@gmail.com",
    password: "12301230",
    password_confirmation: "12301230"
  },
});


const {value: name} = useField("name");
const {value: email} = useField("email");
const {value: password} = useField("password");
const {value: password_confirmation} = useField("password_confirmation");


const authStore = useAuthStore();
const router = useRouter();

const { submit, isLoading } = useFormRequest<RegisterData>(
    authStore.register,
    {
      onSuccess: () => router.push("/account"),
      onFormError: (errors: ValidationErrors) => {
        applyFormErrors<RegisterData>(errors, setFieldError);
      },
    }
);

const onSubmit = handleSubmit(submit);



</script>

<template>
  <div class="w-full max-w-md bg-white border border-gray-200 mx-auto mt-12">
    <div class="p-6 space-y-4">
      <h1 class="font-semibold text-gray-900 text-xl text-center">
        Create an account
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

        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2" for="email">Your email</label>
          <input
              id="email"
              v-model="email"
              class="w-full border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@company.com"
              type="text"

          >
          <span v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</span>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2" for="password">Password</label>
          <input
              id="password"
              v-model="password"
              class="w-full border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              type="password"

          >
          <span v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</span>
        </div>

        <!-- Повтор пароля -->
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2" for="confirm_password">Confirm
            password</label>
          <input
              id="password_confirmation"
              v-model="password_confirmation"
              class="w-full border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              type="password"

          >
          <span v-if="errors.password_confirmation"
                class="text-red-600 text-sm mt-1">{{ errors.password_confirmation }}</span>

        </div>

        <button
            :disabled="isLoading"
            class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            type="submit"
        >
          Sign up
        </button>
      </form>

      <p class="text-sm font-light text-gray-600">
        Already have an account?
        <router-link :to="{ name: 'login' }" class="font-medium text-blue-500 hover:underline">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>
