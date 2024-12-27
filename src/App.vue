<template>
  <div
    class="h-[100dvh] min-w-[333px] grid grid-rows-[auto_1fr] fixed inset-0 bg-repeat image-pixelated [image-rendering:pixelated]"
    :style="{ backgroundImage: 'url(' + bgImage + ')', backgroundSize: '6px' }"
  >
    <Nav class="w-full" />

    <div
      v-if="!store.newGame"
      class="max-w-[600px] grid grid-rows-[auto_1fr_auto] gap-1 p-1 mx-auto w-full justify-self-center"
      style="height: calc(100dvh - 23px); max-height: 760px"
    >
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

    <ModalItems />
    <ModalMessage v-if="store.infoMessage" :message="store.infoMessage" />
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
import ModalMessage from "./components/ModalMessage.vue"
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
