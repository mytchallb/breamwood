<template>
  <div class="bg-white border-2 border-black rounded-sm flex flex-col h-full overflow-hidden">
    <WindowBar :title="screenTitle" />
    <div class="flex-1 h-full overflow-hidden">
      <component :is="screenComponents[store.currentScreen]" class="h-full" />
    </div>
    <button v-if="store.currentScreen !== 'map'" @click="store.setCurrentScreen('map')" class="bevel-pressed">< Back to Map</button>
  </div>
</template>

<script setup>
import { computed, h } from "vue"
import { useMainStore } from "../stores/store"
import WindowBar from "./WindowBar.vue"
import ScreenMap from "./MapScreens/ScreenMap.vue"
import ScreenInn from "./MapScreens/ScreenInn.vue"
import ScreenArena from "./MapScreens/ScreenArena.vue"
import ScreenDungeon from "./MapScreens/ScreenDungeon.vue"
import ScreenCastle from "./MapScreens/ScreenCastle.vue"
import ScreenShop from "./MapScreens/ScreenShop.vue"
const store = useMainStore()

const screenComponents = {
  map: ScreenMap,
  ScreenMarket: h(ScreenShop, { shopType: "items" }),
  ScreenBlacksmith: h(ScreenShop, { shopType: "weapons" }),
  ScreenArmor: h(ScreenShop, { shopType: "armor" }),
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
