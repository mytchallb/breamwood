<template>
  <div class="relative h-full flex flex-col bg-gray-light">
    <!-- Arena image with flex-shrink-0 to maintain size -->
    <img src="@/assets/bg-arena.jpg" class="bevel-border w-full h-[15vh] flex-shrink-0 object-cover" alt="Arena" />

    <!-- Content columns - Using flex-1 to take remaining space -->
    <div class="flex flex-1 min-h-0">
      <!-- Enemy list -->
      <div class="w-full flex flex-col min-h-0">
        <div class="flex-1 flex flex-col bg-white m-1 mr-0 bevel-border min-h-0 overflow-y-auto">
          <button
            v-for="enemy in store.enemies"
            :key="enemy.id"
            @click="selectedEnemy = enemy"
            :class="['text-left p-1 ', selectedEnemy?.id === enemy.id ? 'bg-black text-white' : '']"
          >
            {{ enemy.name }}
          </button>
        </div>
      </div>

      <!-- Description -->
      <div class="w-full p-1 flex flex-col min-h-0">
        <div class="flex gap-2 flex-1 min-h-0">
          <!-- Enemy details -->
          <div class="flex-1 p-1 flex flex-col justify-between">
            <div class="flex flex-1 flex-col justify-between">
              <div class="relative text-center">
                <img
                  :src="selectedEnemy?.image"
                  class="absolute bevel-border-reverse -top-10 z-20 left-1/2 -translate-x-1/2 w-12 h-12 object-cover"
                  alt="Enemy"
                  v-if="selectedEnemy?.image"
                />
                <h2 class="text-xl tall:mb-1 mt-4 normal-line-height">{{ selectedEnemy?.name }}</h2>
                <p class="tall:block hidden leading-4 min-h-[54px]">{{ selectedEnemy?.description }}</p>
              </div>
              <div class="flex flex-col justify-around items-center flex-1">
                <div class="grid grid-cols-[auto_auto] gap-1 my-2 leading-4 min-w-[100px] w-full">
                  <div
                    v-for="(label, stat) in { health: 'Health', damage: 'Attack', defense: 'Defense' }"
                    :key="stat"
                    class="flex justify-between p-1 bevel-border bg-[#bcbcbc] col-span-2"
                  >
                    <span class="leading-4">{{ label }}</span>
                    <span v-if="stat === 'damage'" class="leading-4">{{ selectedEnemy?.[stat] }} (1-2x)</span>
                    <span v-else class="leading-4">{{ selectedEnemy?.[stat] }}</span>
                  </div>
                </div>

                <div class="text-xl flex justify-between mb-2 text-center text-yellow">
                  <img src="@/assets/goldPile.png" class="w-12 h-6 object-contain" />
                  <span class="min-w-[50px]">{{ selectedEnemy?.reward }}</span>
                  <span class="text-left">GOLD</span>
                </div>
              </div>
            </div>

            <div class="flex gap-2 w-full justify-around">
              <Button text="Fight" :onClick="fight" :highlight="true" :disabled="!selectedEnemy" />
              <Button text="Map" :onClick="() => store.setCurrentScreen('map')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { useMainStore } from "../../stores/store"
import Button from "../Button.vue"

const store = useMainStore()
const selectedEnemy = ref(null)

// Fight function (you'll need to implement the combat logic)
const fight = () => {
  if (!selectedEnemy.value) {
    store.infoMessage = "Please select an enemy to fight"
    return
  }

  console.log("Fighting:", selectedEnemy.value.name)

  store.setCurrentScreen("ScreenArenaFight")
  store.setCurrentEnemy(selectedEnemy.value)
}

// Initialize component
onMounted(() => {
  selectedEnemy.value = store.enemies[0] || null
})
</script>
