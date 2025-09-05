import { defineStore, acceptHMRUpdate } from 'pinia';

export const useViewStore = defineStore('view', {
  state: () => ({
    leftDrawerOpen: true,
  }),

  getters: {
    isLeftDrawerOpen: (state) => state.leftDrawerOpen,
  },

  actions: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    
    setLeftDrawerOpen(open: boolean) {
      this.leftDrawerOpen = open;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useViewStore, import.meta.hot));
}