<template>
  <yu-layout title="BigSeller" class="bigSeller-container">
    <template #body> 11111 </template>
  </yu-layout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { getDraftList } from '@/api/bigSeller'
import YuLayout from '@/components/YuLayout/index.js'

onBeforeMount( () => {
  getDraftList( {
    pageNo : 1,
    pageSize : 50
  } )
} )
</script>

<style lang="scss" scoped></style>
