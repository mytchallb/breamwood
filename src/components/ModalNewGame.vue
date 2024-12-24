<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
    <div class="bg-white w-full max-w-[370px] mx-4 border-2 border-black rounded-sm flex flex-col">
      <WindowBar title="New Game" />
      <div class="p-6 min-h-[360px] flex flex-col justify-between">
        <template v-if="stage === 0">
          <div>
            <p class="mb-0">Welcome to BreamWood!!</p>
            <p>Please enter your name</p>
            <input v-on:submit="nextStage" v-model="name" type="text" autocomplete="off" class="bg-gray-100 bevel-border px-2" placeholder="" />

            <div class="my-4">
              <p>Choose your class</p>
              <ul class="pl-2 mt-2 space-y-1">
                <li v-for="classInfo in state.playerClassBuffs" :key="classInfo.name" class="flex items-center gap-2">
                  <input type="radio" name="class" :id="classInfo.name" :value="classInfo.name" v-model="playerClass" />
                  <label :for="classInfo.name">{{ formatClassName(classInfo) }}</label>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button
              class="ml-auto active:bg-black active:text-white px-4 rounded-md border border-black min-w-[70px] h-[26px] flex items-center outline outline-[3px] outline-offset-1 outline-black justify-center"
              @click="nextStage"
            >
              OK
            </button>
          </div>
        </template>

        <template v-if="stage === 1">
          <p class="leading-4 mb-3">Welcome {{ state.playerName }}!</p>
          <p class="leading-4">Roll the dice to choose your stats, for a combined total of 18.</p>
          <Stats class="mt-4" :showWindowBar="false" :show="'skills'" :showClassBuffs="true" />

          <div class="flex gap-4 mt-6 justify-end">
            <div class="flex-1">
              <button
                @click="prevStage"
                class="active:bg-black bg-white active:text-white px-4 rounded-md border border-black min-w-[70px] h-[26px] flex items-center justify-center"
              >
                Back
              </button>
            </div>
            <button
              @click="rollStats"
              class="active:bg-black bg-white active:text-white px-4 rounded-md border border-black min-w-[70px] h-[26px] flex items-center justify-center"
            >
              Roll
            </button>
            <button
              @click="nextStage"
              class="active:bg-black bg-white active:text-white px-4 rounded-md border border-black min-w-[70px] h-[26px] flex items-center outline outline-[3px] outline-offset-1 outline-black justify-center"
            >
              OK
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"
import Stats from "./Stats.vue"
import WindowBar from "./WindowBar.vue"
import { useMainStore } from "../stores/store"
const stage = ref(0)
const playerClass = ref("")
const name = ref("")
const state = useMainStore()

const formatClassName = (classInfo) => {
  const statAbbreviations = {
    strength: "STR",
    agility: "AGI",
    defense: "DEF",
    criticalHit: "CRIT",
    health: "HP",
  }

  const buffText = classInfo.buffs
    .map((buff) => {
      const [stat, value] = Object.entries(buff)[0]
      const abbreviation = statAbbreviations[stat] || stat.toUpperCase()
      return `+${value} ${abbreviation}`
    })
    .join(", ")
  return `${classInfo.name.charAt(0).toUpperCase() + classInfo.name.slice(1)} (${buffText})`
}
const prevStage = () => {
  if (stage.value > 0) {
    stage.value--
  }
}
const nextStage = () => {
  if (stage.value === 0) {
    if (name.value === "" || playerClass.value === "") {
      return
    }
    // Update state
    state.setPlayerName(name.value)
    state.setPlayerClass(playerClass.value)
    state.player.classType = playerClass.value
    stage.value++
  } else if (stage.value === 1) {
    applyClassBuffs()
    state.startGame()
  }
}

const applyClassBuffs = () => {
  const classBuffs = state.playerClassBuffs.find((c) => c.name === state.player.classType)
  if (classBuffs) {
    classBuffs.buffs.forEach((buff) => {
      const [stat, value] = Object.entries(buff)[0]
      state.player.skills[stat] += value
    })
  }
}

const getRandomStat = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const rollStats = () => {
  function generateStats() {
    const first = Math.floor(Math.random() * 8) + 1 // 1-8
    const second = Math.floor(Math.random() * (9 - first)) + 1 // 1-(9-first)
    const third = 18 - first - second

    if (third >= 1 && third <= 10) {
      return [first, second, third]
    }
    return generateStats()
  }

  const [strength, agility, defense] = generateStats()

  state.player.skills = {
    strength,
    agility,
    defense,
    criticalHit: getRandomStat(1, 3),
  }
}

onMounted(() => {
  rollStats()
})

/*

Class buffs can affect skills and health

3 Classes:
warrior: +2 strength + 1 defence
rogue: +2 agility + 1.5% critical hit
paladin: +3 defence + 5 health

*/
</script>
