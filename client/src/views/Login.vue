<script lang="ts" setup>
import {useField, useForm} from "vee-validate";
import {useAuthStore} from "../stores/auth.ts";
import {loginSchema} from "../schemas";
import type {LoginData} from "../types/auth.ts";
import {applyFormErrors, useFormRequest, ValidationErrors} from "../composables/useFormRequest.ts";
import {useRouter} from "vue-router";

const authStore = useAuthStore();
const router = useRouter()

const { handleSubmit, errors, setFieldError } = useForm<LoginData>({
  validationSchema: loginSchema,
  initialValues: { email: "htchtc052@gmail.com", password: "12301230" },
});

const { value: email } = useField("email");
const { value: password } = useField("password");


const { submit, isLoading } = useFormRequest<LoginData>(
    authStore.login,
    {
      onSuccess: () => router.push("/account"),
      onFormError: (errors: ValidationErrors) => {
        applyFormErrors<LoginData>(errors, setFieldError);
      },
    }
);

const onSubmit = handleSubmit(submit);
</script>

<template>
  <div class="w-full max-w-md bg-white border border-gray-200 mx-auto mt-12">
    <div class="p-6 space-y-4">
      <h1 class="font-semibold text-gray-900 text-xl text-center">
        Sign in to your account
      </h1>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2" for="email">Email</label>
          <input
              id="email"
              v-model="email"
              class="w-full border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@company.com"
              type="text"
          />
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
          />
          <span v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</span>
        </div>

        <button
            class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            type="submit"
            :disabled="isLoading"
        >
          Sign in
        </button>
      </form>

      <p class="text-sm font-light text-gray-600">
        Don’t have an account yet?
        <router-link to="/register" class="font-medium text-blue-500 hover:underline">Sign up</router-link>
      </p>

      <p class="text-sm font-light text-gray-600">
        Forgot your password?
        <router-link to="/forgot-password" class="font-medium text-blue-500 hover:underline">Reset it</router-link>
      </p>
    </div>
  </div>
</template>

<style></style>
