<script setup lang="ts">
import MacControl from "components/AppControl/MacControl.vue";
import {useViewStore} from "stores/viewStore";

const viewStore = useViewStore()
</script>

<template>
  <q-toolbar>
    <!-- 左侧折叠之后才能看到关闭按钮 -->
    <Transition name="mac-control">
      <MacControl v-if="$q.platform.is.mac && !viewStore.leftDrawerOpen" class="q-electron-drag"></MacControl>
    </Transition>
  </q-toolbar>
</template>

<style scoped>
.mac-control-enter-active,
.mac-control-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.mac-control-enter-from {
  width: 0;
  opacity: 0;
}

.mac-control-enter-to {
  width: 50px;
  opacity: 1;
}

.mac-control-leave-from {
  width: 50px;
  opacity: 1;
}

.mac-control-leave-to {
  width: 0;
  opacity: 0;
}
</style>
