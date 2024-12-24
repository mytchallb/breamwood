<template>
  <div class="bg-white text-black text-center py-[0.5px]" :class="{ 'hide-on-short': props.hideOnShort }">
    <div class="flex items-center gap-2 h-4 p-[0.5px]">
      <div :style="{ backgroundImage: `url(${titlebarBg})` }" class="flex-1 h-full bg-repeat-x bg-contain image-pixelated"></div>
      <span>{{ props.title }}</span>
      <div :style="{ backgroundImage: `url(${titlebarBg})` }" class="flex-1 h-full bg-repeat-x bg-contain image-pixelated"></div>
    </div>
  </div>
</template>
<script setup>
import titlebarBg from "@/assets/titlebar-bg.jpg"

// import props of "title"
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  hideOnShort: {
    type: Boolean,
    default: false,
  },
})
</script>
