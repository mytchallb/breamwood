<template>
  <div class="relative h-full flex bg-gray-light">
    <!-- Weapon list -->
    <div class="w-full flex flex-col">
      <div class="flex flex-col h-full bg-white overflow-y-auto m-1 mr-0 bevel-border">
        <button
          v-for="weapon in displayedWeapons"
          :key="weapon.id"
          @click="selectedWeapon = weapon"
          :class="['text-left p-1 ', selectedWeapon?.uid === weapon.uid ? 'bg-black text-white' : '']"
        >
          {{ weapon.name }}
        </button>
      </div>
      <div class="flex justify-around items-center p-2">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="mode" value="buy" v-model="tradeMode" />
          Buy
        </label>
        <label class="flex items-center gap-2 curs">
          <input type="radio" name="mode" value="sell" v-model="tradeMode" />
          Sell
        </label>
      </div>
    </div>

    <!-- Description -->
    <div class="w-full p-1 flex flex-col">
      <img src="@/assets/bg-blacksmith.jpg" class="bevel-border w-full h-[30%] object-cover" alt="Blacksmith workshop" />

      <div class="flex gap-2 flex-1">
        <!-- Weapon details - right side -->
        <div class="flex-1 p-1 h-full flex flex-col justify-between">
          <div class="flex flex-1 flex-col justify-between">
            <div class="">
              <h2 class="text-xl tall:mb-1 text-center tall:text-left">{{ selectedWeapon?.name }}</h2>
              <p class="tall:block hidden leading-4 mb-2 min-h-[54px]">{{ selectedWeapon?.description }}</p>
            </div>
            <div class="flex flex-col justify-around items-center flex-1">
              <div class="grid grid-cols-[auto_auto] gap-1 leading-4 min-w-[100px]">
                <span>Damage:</span>
                <span>{{ selectedWeapon?.damage }}</span>
                <span>Speed:</span>
                <span>{{ selectedWeapon?.speed }}</span>
                <span>Weight:</span>
                <span>{{ selectedWeapon?.weight }}</span>
              </div>

              <div class="text-xl flex justify-between gap-2 mb-2 text-center text-yellow">
                <span class="text-right">{{ tradeMode === "buy" ? selectedWeapon.price : (selectedWeapon?.resale ?? 0) }}</span>
                <span class="text-left">GOLD</span>
              </div>
            </div>
          </div>

          <div class="flex gap-2 w-full justify-around">
            <template v-if="tradeMode === 'buy'">
              <Button text="Haggle" :onClick="haggle" :disabled="!canHaggle" />
              <Button text="Buy" :onClick="buyWeapon" :disabled="!canBuy" :highlight="true" />
            </template>
            <template v-else>
              <Button text="Sell" :onClick="sellWeapon" :disabled="!selectedWeapon" :highlight="true" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useMainStore } from "../../stores/store"
import Button from "../Button.vue"
import { createGlobalState } from "@vueuse/core"

const store = useMainStore()
const selectedWeapon = ref(null)
const currentPrice = ref(0)
const hagglesLeft = ref(3)
const tradeMode = ref("buy")

// Example weapons data (you should probably move this to the store)
const weapons = store.merchantItems.weapons

// Watch for weapon selection to reset price
watch(selectedWeapon, (weapon) => {
  if (weapon) {
    currentPrice.value = weapon.price
    hagglesLeft.value = 3
  }
})

const canHaggle = computed(() => hagglesLeft.value > 0)

function haggle() {
  console.log("haggling...")

  if (!canHaggle.value) return

  const reduction = Math.random() * 0.15 // 0-15% reduction
  currentPrice.value = Math.floor(currentPrice.value * (1 - reduction))
  hagglesLeft.value--
}

const canBuy = computed(() => {
  // store.player.gold = 1000
  // store.player.weapons = []

  return selectedWeapon.value && store.player.gold >= currentPrice.value
})

function buyWeapon() {
  if (store.player.weapons.length >= 9) {
    // create message modal
    console.log("You don't have enough room in your inventory.")
    store.infoMessage = "You don't have enough room in your inventory."
    return
  } else {
    console.log("Buying weapon...")
  }

  store.player.gold -= currentPrice.value
  store.addToInventory(selectedWeapon.value, "weapons")
}

// Add default selection
selectedWeapon.value = weapons[0]

// Add this computed property
const displayedWeapons = computed(() => {
  return tradeMode.value === "buy" ? weapons : store.player.weapons
})

// Watch for trade mode changes to reset selection
watch(tradeMode, () => {
  selectedWeapon.value = displayedWeapons.value[0] || null
})

function sellWeapon() {
  console.log("Selling weapon...")
  store.player.gold += selectedWeapon.value.resale
  store.player.weapons = store.player.weapons.filter((weapon) => weapon.uid !== selectedWeapon.value.uid)
  // select the next weapon
  selectedWeapon.value = displayedWeapons.value[0]
}
</script>
