<template>
  <div class="relative h-full w-full">
    <!-- BG Image -->
    <div class="h-full w-full absolute bg-[url('../assets/bg-castle.jpg')] bg-center bg-cover bg-no-repeat"></div>
    <!-- Overlay -->
    <div class="relative z-10 p-8 pb-2 h-full flex flex-col items-center justify-between w-full">
      <p class="text-white text-lg font-bold text-center mb-6">The King requests your assistance...</p>
      <div class="flex gap-8">
        <!-- Content can go here -->
        <Button text="Enter" :highlight="true" :onClick="enterCastle" />
        <Button text="Map" :onClick="() => store.setCurrentScreen('map')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "../../stores/store"
import Button from "../Button.vue"
import { showModalMessage } from "../../lib/methods"

const store = useMainStore()

const enterCastle = () => {
  if (store.player.level < 10) {
    showModalMessage("You need to be level 10 to see the king.")
  } else {
    console.log("Enter castle")
    // store.setCurrentScreen("map")
  }
}
</script>
