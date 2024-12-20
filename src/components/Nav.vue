<template>
  <!-- Menu Bar -->
  <div class="bg-white border-b border-t border-black flex text-sm h-5" ref="menuWrapper">
    <div v-for="(menu, menuIndex) in menuItems" :key="menuIndex" class="relative">
      <div
        class="px-2 h-full flex items-center cursor-default select-none"
        :class="{ 'bg-black text-white': menu.dropdownOpen }"
        @click="toggleDropdown(menuIndex)"
      >
        <img v-if="!menu.name" src="../assets/apple.png" alt="Apple" class="w-3 h-3 object-contain" />
        <span v-else>{{ menu.name }}</span>
      </div>

      <!-- Dropdown Menu -->
      <div v-if="menu.dropdownOpen" class="absolute left-0 top-full bg-white border border-black shadow-md z-10 min-w-[120px]">
        <div
          v-for="(item, itemIndex) in menu.items"
          :key="itemIndex"
          class="px-4 text-black hover:bg-black hover:text-white cursor-default"
          @click="handleMenuAction(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <!-- time -->
    <div class="pr-2 h-full flex flex-1 items-center justify-end">
      <span class="text-xs">{{ currentTime }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { onClickOutside } from "@vueuse/core"

const menuItems = ref([
  {
    name: "",
    image: "../assets/apple.png",
    items: ["Save", "Mute", "Quit"],
    dropdownOpen: false,
  },
  {
    name: "BreamWood",
    items: ["Save", "Mute", "Quit"],
    dropdownOpen: false,
  },
  {
    name: "Edit",
    items: ["Character"],
    dropdownOpen: false,
  },
  {
    name: "Help",
    items: ["Credits"],
    dropdownOpen: false,
  },
])

// Create a wrapper ref for the entire menu
const menuWrapper = ref(null)

// Update click outside to use the wrapper
onClickOutside(menuWrapper, () => {
  menuItems.value.forEach((item) => (item.dropdownOpen = false))
})

function toggleDropdown(index) {
  menuItems.value.forEach((item, i) => {
    if (i !== index) item.dropdownOpen = false
  })
  menuItems.value[index].dropdownOpen = !menuItems.value[index].dropdownOpen
}

function handleMenuAction(item) {
  console.log(`Menu action: ${item}`)
}

const currentTime = ref("12:00")

onMounted(() => {
  updateTime() // Initial update
  setInterval(updateTime, 1000) // Update every second
})

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}
</script>
