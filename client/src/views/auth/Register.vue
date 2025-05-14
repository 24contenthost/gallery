<script lang="ts" setup>
import { useRouter } from "vue-router"
import { useField, useForm } from "vee-validate"

import type { RegisterData } from "@/types/auth.ts"
import { registerSchema } from "@/schemas"
import { useAuthStore } from "@/stores/auth.ts"
import { applyFormErrors, useFormRequest, ValidationErrors } from "@/composables/useFormRequest.ts"

import BaseCard from "@/components/ui/BaseCard.vue"
import BaseInput from "@/components/ui/form/BaseInput.vue"
import BaseButton from "@/components/ui/form/BaseButton.vue"
import TextLink from "@/components/ui/TextLink.vue"

const { handleSubmit, errors, setFieldError } = useForm<RegisterData>({
  validationSchema: registerSchema,
  initialValues: {
    name: "htchtc052",
    email: "htchtc052+1@gmail.com",
    password: "12301230",
    password_confirmation: "12301230"
  }
})

const { value: name } = useField<string>("name")
const { value: email } = useField<string>("email")
const { value: password } = useField<string>("password")
const { value: password_confirmation } = useField<string>("password_confirmation")

const authStore = useAuthStore()
const router = useRouter()

const { submit, isLoading } = useFormRequest<RegisterData>(
    authStore.register,
    {
      onSuccess: () =>  router.push({ name: "account" }),
      onFormError: (errors: ValidationErrors) => {
        applyFormErrors<RegisterData>(errors, setFieldError)
      }
    }
)

const onSubmit = handleSubmit(submit)
</script>

<template>
  <BaseCard>
    <template #title>
      <h1 class="text-xl font-semibold text-center">Create an account</h1>
    </template>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <BaseInput
          name="name"
          label="Name"
          v-model="name"
          :error="errors.name"
          placeholder="Your name"
      />

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

      <BaseInput
          name="password_confirmation"
          label="Confirm password"
          v-model="password_confirmation"
          :error="errors.password_confirmation"
          variant="password"
          placeholder="••••••••"
      />

      <BaseButton type="submit" :isLoading="isLoading" class="w-full">
        Sign up
      </BaseButton>
    </form>

    <template #footer>
      <div class="text-sm text-muted-foreground text-center">
        <p>
          Already have an account?
          <TextLink to="/auth/login">Login</TextLink>
        </p>
      </div>
    </template>
  </BaseCard>
</template>
