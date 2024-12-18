<template>
  <div class="bg-white text-black text-center py-[0.5px] hide-on-short">
    <div class="flex items-center gap-2 h-4 p-[0.5px]">
      <div style="background-image: url(&quot;/src/assets/titlebar-bg.jpg&quot;)" class="flex-1 h-full bg-repeat-x bg-contain image-pixelated"></div>
      <span>{{ props.title }}</span>
      <div style="background-image: url(&quot;/src/assets/titlebar-bg.jpg&quot;)" class="flex-1 h-full bg-repeat-x bg-contain image-pixelated"></div>
    </div>
  </div>
</template>
<script setup>
// import props of "title"
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
