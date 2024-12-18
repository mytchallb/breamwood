<template>
  <div
    class="min-h-screen grid grid-rows-[auto_1fr] fixed inset-0 bg-repeat [image-rendering:pixelated]"
    :style="{ backgroundImage: 'url(' + bgImage + ')', backgroundSize: '6px' }"
  >
    <div class="game-container max-w-xl mx-auto w-full grid grid-rows-[auto_auto_1fr_auto] gap-1 h-[100dvh] pb-2">
      <Nav />
      <Stats />
      <Map />
      <Character />
    </div>

    <!-- Overlay -->
    <div v-if="store.isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="closeModals"></div>

    <!-- Equipment Modal -->
    <div v-if="store.equipmentModalOpen" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black w-80 z-50">
      <div class="bg-gradient-to-r from-black to-gray-600 text-white p-2">Equipment</div>
      <div class="grid grid-cols-3 gap-2 p-3">
        <div
          v-for="(item, index) in equipmentItems"
          :key="index"
          class="border-2 border-gray-600 p-2 cursor-pointer"
          :class="{ 'bg-gray-200': selectedEquipmentItem === item }"
          @click="selectEquipmentItem(item)"
        >
          <div class="font-bold text-center">{{ item.name }}</div>
          <div class="text-xs text-gray-600 text-center mt-1">
            {{ item.stats }}
          </div>
        </div>
      </div>
      <div class="flex border-t border-gray-400">
        <button class="flex-1 p-2 border-r border-gray-400 hover:bg-gray-100" @click="equipItem">Equip</button>
        <button class="flex-1 p-2 hover:bg-gray-100" @click="toggleEquipment">Close</button>
      </div>
    </div>

    <ModalItems />
  </div>
</template>

<script setup>
import { ref } from "vue"
import Nav from "./components/Nav.vue"
import Map from "./components/Map.vue"
import Stats from "./components/Stats.vue"
import Character from "./components/Character.vue"

import { toggleEquipment } from "./lib/methods"
import { useMainStore } from "./stores/store"
import ModalItems from "./components/ModalItems.vue"
import bgImage from "./assets/mac-bg.jpg"
const store = useMainStore()

const equipmentItems = ref([
  { name: "Axe", stats: "Dmg: 15-20\nSpd: 1.2s" },
  { name: "Shield", stats: "Def: +5\nBlock: 25%" },
  { name: "Amulet", stats: "HP: +10\nLuck: +2" },
  { name: "Ring", stats: "Def: +2\nStam: +5" },
])

const isModalOpen = ref(false)
const equipmentModalOpen = ref(false)
const inventoryModalOpen = ref(false)
const selectedEquipmentItem = ref(null)

function closeModals() {
  equipmentModalOpen.value = false
  inventoryModalOpen.value = false
  isModalOpen.value = false
}

function selectEquipmentItem(item) {
  selectedEquipmentItem.value = item
}

function equipItem() {
  console.log("Equipping:", selectedEquipmentItem.value)
  closeModals()
}
</script>
