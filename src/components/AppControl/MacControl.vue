<script setup lang="ts">
import {ref} from 'vue'
import {useAppStore} from "stores/appStore";

const appStore = useAppStore()
const isHovering = ref(false)
</script>

<template>
  <div class="ctl-container">
    <div class="window-controls" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
      <div
        class="control-btn close"
        :class="{ 'inactive': !appStore.isWindowActive }"
        @click="appStore.closeWindow()">
        <q-icon v-show="isHovering" name="close" size="10px" class="control-icon"/>
      </div>
      <div
        class="control-btn minimize"
        :class="{ 'inactive': !appStore.isWindowActive }"
        @click="appStore.minimizeWindow()">
        <q-icon v-show="isHovering" name="remove" size="10px" class="control-icon"/>
      </div>
      <div
        class="control-btn maximize"
        :class="{ 'inactive': !appStore.isWindowActive }"
        @click="appStore.maximizeWindow()">
        <q-icon v-show="isHovering" name="fullscreen" size="10px" class="control-icon"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

.window-controls {
  display: flex;
  gap: 8px;
  width: 50px;
  -webkit-app-region: no-drag;
}

.control-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;
}

.control-btn:hover {
  filter: brightness(0.9);
}

.control-btn.close {
  background: #FF5F57;
}

.control-btn.minimize {
  background: #FFBD2E;
}

.control-btn.maximize {
  background: #28CA42;
}

.control-btn.inactive.close {
  background: #D0D0D0;
}

.control-btn.inactive.minimize {
  background: #D0D0D0;
}

.control-btn.inactive.maximize {
  background: #D0D0D0;
}

.control-icon {
  color: rgba(0, 0, 0, 0.7);
  font-size: 8px !important;
  font-weight: bold;
}

.control-btn.inactive .control-icon {
  color: rgba(0, 0, 0, 0.3);
}
</style>
