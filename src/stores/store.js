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
    merchantItems: {
      weapons: [
        { id: 1, uid: 1, name: "Iron Sword", description: "A basic sword made of iron.", damage: "1-10", speed: 1.2, weight: 4, price: 100, resale: 50 },
        { id: 2, uid: 2, name: "Steel Dagger", description: "A sharp dagger made of steel.", damage: "1-6", speed: 1.8, weight: 2, price: 80, resale: 40 },
        {
          id: 3,
          uid: 3,
          name: "War Hammer",
          description: "A heavy hammer used for crushing enemies.",
          damage: "1-18",
          speed: 0.8,
          weight: 8,
          price: 150,
          resale: 75,
        },
        {
          id: 4,
          uid: 4,
          name: "Battle Axe (+1)",
          description: "A powerful battle axe with a +1 damage bonus.",
          damage: "1-15",
          speed: 0.9,
          weight: 6,
          price: 130,
          resale: 65,
        },
        { id: 5, uid: 5, name: "Rapier", description: "A light, quick sword.", damage: "1-8", speed: 1.6, weight: 3, price: 120, resale: 60 },
        { id: 6, uid: 6, name: "Claymore", description: "A large sword with a wide blade.", damage: "1-20", speed: 0.7, weight: 10, price: 200, resale: 100 },
        { id: 7, uid: 7, name: "Shortsword", description: "A small, quick sword.", damage: "1-7", speed: 1.4, weight: 3, price: 90, resale: 45 },
        { id: 8, uid: 8, name: "Mace", description: "A heavy mace used for crushing enemies.", damage: "1-12", speed: 1.0, weight: 5, price: 110, resale: 55 },
        {
          id: 9,
          uid: 9,
          name: "Spear",
          description: "A long spear used for piercing enemies.",
          damage: "1-11",
          speed: 1.3,
          weight: 4,
          price: 95,
          resale: 47.5,
        },
        { id: 10, uid: 10, name: "Halberd", description: "A long spear with a heavy blade.", damage: "1-16", speed: 0.8, weight: 7, price: 170, resale: 85 },
        {
          id: 11,
          uid: 11,
          name: "Longsword",
          description: "A versatile sword with a long blade.",
          damage: "1-14",
          speed: 1.1,
          weight: 5,
          price: 110,
          resale: 55,
        },
        {
          id: 12,
          uid: 12,
          name: "Battle Axe",
          description: "A heavy battle axe with a wide blade.",
          damage: "1-15",
          speed: 0.9,
          weight: 6,
          price: 130,
          resale: 65,
        },
        { id: 13, uid: 13, name: "Shortsword", description: "A small, quick sword.", damage: "1-8", speed: 1.6, weight: 3, price: 120, resale: 60 },
        { id: 14, uid: 14, name: "Claymore", description: "A large sword with a wide blade.", damage: "1-20", speed: 0.7, weight: 10, price: 200, resale: 100 },
        {
          id: 15,
          uid: 15,
          name: "Longsword",
          description: "A versatile sword with a long blade.",
          damage: "1-14",
          speed: 1.1,
          weight: 5,
          price: 110,
          resale: 55,
        },
        { id: 16, uid: 16, name: "Halberd", description: "A long spear with a heavy blade.", damage: "1-16", speed: 0.8, weight: 7, price: 170, resale: 85 },
      ],
      armor: [
        { id: 1, uid: 1, name: "Leather Armor", description: "A basic armor made of leather.", defense: 1, weight: 5, price: 50, resale: 25 },
        { id: 2, uid: 2, name: "Chainmail", description: "A sturdy armor made of chainmail.", defense: 2, weight: 8, price: 100, resale: 50 },
        { id: 3, uid: 3, name: "Plate Armor", description: "A heavy armor made of plate.", defense: 3, weight: 12, price: 200, resale: 100 },
      ],
      items: [
        { id: 1, uid: 1, name: "Health Potion", description: "A basic healing potion.", stats: "+20 Health", weight: 1, price: 10, resale: 5 },
        { id: 2, uid: 2, name: "Super Health Potion", description: "A major healing potion.", stats: "+50 Health", weight: 1, price: 20, resale: 10 },
        { id: 3, uid: 3, name: "Strength Potion", description: "A temporary attack boost.", stats: "+10 Attack", weight: 1, price: 15, resale: 7.5 },
        { id: 4, uid: 4, name: "Defense Potion", description: "A temporary defense boost.", stats: "+10 Defense", weight: 1, price: 15, resale: 7.5 },
        { id: 5, uid: 5, name: "Speed Potion", description: "A temporary agility boost.", stats: "+10 Agility", weight: 1, price: 15, resale: 7.5 },
        { id: 6, uid: 6, name: "Antidote", description: "A cure for poison.", stats: "-Poison", weight: 1, price: 10, resale: 5 },
        { id: 7, uid: 7, name: "Revival Item", description: "A resurrection item.", stats: "-Death", weight: 1, price: 50, resale: 25 },
        { id: 8, uid: 8, name: "Throwing Weapons", description: "A set of throwing weapons.", stats: "-Throwing Weapons", weight: 1, price: 20, resale: 10 },
      ],
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
      weapons: [],
      armor: [],
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
    _lastUid: 0,
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
    generateUid() {
      this._lastUid += 1
      return this._lastUid
    },
    addToInventory(item, type = "items") {
      const inventoryItem = {
        ...item,
        uid: this.generateUid(),
      }
      this.player[type].push(inventoryItem)
      return inventoryItem
    },
  },

  persist: true,
})
