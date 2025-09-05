import { defineStore } from 'pinia'
import { ElectronSend } from '@stread/sample-electron-preload/renderer'

export const useAppStore = defineStore('app', {
  state: () => ({
    isWindowActive: true
  }),

  actions: {
    setWindowActive(active: boolean) {
      this.isWindowActive = active
    },

    closeWindow() {
      ElectronSend('AppHandler.close', {})
    },

    minimizeWindow() {
      ElectronSend('AppHandler.minimize', {})
    },

    maximizeWindow() {
      ElectronSend('AppHandler.toggleMaximize', {})
    }
  }
})