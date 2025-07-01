<template>
  <div class="relative h-full flex flex-col bg-gray-light">
    <!-- Image with flex-shrink-0 to maintain size -->
    <img :src="shopImages[shopType]" class="bevel-border w-full h-[15vh] flex-shrink-0 object-cover" :alt="`${shopType} shop`" />

    <!-- Content columns - Using flex-1 to take remaining space -->
    <div class="flex flex-1 min-h-0">
      <!-- Item list -->
      <div class="w-full flex flex-col min-h-0">
        <div class="flex-1 flex flex-col bg-white m-1 mr-0 bevel-border min-h-0 overflow-y-auto">
          <button
            v-for="item in displayedItems"
            :key="item.id"
            @click="selectedItem = item"
            :class="['text-left p-1 ', selectedItem?.uid === item.uid ? 'bg-black text-white' : '']"
          >
            {{ item.name }}
          </button>
        </div>
        <div class="flex justify-around items-center p-2 flex-shrink-0">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="mode" value="buy" v-model="tradeMode" />
            Buy
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="mode" value="sell" v-model="tradeMode" />
            Sell
          </label>
        </div>
      </div>

      <!-- Description -->
      <div class="w-full p-1 flex flex-col min-h-0">
        <div class="flex gap-2 flex-1 min-h-0">
          <!-- Item details -->
          <div class="flex-1 p-1 flex flex-col justify-between">
            <div class="flex flex-1 flex-col justify-between">
              <div class="relative text-center">
                <img
                  :src="selectedItem?.image || defaultItemImage"
                  class="absolute bevel-border-reverse -top-10 z-20 left-1/2 -translate-x-1/2 w-12 h-12 object-cover"
                  alt="Item"
                />
                <h2 class="text-xl tall:mb-1 mt-4 normal-line-height">{{ selectedItem?.name }}</h2>
                <p class="tall:block hidden leading-4 min-h-[54px]">{{ selectedItem?.description }}</p>
              </div>
              <div class="flex flex-col justify-around items-center flex-1">
                <div class="grid grid-cols-[auto_auto] gap-1 my-2 leading-4 min-w-[100px] w-full">
                  <template v-for="(value, key) in itemStats" :key="key">
                    <div class="flex justify-between p-1 bevel-border bg-[#bcbcbc] col-span-2">
                      <span class="leading-4 capitalize">{{ key }}</span>
                      <span class="leading-4">{{ value }}</span>
                    </div>
                  </template>
                </div>

                <div class="text-xl flex justify-between mb-2 text-center text-yellow">
                  <img src="@/assets/goldPile.png" class="w-12 h-6 object-contain" />
                  <span class="min-w-[50px]">{{ tradeMode === "buy" ? selectedItem?.price : (selectedItem?.resale ?? 0) }}</span>
                  <span class="text-left">GOLD</span>
                </div>
              </div>
            </div>

            <div class="flex gap-2 w-full justify-around">
              <Button v-if="tradeMode === 'buy'" text="Buy" :onClick="buyItem" :highlight="true" />
              <Button v-else text="Sell" :onClick="sellItem" :disabled="!selectedItem" :highlight="true" />
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

const defaultItemImage = new URL("@/assets/iconItemDefault.jpg", import.meta.url).href

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
  if (!canBuy.value) {
    store.infoMessage = "Not enough gold!"
    return
  }

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

  store.infoMessage = `The ${selectedItem.value.name} has been added to your inventory.`
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
  store.infoMessage = `You part with your ${selectedItem.value.name} for ${resalePrice} gold.`

  selectedItem.value = displayedItems.value[0] || null

  // if that was the last item then switch to buy mode
  // if (inventory.value.length === 0) {
  //   tradeMode.value = "buy"
  // }
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

const hasInventoryItems = computed(() => {
  return store.player[props.shopType]?.length > 0
})
</script>
