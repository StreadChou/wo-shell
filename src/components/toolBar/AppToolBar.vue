<script setup lang="ts">
import MacControl from "components/AppControl/MacControl.vue";
import {useViewStore} from "stores/viewStore";

const viewStore = useViewStore()
</script>

<template>
  <q-toolbar>
    <!-- 左侧折叠之后才能看到关闭按钮 -->
    <template v-if="$q.platform.is.mac && !viewStore.leftDrawerOpen">
      <MacControl class="q-electron-drag"></MacControl>
    </template>
  </q-toolbar>
</template>

<style scoped>

</style>
