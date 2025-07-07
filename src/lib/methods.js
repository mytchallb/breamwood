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
  if (percentage <= 25) return "#c14343"
  if (percentage <= 50) return "#c57d00"
  return "#006a26"
}

export const showModalMessage = (message, callback = null) => {
  const store = useMainStore()
  store.infoMessage = message
  store.infoMessageCallback = callback
}
