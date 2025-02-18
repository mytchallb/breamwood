import { useMainStore } from "../stores/store"

export function toggleEquipment() {
  const store = useMainStore()
  store.equipmentModalOpen = !store.equipmentModalOpen
  store.isModalOpen = store.equipmentModalOpen
}

export function toggleInventory() {
  const store = useMainStore()
  store.inventoryModalOpen = !store.inventoryModalOpen
  store.isModalOpen = store.inventoryModalOpen
}

export const getHealthColor = (percentage) => {
  if (percentage <= 25) return "bg-[#c14343]"
  if (percentage <= 50) return "bg-[#e49f28]"
  return "bg-[#109a41]"
}
