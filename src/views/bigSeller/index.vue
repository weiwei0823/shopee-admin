<template>
  <div class="bigSeller">
    <!--店铺表格-->
    <el-table
        ref="tableRef"
        v-loading="draftListLoading"
        :data="draftList"
        border
        fit
        highlight-current-row
        class="bigSellerTable"
    >
      <!--编号-->
      <el-table-column align="center" label="编号" min-width="50" fixed>
        <template #default="{ row, $index }">
          <el-tooltip class="shopTable-tooltip" placement="top">
            <template #content>
              <div>
                <span class="shopTable-tooltip-title">商品ID:</span>
                <span>{{ row.id }}</span>
              </div>
            </template>
          </el-tooltip>
        </template>
      </el-table-column>
      <!--商品名称-->
      <el-table-column align="center" label="商品名称" min-width="300">
        <template #default="{ row }">
          <image :src="row.image"></image>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { getBigSellerDraftBox } from '@/api/bigSeller'

const draftList = ref( [] )
const draftListLoading = ref( false )

onBeforeMount( () => {
  draftListLoading.value = true
  getBigSellerDraftBox( {
    pageNo : 1,
    pageSize : 50
  } ).then( res => {
    draftList.value = res.data.data.page.rows || []
    draftListLoading.value = false
  } )
} )
</script>

<style lang="scss" scoped>
.bigSeller {
  width: 100%;
  height: 100%;
}
</style>
