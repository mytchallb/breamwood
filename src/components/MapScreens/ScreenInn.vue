<template>
  <div class="relative bg-gray-light">
    <!-- Inn background placeholder -->
    <div class="h-1/2 bevel-border">
      <div class="w-full h-full bg-[url('../assets/bg-inn.jpg')] bg-cover bg-center"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 p-2 flex h-1/2 flex-col gap-4 justify-between">
      <!-- Inn description -->
      <div class="relative">
        <img
          src="/img/screens/inn-innkeeper.png"
          alt="Inn"
          class="bevel-border-reverse w-16 h-16 object-cover mx-auto absolute -top-12 left-1/2 -translate-x-1/2"
        />
        <h2 class="text-xl font-medieval mt-6 mb-2 text-center">Traveler's Rest Inn</h2>
        <p class="text-center max-w-2xl mx-auto normal-line-height">A cozy establishment offering weary travelers a warm bed.</p>
      </div>

      <!-- Buttons container -->
      <div class="flex justify-center gap-3 mx-auto max-w-xs">
        <Button @click="stayOneNight" :highlight="true" text="1 Night 12g" />
        <Button @click="stayUntilHealed" text="1 Week 80g" />
        <Button @click="returnToMap" text="Map" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "../../stores/store"
import Button from "@/components/Button.vue" // Make sure to import the Button component

const store = useMainStore()

const stayAtInn = (timeType) => {
  let cost, healthGain, message

  switch (timeType) {
    case "night":
      cost = 17 // 17g for 20 health = 0.85g per health point
      healthGain = 20
      message = "You feel better after a restful night's sleep."
      break
    case "week":
      cost = 70 // 70g for 100 health = 0.7g per health point
      healthGain = 100
      message = "A week of rest and relaxation makes you feel like new."
      break
    default:
      return
  }

  // check if player has enough gold
  if (store.player.gold < cost) {
    console.log("Not enough gold")
    store.infoMessage = "Not enough gold."
    return
  }

  // deduct gold
  store.player.gold -= cost

  // add health (capping at player.health)
  store.player.currentHealth = Math.min(store.player.currentHealth + healthGain, store.player.skills.health)

  // set info message
  store.infoMessage = message
}

const stayOneNight = () => {
  console.log("Stay 1 night")
  stayAtInn("night")
}

const stayUntilHealed = () => {
  console.log("Stay until healed")
  stayAtInn("week")
}

const returnToMap = () => {
  store.setCurrentScreen("map")
}
</script>
