<template>
  <!-- Inventory Modal -->
  <div v-if="store.inventoryModalOpen" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black w-80 z-50">
    <div class="bg-gradient-to-r from-black to-gray-600 text-white p-2">Items</div>
    <div class="grid grid-cols-3 gap-2 p-3">
      <div
        v-for="(item, index) in inventoryItems"
        :key="index"
        class="border-2 border-gray-600 p-2 cursor-pointer min-h-[100px]"
        :class="{ 'bg-gray-200': selectedInventoryItem === item }"
        @click="selectInventoryItem(item)"
      >
        <div class="font-bold text-center">
          {{ item.name }}
          <span v-if="item.amount" class="text-xs text-gray-600"> (x{{ item.amount }})</span>
        </div>
        <div class="text-xs text-gray-600 text-center mt-1">
          {{ item.description }}
        </div>
      </div>
    </div>
    <div class="flex border-t border-gray-400">
      <button class="flex-1 p-2 hover:bg-gray-100" @click="toggleInventory">Close</button>
      <button class="flex-1 p-2 border-r border-gray-400 hover:bg-gray-100" @click="useItem">Use</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useMainStore } from "../stores/store"
import { toggleInventory } from "../lib/methods"
const store = useMainStore()

// have 9 items, even if empty
const inventoryItems = ref([
  { name: "Potion", amount: 4, stats: "+50 Health", description: "Drink to heal 50 health." },
  { name: "Torch", amount: 2, stats: "+3 Light", description: "Light up the area for 5 minutes." },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
])

function selectInventoryItem(item) {
  store.selectedInventoryItem = item
}

function useItem() {
  console.log("Using item:", store.selectedInventoryItem)
}
</script>
