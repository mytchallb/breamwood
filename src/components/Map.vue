<template>
  <div class="bg-white border-2 border-black rounded-sm flex flex-col h-full overflow-hidden">
    <WindowBar :title="screenTitle" />
    <div class="flex-1 h-full overflow-hidden">
      <component :is="screenComponents[store.currentScreen].component" class="h-full" />
    </div>
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
  },
  ScreenMarket: {
    component: h(ScreenShop, { shopType: "items" }),
  },
  ScreenBlacksmith: {
    component: h(ScreenShop, { shopType: "weapons" }),
  },
  ScreenArmor: {
    component: h(ScreenShop, { shopType: "armor" }),
  },
  ScreenInn: {
    component: ScreenInn,
  },
  ScreenArena: {
    component: ScreenArena,
  },
  ScreenArenaFight: {
    component: ScreenArenaFight,
  },
  ScreenDungeon: {
    component: ScreenDungeon,
  },
  ScreenCastle: {
    component: ScreenCastle,
  },
}

const screenTitle = computed(() => {
  if (store.currentScreen === "map") return "World Map"
  return store.currentScreen.replace("Screen", "")
})
</script>
