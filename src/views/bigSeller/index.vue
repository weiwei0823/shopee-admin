<template>
  <div class="bigSeller">
    <!--店铺表格-->
    <el-table ref="tableRef"
              v-loading="draftListLoading"
              :data="draftList"
              border
              fit
              highlight-current-row
              class="bigSellerTable"
    >
      <!--图片-->
      <el-table-column align="center" label="图片" min-width="80">
        <template #default="{ row }">
          <el-image class="bigSeller-cell-image"
                    :src="row.image"
                    fit="cover"
                    lazy
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="[row.image]"
                    :initial-index="0"
                    :z-index="999"
                    :preview-teleported="true"
          />
        </template>
      </el-table-column>
      <!--商品名称-->
      <el-table-column align="center" label="商品名称" min-width="150" fixed>
        <template #default="{ row }">
          <el-tooltip class="bigSeller-tooltip" placement="top">
            <span class="bigSeller-cell">
              {{ row.name }}
            </span>
            <template #content>
              <div>
                <span class="bigSeller-tooltip-title">编号:</span>
                <span>{{ row.id }}</span>
              </div>
            </template>
          </el-tooltip>
        </template>
      </el-table-column>
      <!--价格-->
      <el-table-column align="center" label="价格" min-width="150" fixed>
        <template #default="{ row }">
          <el-tooltip class="bigSeller-tooltip" placement="top">
            <div>
              <div class="bigSeller-cell">
                {{ row.originalPriceStr }}
              </div>
              <div class="bigSeller-cell">
                {{ row.currency }}
              </div>
            </div>
            <template #content>
              <div>
                <span class="bigSeller-tooltip-title">价格: </span>
                <span>{{ row.originalPriceStr }}</span>
              </div>
              <div>
                <span class="bigSeller-tooltip-title">货币: </span>
                <span>{{ row.currency }}</span>
              </div>
            </template>
          </el-tooltip>
        </template>
      </el-table-column>
      <!--来源-->
      <el-table-column align="center" label="商品来源" min-width="150" fixed>
        <template #default="{ row }">
          <el-tooltip class="bigSeller-tooltip" placement="top">
            <div>
              <div class="bigSeller-cell">
                <a :href="row.sourceUrl" target="_blank">{{ row.sourcePlatform }}</a>
              </div>
              <div class="bigSeller-cell">
                {{ row.sourceSite === "PH" ? "菲律宾" : row.sourceSite }}
              </div>
              <div class="bigSeller-cell">
                <a :href="`https://www.bigseller.com/web/crawl/sourceSeeking/1688.htm?imageUrl=${encodeURIComponent(row.image)}`" target="_blank">{{ "1688寻找货源" }}</a>
              </div>
            </div>
            <template #content>
              <div>
                <span class="bigSeller-tooltip-title">编号:</span>
                <span>{{ row.id }}</span>
              </div>
            </template>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref} from 'vue'
import {getBigSellerDraftBox} from '@/api/bigSeller'

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

  &-cell {

    &-image {
      width: 90px;
      height: 90px;
    }
  }
}
</style>
