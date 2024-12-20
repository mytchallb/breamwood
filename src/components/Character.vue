<template>
  <!-- Character Panel -->
  <div class="bg-[#bcbcbc] border-2 border-black rounded-sm overflow-hidden flex flex-col">
    <WindowBar title="Character" />
    <div class="p-1 sm:p-2 md:p-3 flex-1 h-[100px]">
      <!-- Character Header -->
      <div class="flex justify-between items-start normal-line-height">
        <div class="flex items-center space-x-3">
          <div
            class="w-16 h-16 bevel-border-reverse bg-white cursor-pointer active:shadow-[inset_2px_2px_0_rgba(0,0,0,0.5)] active:translate-x-[1px] active:translate-y-[1px]"
            @click="toggleEquipment"
          >
            <img src="../assets/character.png" alt="Character" class="w-full h-full object-cover pointer-events-none" />
          </div>
          <div class="flex flex-col h-16 py-1 justify-between">
            <div class="font-bold text-lg">Marcus, Lvl 5</div>
            <div class="text-lg text-[#ffe927]">1000 Gold</div>
            <div class="text-xs text-gray-500">1250 / 2000 XP</div>
          </div>
        </div>
        <div
          class="w-16 h-16 bevel-border-reverse bg-white cursor-pointer hover:bg-gray-100 active:bevel-pressed active:translate-x-[1px] active:translate-y-[1px]"
          @click="toggleInventory"
        >
          <img src="../assets/bag.jpg" alt="Inventory" class="w-full h-full object-cover pointer-events-none" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toggleEquipment, toggleInventory } from "../lib/methods"
import WindowBar from "./WindowBar.vue"
</script>
