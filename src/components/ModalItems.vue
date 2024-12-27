<template>
  <!-- Inventory Modal -->
  <div v-if="store.inventoryModalOpen" class="dialog-box fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#bcbcbc] w-80 z-50">
    <!-- <div class="bg-gradient-to-r from-black to-gray-600 text-white p-2">Items</div> -->

    <div class="grid grid-cols-3 gap-2 p-3">
      <div
        v-for="i in Array.from({ length: 9 }, (_, i) => i)"
        :key="i"
        class="flex items-center flex-col p-1 cursor-pointer min-h-[80px] aspect-square bg-white overflow-y-auto"
        :class="{
          'border-2 border-black': currentItems[i],
          'border-2 border-dotted border-black bg-transparent': !currentItems[i],
          '!bg-black text-white': store.selectedInventoryItem === currentItems[i] && currentItems[i],
        }"
        @click="currentItems[i] && selectInventoryItem(currentItems[i])"
      >
        <template v-if="currentItems[i]">
          <div class="font-bold text-center leading-4 h-[40px] flex items-center justify-center">
            {{ currentItems[i].name }}
          </div>
          <div
            class="text-xs text-center mt-1 leading-1"
            :class="{ 'text-gray-400': store.selectedInventoryItem === currentItems[i], 'text-gray-600': store.selectedInventoryItem !== currentItems[i] }"
          >
            <span class="text-xs leading-3">
              {{ currentItems[i].description }}
            </span>
          </div>
        </template>
      </div>
    </div>

    <div>
      <div class="bg-white m-2 text-black flex justify-around bevel-border-reverse">
        <span
          v-for="tab in ['Items', 'Weapons', 'Armor']"
          :key="tab"
          class="py-1 flex-1 text-center cursor-pointer"
          :class="{ 'bg-gray-400': activeTab === tab }"
          @click="selectTab(tab)"
        >
          {{ tab }}
        </span>
      </div>
    </div>

    <div class="flex justify-between p-4">
      <Button text="Close" :onClick="toggleInventory" :highlight="true" />
      <div class="flex gap-2">
        <Button text="Drop" :onClick="dropItem" />
        <Button text="Use" :onClick="useItem" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, computed } from "vue"
import { useMainStore } from "../stores/store"
import { toggleInventory } from "../lib/methods"
import Button from "./Button.vue"
const store = useMainStore()

const activeTab = ref("Items")
const currentItems = computed(() => {
  switch (activeTab.value) {
    case "Items":
      return store.player.items
    case "Weapons":
      return store.player.weapons
    case "Armor":
      return store.player.armor
    default:
      return []
  }
})

function selectTab(tab) {
  activeTab.value = tab
  store.selectedInventoryItem = null
}

function selectInventoryItem(item) {
  if (store.selectedInventoryItem === item) {
    store.selectedInventoryItem = null
  } else {
    store.selectedInventoryItem = item
  }
}

function useItem() {
  console.log("Using item:", store.selectedInventoryItem)
}

function dropItem() {
  console.log("Dropping item:", store.selectedInventoryItem)
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
