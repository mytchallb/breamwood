<template>
  <!-- Inventory Modal -->
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
  <div class="z-50 w-80 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div class="dialog-box px-2 py-1 mx-auto mb-4 bg-[#bcbcbc]" :class="{ 'opacity-0': !store.selectedInventoryItem }">
      <div class="flex justify-between">
        <div class="flex flex-col w-2/3">
          <span class="text-lg">{{ store.selectedInventoryItem?.name }}</span>
          <span class="text-sm leading-[1.1]">{{ store.selectedInventoryItem?.description }}</span>
        </div>
        <div class="flex flex-col w-1/3">
          <span class="text">DAMAGE {{ store.selectedInventoryItem?.damage }}</span>
          <span class="text">SPEED {{ store.selectedInventoryItem?.speed }}</span>
          <span class="text">WEIGHT {{ store.selectedInventoryItem?.weight }}kg</span>
        </div>
      </div>
    </div>
    <div class="dialog-box mx-auto bg-[#bcbcbc] z-50">
      <div class="grid grid-cols-3 gap-2 p-3">
        <div
          v-for="i in Array.from({ length: 9 }, (_, i) => i)"
          :key="i"
          class="flex items-center flex-col cursor-pointer min-h-[80px] aspect-square overflow-y-auto"
          :class="{
            'border-2 border-black ': currentItems[i],
            'border-2 border-dotted border-black !bg-transparent ': !currentItems[i],
            'border-4 border-green-500': store.player.equippedWeapon === currentItems[i],
          }"
          @click="currentItems[i] && selectInventoryItem(currentItems[i])"
        >
          <template v-if="currentItems[i]">
            <img :src="currentItems[i].image" alt="" class="w-full h-full object-cover" />
          </template>
        </div>
      </div>

      <div>
        <div class="bg-white m-2 text-black flex justify-around bevel-border-reverse">
          <span
            v-for="tab in ['Weapons', 'Armor', 'Items']"
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
        <div class="flex gap-2">
          <template v-if="activeTab === 'Items'">
            <Button text="Use" :onClick="useItem" :disabled="!store.selectedInventoryItem || activeTab !== 'Items'" />
            <Button text="Drop" :onClick="dropItem" :disabled="!store.selectedInventoryItem || activeTab !== 'Items'" />
          </template>
          <template v-else>
            <Button
              :text="store.player.equippedWeapon && store.player.equippedWeapon === store.selectedInventoryItem ? 'Unequip' : 'Equip'"
              :onClick="toggleEquip"
              :disabled="!store.selectedInventoryItem"
            />
          </template>
        </div>
        <Button text="Close" :onClick="toggleInventory" :highlight="true" />
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

const activeTab = ref("Weapons")
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
  console.log("selectInventoryItem", item)
  console.log("store.selectedInventoryItem", store.selectedInventoryItem)
  if (store.selectedInventoryItem?.uid === item.uid) {
    store.selectedInventoryItem = null // Deselect if clicking the same item
  } else {
    store.selectedInventoryItem = item // Select the new item
  }
}

function toggleEquip() {
  if (store.player.equippedWeapon === store.selectedInventoryItem) {
    store.player.equippedWeapon = null
    store.selectedInventoryItem = null
  } else {
    store.player.equippedWeapon = store.selectedInventoryItem
  }
}

function useItem() {
  console.log("Using item:", store.selectedInventoryItem)
}

function dropItem() {
  if (!store.selectedInventoryItem) return

  const itemArray = activeTab.value.toLowerCase()
  const index = store.player[itemArray].findIndex((item) => item.uid === store.selectedInventoryItem.uid)

  if (index !== -1) {
    store.player[itemArray].splice(index, 1)
    store.selectedInventoryItem = null
  }
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
