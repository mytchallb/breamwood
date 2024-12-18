<template>
  <div class="bg-white border-2 border-black rounded-md pb-2 flex flex-col">
    <div class="bg-gradient-to-r from-black to-gray-600 text-white p-1 hide-on-short">Stats</div>
    <!-- Stats Container -->
    <div class="grid grid-cols-2 gap-4 pt-1 px-2">
      <div class="space-y-3">
        <div>
          <div v-for="stat in firstColumn" :key="stat.name" class="flex justify-between border border-gray-400 p-1 my-1 text-sm">
            <span>{{ stat.name }}</span>
            <span>{{ stat.value }}</span>
          </div>
        </div>
        <div class="border-t border-gray-400 pt-1">
          <div v-for="stat in secondColumn" :key="stat.name" class="flex justify-between border border-gray-400 p-1 my-1 text-sm">
            <span>{{ stat.name }}</span>
            <span>{{ stat.value }}</span>
          </div>
        </div>
      </div>
      <div class="space-y-3">
        <div>
          <div v-for="stat in thirdColumn" :key="stat.name" class="flex justify-between border border-gray-400 p-1 my-1 text-sm">
            <span>{{ stat.name }}</span>
            <span>{{ stat.value }}</span>
          </div>
        </div>
        <div class="border-t border-gray-400 pt-1">
          <div v-for="stat in fourthColumn" :key="stat.name" class="flex justify-between border border-gray-400 p-1 my-1 text-sm">
            <span>{{ stat.name }}</span>
            <span>{{ stat.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

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

const firstColumn = computed(() => allStats.value.slice(0, 2))
const secondColumn = computed(() => allStats.value.slice(2, 4))
const thirdColumn = computed(() => allStats.value.slice(4, 6))
const fourthColumn = computed(() => allStats.value.slice(6, 8))
</script>
