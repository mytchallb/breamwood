<template>
  <!-- Character Panel -->
  <div class="bg-white border-2 mx-2 border-black rounded-sm overflow-hidden flex flex-col">
    <div class="bg-gradient-to-r from-black to-gray-600 text-white p-1 hide-on-short">Character</div>
    <div class="bg-gray-200 p-3 flex-1 h-[100px]">
      <!-- Character Header -->
      <div class="flex justify-between items-start">
        <div class="flex items-center space-x-3">
          <div class="w-16 h-16 border-2 border-gray-600 bg-white cursor-pointer" @click="toggleEquipment">
            <img src="../assets/character.png" alt="Character" class="w-full h-full object-cover" />
          </div>
          <div>
            <div class="font-bold text-lg">Marcus, Lvl 5</div>
            <div class="text-sm text-gray-600">1000 Gold</div>
            <div class="text-xs text-gray-500">1250 / 2000 XP</div>
          </div>
        </div>
        <div class="w-16 h-16 border-2 border-gray-600 bg-white cursor-pointer hover:bg-gray-100" @click="toggleInventory">
          <img src="../assets/bag.jpg" alt="Inventory" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toggleEquipment, toggleInventory } from "../lib/methods"
</script>
