import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    equipmentModalOpen: false,
    inventoryModalOpen: false,
    isModalOpen: false,
    currentScreen: 'map'
  }),

  getters: {
    // Add getters here if needed
  },

  actions: {
    setCurrentScreen(screen) {
      this.currentScreen = screen
    }
  }
})