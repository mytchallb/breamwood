<template>
  <div class="bg-[#d1d1d1] border-2 border-black rounded-sm flex flex-col">
    <WindowBar title="Stats" v-if="props.showWindowBar" />
    <!-- Stats Container -->
    <div class="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-1 p-1">
      <!-- Skills -->
      <template v-if="props.show === 'all' || props.show === 'skills'">
        <div class="space-y-1" v-for="(value, name) in state.player.skills" :key="name">
          <div class="flex justify-between p-1 bevel-border bg-[#bcbcbc]">
            <span class="leading-4 capitalize">{{ name }}</span>
            <div class="flex items-center leading-4">
              <span v-if="showClassBuffs && getClassBuff(name)" class="text-green-700 mr-2">(+{{ getClassBuff(name) }})</span>
              <span v-if="name === 'health'" :style="{ color: getHealthColor(getHealthPercentage()) }"> {{ state.player.currentHealth }}/{{ value }} </span>
              <span v-else>{{ value }}</span>
              <span v-if="name === 'criticalHit'" class="leading-4 mr-[-3px]">%</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import WindowBar from "./WindowBar.vue"
import { useMainStore } from "../stores/store"
import { getHealthColor } from "../lib/methods"
const state = useMainStore()

const props = defineProps({
  show: {
    type: String,
    default: "all",
    validator: (value) => ["all", "stats", "skills"].includes(value),
  },
  showWindowBar: {
    type: Boolean,
    default: true,
  },
  showClassBuffs: {
    type: Boolean,
    default: false,
  },
})

const getHealthPercentage = () => {
  if (!state.player.skills.health) return 0
  return Math.round((state.player.currentHealth / state.player.skills.health) * 100)
}

const getClassBuff = (statName) => {
  if (!state.player.classType) return null

  const classBuffs = state.playerClassBuffs.find((c) => c.name === state.player.classType)
  if (!classBuffs) return null

  const buff = classBuffs.buffs.find((b) => Object.keys(b)[0] === statName)
  return buff ? Object.values(buff)[0] : null
}
</script>
