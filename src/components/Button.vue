<template>
  <button
    @click="!props.disabled && props.onClick()"
    class="active:bg-black bg-white text-black active:text-white py-1 px-4 rounded-md border border-black justify-center normal-line-height"
    :disabled="props.disabled"
    :class="[
      { 'outline outline-[3px] outline-offset-1 outline-black': props.highlight },
      { ' active:bg-white text-gray-400 active:!text-gray-400': props.disabled },
    ]"
  >
    {{ props.text }}
  </button>
</template>
<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "Use",
  },
  onClick: {
    type: Function,
    default: () => {},
  },
  highlight: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
