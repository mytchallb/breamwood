<template>
  <div class="relative h-full flex bg-gray-light">
    <!-- Item list -->
    <div class="w-full flex flex-col">
      <div class="flex flex-col h-full bg-white overflow-y-auto m-1 mr-0 bevel-border">
        <button
          v-for="item in displayedItems"
          :key="item.id"
          @click="selectedItem = item"
          :class="['text-left p-1 ', selectedItem?.uid === item.uid ? 'bg-black text-white' : '']"
        >
          {{ item.name }}
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
      <img :src="shopImages[shopType]" class="bevel-border w-full h-[30%] object-cover" :alt="`${shopType} shop`" />

      <div class="flex gap-2 flex-1">
        <!-- Item details -->
        <div class="flex-1 p-1 h-full flex flex-col justify-between">
          <div class="flex flex-1 flex-col justify-between">
            <div class="">
              <h2 class="text-xl tall:mb-1 text-center tall:text-left">{{ selectedItem?.name }}</h2>
              <p class="tall:block hidden leading-4 mb-2 min-h-[54px]">{{ selectedItem?.description }}</p>
            </div>
            <div class="flex flex-col justify-around items-center flex-1">
              <div class="grid grid-cols-[auto_auto] gap-1 leading-4 min-w-[100px]">
                <template v-for="(value, key) in itemStats" :key="key">
                  <span>{{ key }}:</span>
                  <span>{{ value }}</span>
                </template>
              </div>

              <div class="text-xl flex justify-between gap-2 mb-2 text-center text-yellow">
                <span class="text-right">{{ tradeMode === "buy" ? selectedItem?.price : (selectedItem?.resale ?? 0) }}</span>
                <span class="text-left">GOLD</span>
              </div>
            </div>
          </div>

          <div class="flex gap-2 w-full justify-around">
            <template v-if="tradeMode === 'buy'">
              <Button text="Haggle" :onClick="haggle" :disabled="!canHaggle" />
              <Button text="Buy" :onClick="buyItem" :disabled="!canBuy" :highlight="true" />
            </template>
            <template v-else>
              <Button text="Sell" :onClick="sellItem" :disabled="!selectedItem" :highlight="true" />
            </template>
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

const props = defineProps({
  shopType: {
    type: String,
    required: true,
    validator: (value) => ["weapons", "armor", "items"].includes(value),
  },
})

const store = useMainStore()
const selectedItem = ref(null)
const currentPrice = ref(0)
const hagglesLeft = ref(3)
const tradeMode = ref("buy")
const inventory = ref([])

// Get items based on shop type
const items = computed(() => store.merchantItems[props.shopType])

// Shop images mapping
const shopImages = {
  weapons: new URL("@/assets/bg-blacksmith.jpg", import.meta.url).href,
  armor: new URL("@/assets/bg-armour.jpg", import.meta.url).href,
  items: new URL("@/assets/bg-market.jpg", import.meta.url).href,
}

// Dynamic stats based on item type
const itemStats = computed(() => {
  if (!selectedItem.value) return {}

  const stats = {
    Weight: selectedItem.value?.weight ?? "N/A",
  }

  switch (props.shopType) {
    case "weapons":
      return {
        ...stats,
        Damage: selectedItem.value?.damage ?? "N/A",
        Speed: selectedItem.value?.speed ?? "N/A",
      }
    case "armor":
      return {
        ...stats,
        Defense: selectedItem.value?.defense ?? "N/A",
      }
    case "items":
      return {
        ...stats,
        Effect: selectedItem.value?.stats ?? "N/A",
      }
  }
})

// Update displayed items based on trade mode
const displayedItems = computed(() => {
  if (tradeMode.value === "buy") {
    return items.value || []
  }
  return inventory.value
})

// Watch for weapon selection to reset price
watch(selectedItem, (item) => {
  if (item) {
    currentPrice.value = item.price || 0
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

  return selectedItem.value && store.player.gold >= currentPrice.value
})

function buyItem() {
  if (!selectedItem.value) {
    store.infoMessage = "Please select an item first."
    return
  }

  if (!store.player.gold || store.player.gold < currentPrice.value) {
    store.infoMessage = "Not enough gold!"
    return
  }

  if (inventory.value.length >= 9) {
    store.infoMessage = "You don't have enough room in your inventory."
    return
  }

  store.player.gold -= currentPrice.value
  store.addToInventory(selectedItem.value, props.shopType)
  syncInventory()
}

// Watch for trade mode changes to reset selection
watch(tradeMode, () => {
  syncInventory()
  selectedItem.value = displayedItems.value[0] || null
})

function sellItem() {
  if (!selectedItem.value) {
    store.infoMessage = "Please select an item first."
    return
  }

  const resalePrice = selectedItem.value?.resale ?? 0
  store.player.gold += resalePrice
  store.player[props.shopType] = inventory.value.filter((item) => item.uid !== selectedItem.value.uid)

  syncInventory()
  selectedItem.value = displayedItems.value[0] || null
}

// Add inventory sync function
function syncInventory() {
  if (!store.player[props.shopType]) {
    store.player[props.shopType] = []
  }
  inventory.value = store.player[props.shopType]
}

// Initialize component
onMounted(() => {
  console.log("Initializing shop:", props.shopType)
  syncInventory()
  selectedItem.value = displayedItems.value[0] || null
})
</script>
