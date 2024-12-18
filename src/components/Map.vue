<template>
  <div class="bg-white border-2 mx-2 border-black rounded-sm flex flex-col h-full overflow-hidden">
    <div class="bg-gradient-to-r from-black to-gray-600 text-white p-2 flex justify-between">
      <span>{{ screenTitle }}</span>
      <button v-if="store.currentScreen !== 'map'" @click="store.setCurrentScreen('map')" class="text-sm hover:text-yellow-300">Back to Map</button>
    </div>
    <div class="flex-1 h-full overflow-hidden">
      <component :is="screenComponents[store.currentScreen]" class="h-full" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useMainStore } from "../stores/store"
import ScreenMap from "./ScreenMap.vue"
import ScreenMarket from "./ScreenMarket.vue"
import ScreenBlacksmith from "./ScreenBlacksmith.vue"
import ScreenArmor from "./ScreenArmor.vue"
import ScreenInn from "./ScreenInn.vue"
import ScreenArena from "./ScreenArena.vue"
import ScreenDungeon from "./ScreenDungeon.vue"
import ScreenCastle from "./ScreenCastle.vue"

const store = useMainStore()

const screenComponents = {
  map: ScreenMap,
  ScreenMarket,
  ScreenBlacksmith,
  ScreenArmor,
  ScreenInn,
  ScreenArena,
  ScreenDungeon,
  ScreenCastle,
}

const screenTitle = computed(() => {
  if (store.currentScreen === "map") return "World Map"
  return store.currentScreen.replace("Screen", "")
})
</script>
