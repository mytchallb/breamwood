<template>
  <div class="relative h-full">
    <!-- Background Image -->
    <img src="@/assets/bg-blacksmith.jpg" class="absolute inset-0 w-full h-full object-coverx" alt="Blacksmith workshop" />

    <!-- Content overlay -->
    <div class="relative z-10 p-2 h-full flex gap-2">
      <!-- Weapon list - now on the left -->
      <div class="rounded-lg pr-2 w-1/2">
        <h2 class="text-xl text-white mb-4">Weapons</h2>
        <div class="flex flex-col gap-2 h-full max-h-[87%] overflow-y-auto">
          <button
            v-for="weapon in weapons"
            :key="weapon.id"
            @click="selectedWeapon = weapon"
            :class="[
              'text-left p-1 rounded text-sm font-mono border border-gray-600',
              selectedWeapon?.id === weapon.id ? 'bg-gray-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-200',
            ]"
          >
            {{ weapon.name }}
          </button>
        </div>
      </div>

      <!-- Weapon details - right side -->
      <div class="bg-black/50 rounded-lg p-2 w-1/2 flex-1 text-white">
        <div class="flex flex-col gap-4">
          <!-- Blacksmith icon -->
          <div class="w-12 h-12 bg-gray-700 rounded-lg"></div>

          <div class="flex-1">
            <h2 class="text-xl mb-4">{{ selectedWeapon?.name }}</h2>
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>Damage: {{ selectedWeapon?.damage }}</div>
              <div>Speed: {{ selectedWeapon?.speed }}</div>
              <div>Weight: {{ selectedWeapon?.weight }}</div>
            </div>

            <div class="text-xl my-2">Price: {{ currentPrice }} gold</div>
            <div class="flex items-center gap-4">
              <div class="flex gap-2">
                <button
                  @click="haggle"
                  :disabled="!canHaggle"
                  class="px-3 py-1 text-sm font-mono border border-gray-600 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
                >
                  Haggle
                </button>
                <button
                  @click="buyWeapon"
                  :disabled="store.gold < currentPrice"
                  class="px-3 py-1 text-sm font-mono border border-gray-600 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useMainStore } from "../../stores/store"

const store = useMainStore()
const selectedWeapon = ref(null)
const currentPrice = ref(0)
const hagglesLeft = ref(3)

// Example weapons data (you should probably move this to the store)
const weapons = [
  { id: 1, name: "Iron Sword", damage: "1-10", speed: 1.2, weight: 4, basePrice: 100 },
  { id: 2, name: "Steel Dagger", damage: "1-6", speed: 1.8, weight: 2, basePrice: 80 },
  { id: 3, name: "War Hammer", damage: "1-18", speed: 0.8, weight: 8, basePrice: 150 },
  { id: 4, name: "Battle Axe (+1)", damage: "1-15", speed: 0.9, weight: 6, basePrice: 130 },
  { id: 5, name: "Rapier", damage: "1-8", speed: 1.6, weight: 3, basePrice: 120 },
  { id: 6, name: "Claymore", damage: "1-20", speed: 0.7, weight: 10, basePrice: 200 },
  { id: 7, name: "Shortsword", damage: "1-7", speed: 1.4, weight: 3, basePrice: 90 },
  { id: 8, name: "Mace", damage: "1-12", speed: 1.0, weight: 5, basePrice: 110 },
  { id: 9, name: "Spear", damage: "1-11", speed: 1.3, weight: 4, basePrice: 95 },
  { id: 10, name: "Halberd", damage: "1-16", speed: 0.8, weight: 7, basePrice: 170 },
]

// Watch for weapon selection to reset price
watch(selectedWeapon, (weapon) => {
  if (weapon) {
    currentPrice.value = weapon.basePrice
    hagglesLeft.value = 3
  }
})

const canHaggle = computed(() => hagglesLeft.value > 0)

function haggle() {
  if (!canHaggle.value) return

  const reduction = Math.random() * 0.15 // 0-15% reduction
  currentPrice.value = Math.floor(currentPrice.value * (1 - reduction))
  hagglesLeft.value--
}

function buyWeapon() {
  if (!selectedWeapon.value || store.gold < currentPrice.value) return

  store.gold -= currentPrice.value
  // Add weapon to inventory (implement in store)
  store.addWeapon(selectedWeapon.value)
}

// Add default selection
selectedWeapon.value = weapons[0]
</script>
