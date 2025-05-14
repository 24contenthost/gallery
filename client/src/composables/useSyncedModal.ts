import { ref, watchEffect, watch } from "vue"

export const useSyncedModal = (modelValue: () => boolean, emit: (value: boolean) => void) => {
    const isOpen = ref(modelValue())

    watchEffect(() => {
        isOpen.value = modelValue()
    })

    watch(isOpen, (val) => emit(val))

    const open = () => (isOpen.value = true)
    const close = () => (isOpen.value = false)
    const toggle = () => (isOpen.value = !isOpen.value)

    return { isOpen, open, close, toggle }
}
