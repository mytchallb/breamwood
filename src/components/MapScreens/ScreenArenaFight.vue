<template>
  <div class="relative h-full flex flex-col bg-gray-light">
    <!-- Arena image moved to top -->

    <div class="flex flex-1 h-full">
      <!-- Description -->
      <div class="w-full p-1 flex flex-col">
        <div class="flex gap-2 flex-1 h-full">
          <!-- Enemy details -->
          <div class="p-1 flex flex-col justify-between w-full h-full overflow-hidden">
            <div class="flex justify-between gap-2 w-full">
              <!-- Enemy image and name -->
              <div class="aspect-square h-full w-1/3 py-1">
                <img :src="selectedEnemy?.image" class="bevel-border-reverse w-full h-full object-cover" alt="Enemy" v-if="selectedEnemy?.image" />
              </div>

              <!-- Enemy stats -->
              <div class="p-1 space-y-1 flex-1 w-2/3">
                <div class="flex justify-between p-1 bevel-border bg-[#bcbcbc] relative">
                  <div class="absolute inset-0"></div>
                  <span class="leading-4 capitalize relative z-10">Health</span>
                  <span class="leading-4 relative z-10" :style="{ color: getHealthColor(healthPercentage) }"
                    >{{ enemyHealth }}/{{ selectedEnemy?.health }}</span
                  >
                </div>
                <div class="flex justify-between p-1 bevel-border bg-[#bcbcbc]">
                  <span class="leading-4 capitalize">Defense</span>
                  <span class="leading-4">{{ selectedEnemy?.defense }}</span>
                </div>
                <div class="flex justify-between p-1 bevel-border bg-[#bcbcbc]">
                  <span class="leading-4 capitalize">Attack</span>
                  <span class="leading-4"
                    >{{ selectedEnemy?.damage }} <span v-if="selectedEnemy?.hits > 1 || 1 == 1">({{ selectedEnemy?.hits }}x)</span></span
                  >
                </div>
              </div>
            </div>

            <!-- Message -->
            <div class="flex flex-1 flex-col py-2 select-text min-h-0 overflow-hidden">
              <p class="normal-line-height mb-2">Messages</p>
              <div class="p-1 bevel-border flex-1 overflow-y-auto" ref="msgLogContainer">
                <ul class="h-full">
                  <li class="leading-tight" v-for="msg in msgLog" :key="msg">{{ msg }}</li>
                </ul>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="flex gap-2 w-full justify-around">
              <Button text="Attack" :highlight="true" @click="fight" :disabled="buttonsDisabled" />
              <Button text="Defend" @click="defend" :disabled="buttonsDisabled" />
              <Button text="Run" @click="run" :disabled="buttonsDisabled" />
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
import { getHealthColor } from "../../lib/methods"
const store = useMainStore()
const selectedEnemy = ref(null)
const enemyHealth = ref()
const msgLog = ref([])
const msgLogContainer = ref(null)
const buttonsDisabled = ref(false)

// ATTACK LOGIC

// See who attacks first based on agility with 20% chance to override

// Enemy attack
// See if we block or enemy misses
// Calculate damage based on weapon, player strength, enemy defense
// Subtract damage from enemy health
// Check if enemy is dead

// Our attack
// See if we miss or enemy blocks
// Calculate damage based on weapon, player strength, enemy defense
// Subtract damage from enemy health
// Check if enemy is dead

//

// Fight function (you'll need to implement the combat logic)
const fight = () => {
  if (!selectedEnemy.value) return
  console.log("Fighting:", store.currentEnemy.name)

  // See who attacks first based on agility with 20% chance to override
  const playerAgility = store.player.agility
  const enemyAgility = selectedEnemy.value.agility
  const luckyRoll = Math.random() < 0.2 // 20% chance

  if (playerAgility > enemyAgility || (playerAgility <= enemyAgility && luckyRoll)) {
    addMessage("You attack first!")
  } else {
    addMessage("The " + selectedEnemy.value.name + " attacks first!")
  }

  // Calculate damage
  const damage = Math.floor(Math.random() * (store.player.damage - selectedEnemy.value.defense)) + 1 || 0
  addMessage("You hit the " + selectedEnemy.value.name + " for " + damage + " damage!")

  // Subtract damage from enemy health
  enemyHealth.value -= damage

  // Check if enemy is dead
  if (enemyHealth.value <= 0) {
    addMessage("You defeat the " + selectedEnemy.value.name + "!")
    setTimeout(() => {
      store.setCurrentScreen("ScreenArena")
    }, 800)
  }
}

const run = () => {
  buttonsDisabled.value = true

  // Forfeit up to 60% of the prize (minimum 1)
  let forfeitAmount = Math.max(1, Math.floor(Math.random() * (selectedEnemy.value.reward * 0.6)))
  forfeitAmount = Math.min(forfeitAmount, store.player.gold)
  if (forfeitAmount > 0) {
    store.player.gold -= forfeitAmount
    store.infoMessage = "You run away from the " + selectedEnemy.value.name + " and forfeit " + forfeitAmount + " gold!"
  } else {
    store.infoMessage = "You run away from the " + selectedEnemy.value.name + "!"
  }

  setTimeout(() => {
    store.setCurrentScreen("ScreenArena")
  }, 1500)
}

const defend = () => {
  console.log("Defending...")
}

// Initialize component
onMounted(() => {
  selectedEnemy.value = store.enemies[0] || null
  enemyHealth.value = selectedEnemy.value.health
  addMessage("You are fighting a " + store.currentEnemy.name + "!")
})

const addMessage = (message) => {
  msgLog.value.push(message)
  // Scroll the log to the bottom
  setTimeout(() => {
    msgLogContainer.value.scrollTop = msgLogContainer.value.scrollHeight
  }, 1)
}

const healthPercentage = computed(() => {
  if (!selectedEnemy.value || !enemyHealth.value) return 0
  return Math.round((enemyHealth.value / selectedEnemy.value.health) * 100)
})
</script>
