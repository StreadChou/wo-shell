<template>
  <q-layout view="lHr LpR lFr">

    <q-header reveal elevated class="bg-grey-2 text-white q-electron-drag">
      <AppToolBar></AppToolBar>
    </q-header>

    <q-drawer v-model="viewStore.leftDrawerOpen"
              class="drawer" side="left" bordered behavior="desktop" :width="200">
      <LeftDrawer></LeftDrawer>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts" setup>
import {useViewStore} from 'src/stores/viewStore'
import LeftDrawer from "components/drawer/LeftDrawer.vue";
import AppToolBar from "components/toolBar/AppToolBar.vue";

const viewStore = useViewStore()
</script>

<style>
.drawer {
  background: #D1D5D4;
}
</style>
