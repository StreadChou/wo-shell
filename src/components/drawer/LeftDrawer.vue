<script setup lang="ts">
import MacControl from "components/AppControl/MacControl.vue";
import DocumentTree from "components/Document/DocumentTree.vue";
import {useDocumentsStore} from "src/stores/documentsStore";

const documentsStore = useDocumentsStore();
</script>

<template>
  <div class="leftDrawer">
    <div>
      <template v-if="$q.platform.is.mac">
        <MacControl style="height: 50px; padding: 15px 0 0 20px" class="q-electron-drag"></MacControl>
      </template>
      <div class="q-px-sm ">
        <q-input
          v-model="documentsStore.searchQuery"
          dense
          standout
          label="搜索服务器"
          clearable
          @clear="documentsStore.clearSearch"
          name=""
        >
          <template v-slot:prepend>
            <q-icon name="search"/>
          </template>
        </q-input>
      </div>
    </div>

    <div v-for="document in documentsStore.filteredDocuments" :key="document.id">
      <DocumentTree :document="document"></DocumentTree>
    </div>


  </div>
</template>

<style scoped>


</style>
