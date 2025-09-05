<script setup lang="ts">
import MacControl from "components/AppControl/MacControl.vue";
import DocumentTree from "components/Document/DocumentTree.vue";
</script>

<template>
  <div class="leftDrawer">
    <div>
      <template v-if="$q.platform.is.mac">
        <MacControl style="height: 50px; padding: 15px 0 0 20px" class="q-electron-drag"></MacControl>
      </template>
      <div class="q-px-sm ">
        <q-input model-value="" dense name="" standout label="搜索服务器"></q-input>
      </div>
    </div>
    <DocumentTree></DocumentTree>


  </div>
</template>

<style scoped>


</style>
