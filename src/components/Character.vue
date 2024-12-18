<template>
  <!-- Character Panel -->
  <div class="bg-[#bcbcbc] border-2 mx-2 border-black rounded-sm overflow-hidden flex flex-col">
    <WindowBar title="Character" />
    <div class="p-3 flex-1 h-[100px]">
      <!-- Character Header -->
      <div class="flex justify-between items-start">
        <div class="flex items-center space-x-3">
          <div class="w-16 h-16 bevel-border-reverse bg-white cursor-pointer" @click="toggleEquipment">
            <img src="../assets/character.png" alt="Character" class="w-full h-full object-cover" />
          </div>
          <div>
            <div class="font-bold text-lg">Marcus, Lvl 5</div>
            <div class="text-lg text-[#ffe927]">1000 Gold</div>
            <div class="text-xs text-gray-500">1250 / 2000 XP</div>
          </div>
        </div>
        <div class="w-16 h-16 bevel-border-reverse bg-white cursor-pointer hover:bg-gray-100" @click="toggleInventory">
          <img src="../assets/bag.jpg" alt="Inventory" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toggleEquipment, toggleInventory } from "../lib/methods"
import WindowBar from "./WindowBar.vue"
</script>
