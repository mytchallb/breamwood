<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div v-if="modelValue" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="dialog-box p-4 min-w-[300px] max-w-[80%]">
          <!-- Content -->
          <div class="mb-4">
            <p v-if="message">{{ message }}</p>
            <slot></slot>
          </div>

          <!-- Buttons -->
          <div v-if="buttons.length" class="flex justify-end gap-2">
            <button
              v-for="(btn, index) in buttons"
              :key="index"
              class="active:bg-black active:text-white px-4 rounded-md border border-black min-w-[70px] h-[26px] flex items-center justify-center"
              :class="{ 'outline outline-[3px] outline-offset-1 outline-black': btn.primary }"
              @click="handleButtonClick(btn)"
            >
              {{ btn.label }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  buttons: {
    type: Array,
    default: () => [],
    // Example: [{ label: 'OK', primary: true, onClick: () => {} }]
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  closeOnOverlay: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(["update:modelValue"])

const handleButtonClick = (button) => {
  if (button.onClick) {
    button.onClick()
  }
  emit("update:modelValue", false)
}
</script>
