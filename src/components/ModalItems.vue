<template>
  <!-- Inventory Modal -->
  <div v-if="store.inventoryModalOpen" class="dialog-box fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#bcbcbc] w-80 z-50">
    <!-- <div class="bg-gradient-to-r from-black to-gray-600 text-white p-2">Items</div> -->

    <div class="grid grid-cols-3 gap-2 p-3">
      <div
        v-for="(item, index) in inventoryItems"
        :key="index"
        class="flex items-center flex-col border-2 border-black p-1 cursor-pointer min-h-[100px] bg-white"
        :class="{ '!bg-black  text-white': store.selectedInventoryItem === item }"
        @click="selectInventoryItem(item)"
      >
        <div class="font-bold text-center leading-4 h-[40px] flex items-center justify-center">
          {{ item.name }}
        </div>
        <div
          class="text-xs text-center mt-1 leading-4"
          :class="{ 'text-gray-400': store.selectedInventoryItem === item, 'text-gray-600': store.selectedInventoryItem !== item }"
        >
          {{ item.description }}
        </div>
      </div>
    </div>
    <div class="flex justify-between p-4">
      <Button text="Close" :onClick="toggleInventory" />
      <Button text="Use" :onClick="useItem" :highlight="true" />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useMainStore } from "../stores/store"
import { toggleInventory } from "../lib/methods"
import WindowBar from "./WindowBar.vue"
import Button from "./Button.vue"
const store = useMainStore()

// have 9 items, even if empty
const inventoryItems = ref([
  { name: "Health Potion", amount: 4, stats: "+20 Health", description: "+20 HP" },
  { name: "Health Potion II", amount: 4, stats: "+50 Health", description: "+50 HP" },
  { name: "Strength Potion", amount: 4, stats: "+10 Health", description: "+10 HP" },
  { name: "Defense Potion", amount: 4, stats: "+10 Health", description: "+10 HP" },
  { name: "Speed Potion", amount: 4, stats: "+10 Health", description: "+10 HP" },
  { name: "Antidote", amount: 4, stats: "+10 Health", description: "+10 HP" },
  { name: "Revival Item", amount: 4, stats: "+10 Health", description: "FULL HP" },
  { name: "Throwing Weapons", amount: 4, stats: "+10 Health", description: "1-20 DMG" },
  { name: "Daggers", amount: 4, stats: "+10 Health", description: "1-20 DMG" },
])

function selectInventoryItem(item) {
  store.selectedInventoryItem = item
}

function useItem() {
  console.log("Using item:", store.selectedInventoryItem)
}

/*

1. Helmet
Armor/Chest
Shield
Main Weapon (Melee)
5. Ranged Weapon (Bow/Crossbow)
Gloves
Boots
Amulet/Necklace
Ring


Items Modal (9 slots)
1. Health Potion (Basic healing)
Super Health Potion (Major healing)
3. Strength Potion (Temporary attack boost)
4. Defense Potion (Temporary defense boost)
Speed Potion (Temporary agility/dodge boost)
6. Antidote (Cure poison)
Revival Item (Resurrect/prevent death)
Throwing Weapons (Daggers/Bombs)
*/
</script>
