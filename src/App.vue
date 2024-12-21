<template>
  <div
    class="h-[100dvh] min-w-[333px] grid grid-rows-[auto_1fr] fixed inset-0 bg-repeat image-pixelated [image-rendering:pixelated]"
    :style="{ backgroundImage: 'url(' + bgImage + ')', backgroundSize: '6px' }"
  >
    <Nav class="w-full" />

    <div v-if="!store.newGame" class="max-w-[600px] max-h-[760px] grid grid-rows-[auto_1fr_auto] gap-1 p-1 mx-auto w-full justify-self-center">
      <Stats />
      <Map />
      <Character />
    </div>
    <ModalNewGame v-if="store.newGame && store.appOpen" />

    <!-- Game icon on desktop -->
    <div class="absolute z-[-1] top-[12%] right-[45%]" @click="handleClick" ref="iconRef">
      <div class="flex flex-col cursor-pointer justify-center items-center">
        <img class="w-10 h-10 object-contain" :class="{ 'bg-blue-700 bg-opacity-50': appIconSelected }" src="./assets/appIcon.png" alt="" />
        <span class="bg-white px-1 mt-1" :class="{ '!bg-blue-700': appIconSelected }" style="line-height: 1">BreamWood</span>
      </div>
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
        <button class="flex-1 p-2 hover:bg-gray-100" @click="toggleEquipment">Close</button>
        <button class="flex-1 p-2 border-r border-gray-400 hover:bg-gray-100" @click="equipItem">Equip</button>
      </div>
    </div>

    <ModalItems />
    <DialogBox
      v-model="showDialog"
      title="Alert"
      message="Are you sure you want to continue?"
      :buttons="[
        {
          label: 'Cancel',
          onClick: () => handleCancel(),
        },
        {
          label: 'OK',
          primary: true,
          onClick: () => handleOK(),
        },
      ]"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, resolveTransitionHooks } from "vue"
import Nav from "./components/Nav.vue"
import Map from "./components/Map.vue"
import ModalNewGame from "./components/ModalNewGame.vue"
import Stats from "./components/Stats.vue"
import Character from "./components/Character.vue"
import DialogBox from "./components/DialogBox.vue"
import { toggleEquipment } from "./lib/methods"
import { useMainStore } from "./stores/store"
import ModalItems from "./components/ModalItems.vue"
import bgImage from "./assets/mac-bg.jpg"
import { onClickOutside } from "@vueuse/core"
const store = useMainStore()

const showDialog = ref(false)
const appIconSelected = ref(false)

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

const lastClickTime = ref(0)
const DOUBLE_CLICK_DELAY = 300 // milliseconds

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

const handleClick = () => {
  if (!store.newGame) return

  const currentTime = Date.now()
  const timeDiff = currentTime - lastClickTime.value

  if (timeDiff < DOUBLE_CLICK_DELAY) {
    // Double click detected
    appIconSelected.value = false
    store.appOpen = true
  } else {
    // Single click
    appIconSelected.value = true
  }

  lastClickTime.value = currentTime
}

const iconRef = ref(null)

onClickOutside(iconRef, () => {
  appIconSelected.value = false
})
</script>
