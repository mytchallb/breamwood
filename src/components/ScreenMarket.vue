<template>
  <div class="relative h-full w-full">
    <div class="h-full w-full absolute bg-[url('../assets/bg-market.jpg')] bg-center bg-cover bg-no-repeat"></div>
    <div class="relative z-10 p-8">
      <h1 class="text-white text-xl font-bold text-center mb-6">Welcome to the Market</h1>
      <div class="container mx-auto">
        <!-- Market content can go here -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "../stores/store"

const store = useMainStore()
</script>
