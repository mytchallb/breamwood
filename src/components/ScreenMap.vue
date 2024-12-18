<template>
  <div class="bg-black h-full w-full relative">
    <!-- Map Locations -->
    <div
      v-for="location in locations"
      :key="location.name"
      class="absolute text-white cursor-pointer hover:text-yellow-300"
      :style="{ left: location.x + '%', top: location.y + '%' }"
      @click="handleLocation(location)"
    >
      <div class="flex flex-col items-center">
        <span class="text-2xl">{{ location.icon }}</span>
        <span class="text-xs whitespace-nowrap">{{ location.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useMainStore } from "../stores/store"

const store = useMainStore()

const locations = ref([
  { name: "Market", icon: "🏪", x: 30, y: 40, component: "ScreenMarket" },
  { name: "Blacksmith", icon: "⚒️", x: 65, y: 35, component: "ScreenBlacksmith" },
  { name: "Armor Shop", icon: "🛡️", x: 75, y: 60, component: "ScreenArmor" },
  { name: "Inn", icon: "🏨", x: 20, y: 65, component: "ScreenInn" },
  { name: "Arena", icon: "⚔️", x: 50, y: 25, component: "ScreenArena" },
  { name: "Dungeon", icon: "🏰", x: 85, y: 15, component: "ScreenDungeon" },
  { name: "Castle", icon: "👑", x: 50, y: 50, component: "ScreenCastle" },
])

const handleLocation = (location) => {
  store.setCurrentScreen(location.component)
}
</script>
