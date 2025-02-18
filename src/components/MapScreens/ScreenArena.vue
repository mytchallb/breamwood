<template>
  <div class="relative h-full flex flex-col bg-gray-light">
    <!-- Arena image moved to top -->

    <div class="flex flex-1">
      <!-- Item list -->
      <div class="w-full flex flex-col">
        <img src="@/assets/bg-arena.jpg" class="bevel-border w-full h-[30%] object-cover" alt="Arena" />
        <div class="flex flex-col h-full bg-white overflow-y-auto m-1 mr-0 bevel-border">
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
      <div class="w-full p-1 flex flex-col">
        <div class="flex gap-2 flex-1">
          <!-- Enemy details -->
          <div class="flex-1 p-1 h-full flex flex-col justify-between">
            <div class="flex flex-1 flex-col justify-between">
              <!-- Added enemy image -->
              <img :src="selectedEnemy?.image" class="bevel-border w-16 h-16 object-cover mx-auto mb-2" alt="Enemy" v-if="selectedEnemy?.image" />
              <div class="text-center">
                <h2 class="text-xl tall:mb-1">{{ selectedEnemy?.name }}</h2>
                <p class="tall:block hidden leading-4 mb-2 min-h-[54px]">{{ selectedEnemy?.description }}</p>
              </div>
              <div class="flex flex-col justify-around items-center flex-1">
                <div class="space-y-1 min-w-[200px]">
                  <div
                    v-for="stat in { health: 'Health', damage: 'Damage', defense: 'Defense', agility: 'Agility' }"
                    :key="stat"
                    class="flex justify-between p-1 bevel-border bg-[#bcbcbc]"
                  >
                    <span class="leading-4">{{ stat }}</span>
                    <div class="flex items-center leading-4">
                      <span>{{ selectedEnemy?.[stat.toLowerCase().replace(" ", "")] }}</span>
                      <span v-if="stat === 'Critical Hit'" class="leading-4 mr-[-3px]">%</span>
                    </div>
                  </div>
                </div>

                <div class="text-xl flex justify-between gap-2 mb-2 text-center text-yellow">
                  <span class="text-right">{{ selectedEnemy?.reward }}</span>
                  <span class="text-left">GOLD REWARD</span>
                </div>
              </div>
            </div>

            <div class="flex gap-2 w-full justify-around">
              <Button text="Fight" :onClick="fight" :highlight="true" />
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
