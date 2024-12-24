import { defineStore } from "pinia"

export const merchantStore = defineStore("merchant", {
  state: () => ({}),
})

export const useMainStore = defineStore("main", {
  state: () => ({
    equipmentModalOpen: false,
    inventoryModalOpen: false,
    isModalOpen: false,
    currentScreen: "map",
    appState: "main",
    newGame: true,
    appOpen: false,
    merchantItems: {
      weapons: [
        { id: 1, name: "Iron Sword", description: "A basic sword made of iron.", damage: "1-10", speed: 1.2, weight: 4, price: 100 },
        { id: 2, name: "Steel Dagger", description: "A sharp dagger made of steel.", damage: "1-6", speed: 1.8, weight: 2, price: 80 },
        { id: 3, name: "War Hammer", description: "A heavy hammer used for crushing enemies.", damage: "1-18", speed: 0.8, weight: 8, price: 150 },
        { id: 4, name: "Battle Axe (+1)", description: "A powerful battle axe with a +1 damage bonus.", damage: "1-15", speed: 0.9, weight: 6, price: 130 },
        { id: 5, name: "Rapier", description: "A light, quick sword.", damage: "1-8", speed: 1.6, weight: 3, price: 120 },
        { id: 6, name: "Claymore", description: "A large sword with a wide blade.", damage: "1-20", speed: 0.7, weight: 10, price: 200 },
        { id: 7, name: "Shortsword", description: "A small, quick sword.", damage: "1-7", speed: 1.4, weight: 3, price: 90 },
        { id: 8, name: "Mace", description: "A heavy mace used for crushing enemies.", damage: "1-12", speed: 1.0, weight: 5, price: 110 },
        { id: 9, name: "Spear", description: "A long spear used for piercing enemies.", damage: "1-11", speed: 1.3, weight: 4, price: 95 },
        { id: 10, name: "Halberd", description: "A long spear with a heavy blade.", damage: "1-16", speed: 0.8, weight: 7, price: 170 },
        { id: 11, name: "Longsword", description: "A versatile sword with a long blade.", damage: "1-14", speed: 1.1, weight: 5, price: 110 },
        { id: 12, name: "Battle Axe", description: "A heavy battle axe with a wide blade.", damage: "1-15", speed: 0.9, weight: 6, price: 130 },
        { id: 13, name: "Shortsword", description: "A small, quick sword.", damage: "1-8", speed: 1.6, weight: 3, price: 120 },
        { id: 14, name: "Claymore", description: "A large sword with a wide blade.", damage: "1-20", speed: 0.7, weight: 10, price: 200 },
        { id: 15, name: "Longsword", description: "A versatile sword with a long blade.", damage: "1-14", speed: 1.1, weight: 5, price: 110 },
        { id: 16, name: "Halberd", description: "A long spear with a heavy blade.", damage: "1-16", speed: 0.8, weight: 7, price: 170 },
      ],
      armor: [],
      general: [],
    },
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
      level: 1,
      xp: 0,
      xpMax: 100,
      gold: 200,
      items: [],
      equipment: [],

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
    resetState() {
      this.$reset()
    },
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
      this.player.name = name
    },
    setPlayerClass(type) {
      this.player.classType = type
    },
  },

  persist: true,
})
