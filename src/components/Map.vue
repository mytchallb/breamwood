<template>
  <div class="bg-white border-2 border-black rounded-sm flex flex-col h-full overflow-hidden">
    <WindowBar :title="screenTitle" />
    <div class="flex-1 h-full overflow-hidden">
      <component :is="screenComponents[store.currentScreen].component" class="h-full" />
    </div>
    <button v-if="screenComponents[store.currentScreen].showBackBar" @click="store.setCurrentScreen('map')" class="bevel-pressed">< Back to Map</button>
  </div>
</template>

<script setup>
import { computed, h } from "vue"
import { useMainStore } from "../stores/store"
import WindowBar from "./WindowBar.vue"
import ScreenMap from "./MapScreens/ScreenMap.vue"
import ScreenInn from "./MapScreens/ScreenInn.vue"
import ScreenArena from "./MapScreens/ScreenArena.vue"
import ScreenArenaFight from "./MapScreens/ScreenArenaFight.vue"
import ScreenDungeon from "./MapScreens/ScreenDungeon.vue"
import ScreenCastle from "./MapScreens/ScreenCastle.vue"
import ScreenShop from "./MapScreens/ScreenShop.vue"
const store = useMainStore()

const screenComponents = {
  map: {
    component: ScreenMap,
    showBackBar: false,
  },
  ScreenMarket: {
    component: h(ScreenShop, { shopType: "items" }),
    showBackBar: true,
  },
  ScreenBlacksmith: {
    component: h(ScreenShop, { shopType: "weapons" }),
    showBackBar: true,
  },
  ScreenArmor: {
    component: h(ScreenShop, { shopType: "armor" }),
    showBackBar: true,
  },
  ScreenInn: {
    component: ScreenInn,
    showBackBar: true,
  },
  ScreenArena: {
    component: ScreenArena,
    showBackBar: true,
  },
  ScreenArenaFight: {
    component: ScreenArenaFight,
    showBackBar: false,
  },
  ScreenDungeon: {
    component: ScreenDungeon,
    showBackBar: true,
  },
  ScreenCastle: {
    component: ScreenCastle,
    showBackBar: true,
  },
}

const screenTitle = computed(() => {
  if (store.currentScreen === "map") return "World Map"
  return store.currentScreen.replace("Screen", "")
})
</script>
