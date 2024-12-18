<template>
  <div class="bg-white border-2 mx-2 border-black rounded-sm flex flex-col h-full overflow-hidden">
    <WindowBar :title="screenTitle" />
    <div class="flex-1 h-full max-h-[40vh] overflow-hidden">
      <component :is="screenComponents[store.currentScreen]" class="h-full" />
    </div>
    <button v-if="store.currentScreen !== 'map'" @click="store.setCurrentScreen('map')" class="text-sm hover:text-yellow-300">Back to Map</button>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useMainStore } from "../stores/store"
import WindowBar from "./WindowBar.vue"
import ScreenMap from "./MapScreens/ScreenMap.vue"
import ScreenMarket from "./MapScreens/ScreenMarket.vue"
import ScreenBlacksmith from "./MapScreens/ScreenBlacksmith.vue"
import ScreenArmor from "./MapScreens/ScreenArmor.vue"
import ScreenInn from "./MapScreens/ScreenInn.vue"
import ScreenArena from "./MapScreens/ScreenArena.vue"
import ScreenDungeon from "./MapScreens/ScreenDungeon.vue"
import ScreenCastle from "./MapScreens/ScreenCastle.vue"

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
