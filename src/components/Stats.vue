<template>

<div class="bg-white border-2 border-black rounded-md pb-2 flex flex-col">
        <div class="bg-gradient-to-r from-black to-gray-600 text-white">
          Stats
        </div>

          <!-- Stats Container -->
          <div class="grid grid-cols-2 gap-4 pt-1 px-2">
            <div class="space-y-3">
              <div class=" border-gray-400">
                <div v-for="stat in primaryStats" :key="stat.name" class="flex justify-between border border-gray-400 p-2 my-1 text-sm">
                  <span>{{ stat.name }}</span>
                  <span>{{ stat.value }}</span>
                </div>
              </div>
              <div class="border-t border-gray-400 pt-2">
                <div v-for="stat in secondaryStats" :key="stat.name" class="flex justify-between border border-gray-400 p-2 my-1 text-sm">
                  <span>{{ stat.name }}</span>
                  <span>{{ stat.value }}</span>
                </div>
              </div>
            </div>
            <div class="space-y-3">
              <div class=" border-gray-400">
                <div v-for="stat in tertiaryStats" :key="stat.name" class="flex justify-between border border-gray-400 p-2 my-1 text-sm">
                  <span>{{ stat.name }}</span>
                  <span>{{ stat.value }}</span>
                </div>
              </div>
              <div class="border-t border-gray-400 pt-2">
                <div v-for="stat in quaternaryStats" :key="stat.name" class="flex justify-between border border-gray-400 p-2 my-1 text-sm">
                  <span>{{ stat.name }}</span>
                  <span>{{ stat.value }}</span>
                </div>
              </div>
            </div>
          </div>

</div>

</template>
<script setup>
import { ref } from 'vue'

const primaryStats = ref([
  { name: 'Health', value: '100 / 100' },
  { name: 'Stamina', value: '85 / 100' },
  { name: 'Hunger', value: '90 / 100' }
])

const secondaryStats = ref([
  { name: 'Strength', value: '14' },
  { name: 'Agility', value: '12' }
])

const tertiaryStats = ref([
  { name: 'Endurance', value: '11' },
  { name: 'Intelligence', value: '8' },
  { name: 'Sanity', value: '10/100' }
])

const quaternaryStats = ref([
  { name: 'Defense', value: '35' },
  { name: 'Critical Rate', value: '15%' }
])

</script>