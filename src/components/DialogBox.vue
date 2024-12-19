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

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-box {
  position: relative;
  background: white;
  box-shadow:
    0 0 0 1px black,
    /* innermost black */ 0 0 0 2px #9292c5,
    /* inner gray */ 0 0 0 3px #dbdbdc,
    /* middle purple */ 0 0 0 4px #9292c5,
    /* outer gray */ 0 0 0 5px black; /* outermost black */
  min-width: 300px;
  max-width: 80%;
}

.dialog-title-bar {
  background: #000;
  color: white;
  padding: 2px 8px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
}

.dialog-content {
  padding: 16px;
  background: #bcbcbc;
  margin: 1px;
}

.dialog-message {
  margin: 0;
}

.dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px;
  background: #d1d1d1;
}

.dialog-button {
  min-width: 70px;
  padding: 2px 12px;
  background: #bcbcbc;
  border: 1px solid #000;
  border-radius: 2px;
  cursor: pointer;
}

.dialog-button:active {
  background: #a1a1a1;
}

/* Transition animations */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.2s;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
