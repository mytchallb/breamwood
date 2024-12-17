import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    equipmentModalOpen: false,
    inventoryModalOpen: false,
    isModalOpen: false,
    currentScreen: 'map',
    appState: 'main'
  }),

  getters: {
    // Add getters here if needed
  },

  actions: {
    setCurrentScreen(screen) {
      this.currentScreen = screen
    },
    setAppState(state) {
      this.appState = state
    }
  }
})