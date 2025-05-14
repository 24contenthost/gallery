<script lang="ts" setup>
import { useField, useForm } from "vee-validate"
import { useRouter } from "vue-router"

import type { LoginData } from "@/types/auth.ts"
import { loginSchema } from "@/schemas"
import { useAuthStore } from "@/stores/auth.ts"
import { useFormRequest, applyFormErrors, ValidationErrors } from "@/composables/useFormRequest.ts"

import BaseInput from "@/components/ui/form/BaseInput.vue"
import BaseButton from "@/components/ui/form/BaseButton.vue"
import BaseCard from "@/components/ui/BaseCard.vue"
import TextLink from "@/components/ui/TextLink.vue";

const authStore = useAuthStore()
const router = useRouter()

const { handleSubmit, errors, setFieldError } = useForm<LoginData>({
  validationSchema: loginSchema,
  initialValues: {
    email: "htchtc052@gmail.com",
    password: "12301230"
  }
})

const { value: email } = useField<string>("email")
const { value: password } = useField<string>("password")

const { submit, isLoading } = useFormRequest<LoginData>(
    authStore.login,
    {
      onSuccess: () => router.push({ name: "account" }),
      onFormError: (errs: ValidationErrors) => {
        applyFormErrors<LoginData>(errs, setFieldError)
      }
    }
)

const onSubmit = handleSubmit(submit)
</script>

<template>
  <BaseCard>
    <template #title>
      <h1 class="text-xl font-semibold text-center">Sign in to your account</h1>
    </template>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <BaseInput
          name="email"
          label="Email"
          v-model="email"
          :error="errors.email"
          variant="email"
          placeholder="you@example.com"
      />

      <BaseInput
          name="password"
          label="Password"
          v-model="password"
          :error="errors.password"
          variant="password"
          placeholder="••••••••"
      />

      <BaseButton type="submit" :isLoading="isLoading" class="w-full">
        Sign in
      </BaseButton>
    </form>

    <template #footer>
      <div class="text-sm text-muted-foreground text-center space-y-1">
        <p>
          Don’t have an account yet?
          <TextLink to="/auth/register">Sign up</TextLink>
        </p>
        <p>
          Forgot your password?
          <TextLink to="/auth/forgot-password">Reset it</TextLink>
        </p>
      </div>
    </template>

  </BaseCard>
</template>
