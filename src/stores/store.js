import { defineStore } from "pinia"

export const useMainStore = defineStore("main", {
  state: () => ({
    equipmentModalOpen: false,
    inventoryModalOpen: false,
    isModalOpen: false,
    currentScreen: "map",
    appState: "main",
    newGame: true,
    appOpen: false,
    playerClassBuffs: [
      {
        name: "warrior",
        buffs: [
          {
            strength: 2,
          },
          {
            defense: 1,
          },
        ],
      },
      {
        name: "rogue",
        buffs: [
          {
            agility: 2,
          },
          {
            criticalHit: 1.5,
          },
        ],
      },
      {
        name: "paladin",
        buffs: [
          {
            defense: 3,
          },
          {
            health: 5,
          },
        ],
      },
    ],

    player: {
      name: "",
      classType: "",
      stats: {
        health: 10,
        stamina: 100,
        sanity: 100,
        hunger: 100,
      },
      skills: {
        strength: 0, // don't need name or base as everything is hardcoded
        agility: 0,
        defense: 0,
        criticalHit: 0,
      },
    },
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
    },
    startGame() {
      console.log("starting game...")
      this.newGame = false
    },
    setPlayerName(name) {
      this.playerName = name
    },
    setPlayerClass(type) {
      this.playerClass = type
    },
  },
})
