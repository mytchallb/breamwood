<template>
  <div class="modal-message">
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String,
})
</script>
