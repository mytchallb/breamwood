import { useMainStore } from '../stores/store'

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