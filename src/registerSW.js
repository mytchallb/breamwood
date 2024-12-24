import { registerSW } from "virtual:pwa-register"

if ("serviceWorker" in navigator) {
  const updateSW = registerSW({
    onNeedRefresh() {
      if (confirm("New content available. Reload?")) {
        updateSW() // This updates the service worker and reloads the page
      }
    },
    onOfflineReady() {
      console.log("App ready to work offline")
    },
  })
}
