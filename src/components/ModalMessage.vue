<template>
  <div class="fixed inset-0 bg-opacity-50 z-40"></div>
  <div class="dialog-box fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 w-80 z-50">
    <p class="leading-4">{{ message }}</p>
    <div class="flex justify-around mt-8">
      <Button text="OK" :onClick="close" :highlight="true" />
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "../stores/store"
import Button from "./Button.vue"

const store = useMainStore()

const props = defineProps({
  message: String,
})

function close() {
  store.infoMessage = null
}
</script>
