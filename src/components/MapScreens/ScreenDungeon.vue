<template>
  <div class="relative h-full w-full">
    <!-- BG Image -->
    <div class="h-full w-full absolute bg-[url('../assets/bg-dungeon.jpg')] bg-center bg-cover bg-no-repeat"></div>
    <!-- Overlay -->
    <div class="relative z-10 p-8 pb-2 h-full flex flex-col items-center justify-between w-full">
      <p class="text-white text-lg font-bold text-center mb-6">An uneasy feeling washes over you...</p>
      <div class="flex gap-8">
        <!-- Content can go here -->
        <Button text="Enter" :highlight="true" :onClick="enterDungeon" />
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

const enterDungeon = () => {
  if (store.player.level < 10) {
    showModalMessage("You need to be level 20 to enter the dungeon.")
  } else {
    console.log("Entering dungeon")
  }
}
</script>
