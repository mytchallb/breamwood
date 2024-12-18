<template>
  <div class="relative p-4">
    <!-- Inn background placeholder -->
    <div class="absolute inset-0 z-0">
      <div class="w-full h-full bg-[url('../assets/bg-inn.jpg')] bg-cover bg-center"></div>
    </div>

    <!-- Content overlay -->
    <div class="relative z-10">
      <h2 class="text-2xl font-medieval mb-6 text-center text-white">Traveler's Rest Inn</h2>

      <div class="flex flex-col gap-2 mx-auto min-w-[230px] w-[60%]">
        <!-- Inn options -->
        <div
          v-for="(option, index) in innOptions"
          :key="index"
          class="flex items-center justify-between p-2 bg-amber-900/80 rounded-lg text-amber-50 hover:bg-amber-800/80 transition-colors"
        >
          <span class="font-semibold">{{ option.name }}</span>
          <button @click="option.action" class="px-3 py-1 bg-amber-700 rounded-md hover:bg-amber-600 min-w-[80px]">{{ option.price }} gold</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "../stores/store"

const store = useMainStore()

const innOptions = [
  {
    name: "Food",
    price: 5,
    action: () => console.log("Buy meal"),
  },
  {
    name: "Stay 1 Night",
    price: 10,
    action: () => console.log("Stay 1 night"),
  },
  {
    name: "Stay Until Healed",
    price: 25,
    action: () => console.log("Stay until healed"),
  },
]
</script>
