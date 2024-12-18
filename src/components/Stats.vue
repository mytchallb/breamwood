<template>
  <div class="bg-[#d1d1d1] border-2 mx-2 border-black rounded-sm flex flex-col">
    <WindowBar title="Stats" />
    <!-- Stats Container -->
    <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-1 p-1">
      <template v-for="(stat, index) in allStats" :key="stat.name">
        <div class="space-y-1">
          <div class="flex justify-between p-1 text-sm bevel-border bg-[#bcbcbc]">
            <span>{{ stat.name }}</span>
            <span>{{ stat.value }}</span>
          </div>
          <hr v-if="index == 2 || index == 3" class="border-t border-gray-400" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import WindowBar from "./WindowBar.vue"

const allStats = ref([
  { name: "Health", value: "100 / 100" },
  { name: "Stamina", value: "85 / 100" },
  { name: "Hunger", value: "90 / 100" },
  { name: "Strength", value: "14" },
  { name: "Agility", value: "12" },
  { name: "Sanity", value: "10/100" },
  { name: "Defense", value: "35" },
  { name: "Critical Rate", value: "15%" },
])
</script>
