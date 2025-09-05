<template>
  <q-page>
    123
    <q-btn label="隐藏/显示左侧导航栏" @click="viewStore.toggleLeftDrawer()"></q-btn>
  </q-page>
</template>

<script setup lang="ts">
import {useViewStore} from "stores/viewStore";

const viewStore = useViewStore()

</script>
