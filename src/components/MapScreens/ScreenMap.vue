<template>
  <div class="h-full w-full relative bg-[url('../assets/bg-map.jpg')] bg-no-repeat" style="background-size: 100% 100%">
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
import { useMainStore } from "../../stores/store"

const store = useMainStore()

const locations = ref([
  { name: "Market", icon: "💰", x: 56.5, y: 38, component: "ScreenMarket" },
  { name: "Blacksmith", icon: "⚒️", x: 26, y: 12, component: "ScreenBlacksmith" },
  { name: "Armorer", icon: "🛡️", x: 12, y: 31, component: "ScreenArmor" },
  { name: "Inn", icon: "🏨", x: 31, y: 72, component: "ScreenInn" },
  { name: "Arena", icon: "⚔️", x: 75, y: 75, component: "ScreenArena" },
  { name: "Dungeon", icon: "☠", x: 82, y: 19, component: "ScreenDungeon" },
  { name: "Castle", icon: "🏰", x: 70, y: 4, component: "ScreenCastle" },
])

const handleLocation = (location) => {
  store.setCurrentScreen(location.component)
}
</script>
