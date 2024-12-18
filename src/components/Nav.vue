<template>
  <!-- Menu Bar -->
  <div class="bg-white border-b-2 border-black flex p-1 text-sm">
    <div class="px-2 py-1 cursor-pointer hover:bg-black hover:text-white flex items-center">
      <img src="../assets/apple.png" alt="Apple" class="w-4 h-4 object-contain translate-y-[-1px]" />
    </div>
    <div v-for="(menu, menuIndex) in menuItems" :key="menuIndex" class="relative group">
      <div class="px-2 py-1 cursor-pointer hover:bg-black hover:text-white" @click="toggleDropdown(menuIndex)">
        {{ menu.name }}
        <div v-if="menu.dropdownOpen" class="absolute top-full left-0 bg-white border-2 border-black shadow-md z-10">
          <div
            v-for="(item, itemIndex) in menu.items"
            :key="itemIndex"
            class="px-2 py-1 text-black hover:bg-black hover:text-white cursor-pointer"
            @click="handleMenuAction(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
const menuItems = ref([
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
function toggleDropdown(index) {
  menuItems.value[index].dropdownOpen = !menuItems.value[index].dropdownOpen
}
function handleMenuAction(item) {
  console.log(`Menu action: ${item}`)
}
</script>
