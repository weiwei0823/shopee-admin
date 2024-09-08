<template>
  <div class="bigSeller">
    <!--筛选区域-->
    <el-affix :offset="0">
      <div class="bigSeller-condition">
        <!--账号-->
        <el-select-v2
            v-model="accountObj.current"
            :options="accountObj.list"
            placeholder="选择账号"
            style="width: 240px"
            @change="changeAccount"
        />
        <!--类目-->
        <el-select-v2
            v-model="typeObj.current"
            :options="typeObj.list"
            placeholder="选择类目"
            style="width: 240px"
            @change="changeType"
        />
      </div>
    </el-affix>
    <el-divider content-position="right">
      <el-pagination
          v-model:current-page="pageObj.current"
          v-model:page-size="pageObj.size"
          :page-sizes="[10, 20, 50, 100, 200, 500, 1000]"
          :size="pageObj.size"
          layout="prev, pager, next, jumper, sizes, total"
          :total="dataObj.list?.length || 0"
          @size-change="handlePageSizeChange"
          @current-change="handlePageCurrentChange"
      />
    </el-divider>
    <!--店铺表格-->
    <el-table
        ref="tableRef"
        v-loading="dataObj.loading"
        :data="dataObj.list"
        border
        fit
        highlight-current-row
        stripe
        class="bigSellerTable"
    >
      <!--选择框-->
      <el-table-column type="selection" width="55"/>
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
                {{ row.sourceSite === 'PH' ? '菲律宾' : row.sourceSite }}
              </div>
              <div class="bigSeller-cell">
                <a
                    :href="`https://www.bigseller.com/web/crawl/sourceSeeking/1688.htm?imageUrl=${encodeURIComponent(
                    row.image
                  )}`"
                    target="_blank"
                >{{ '1688寻找货源' }}</a
                >
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
      <!--图片-->
      <el-table-column align="center" label="图片" min-width="80">
        <template #default="{ row }">
          <el-image
              class="bigSeller-cell-image"
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
              :hide-on-click-modal="true"
          />
        </template>
      </el-table-column>
      <!--操作按钮-->
      <el-table-column fixed="right" label="操作" min-width="80">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="e => handleGoodsEdit(e, row)"> 修改</el-button>
          <el-button link type="primary" size="small" @click="e => handleGoodsOnSale(e, row)"> 上架</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, reactive } from 'vue'
import { getBigSellerDraftBox } from '@/api/bigSeller'
import { ElMessage } from 'element-plus'

// 账号配置
const accountObj = reactive( {
  list : [
    {
      id : 'ldw',
      name : '德伟建材批发部',
      label : '德伟建材批发部',
      value : 'ldw'
    }
  ],
  current : 'ldw'
} )

// 类目配置
const typeObj = reactive( {
  list : [
    {
      value : 'draft',
      label : ' 草稿箱'
    },
    {
      value : 'onLineProduct',
      label : ' 在线产品'
    }
  ],
  current : 'draft'
} )

// 页码配置
const pageObj = reactive( {
  current : 1,
  size : 50
} )

const dataObj = reactive( {
  list : [],
  current : 0,
  loading : false
} )

const changeAccount = function( event ) {
  accountObj.current = event.value
  resetPage()
}

const changeType = function( event ) {
  typeObj.current = event.value
  resetPage()
}

const handleGoodsEdit = function( event, res ) {
  console.log( event, res, 'handleGoodsEdit-------------' )
}

const handleGoodsOnSale = function( event, res ) {
  console.log( event, res, 'handleGoodsOnSale-------------' )
}

const handlePageSizeChange = function( val ) {
  pageObj.size = val
  pageObj.current = 0
  getDataList()
}

const handlePageCurrentChange = function() {
  getDataList()
}

const resetPage = function() {
  pageObj.current = 0
}
const getDataList = function() {
  dataObj.loading = true
  let getDataFun
  switch ( typeObj.current ) {
    case 'draft':
      getDataFun = getBigSellerDraftBox
      break
    case 'onLineProduct':
      getDataFun = getBigSellerDraftBox
      break
    default:
      return
  }
  getDataFun && getDataFun( {
    pageNo : pageObj.current,
    pageSize : pageObj.size
  } ).then( res => {
    if ( +res.data.code === 2001 ) {
      ElMessage( {
        message : res.data.msg || '数据请求出错！！！',
        type : 'error'
      } )
    } else {
      dataObj.list = res.data.data.page.rows || []
    }
    dataObj.loading = false
  } ).catch( err => {
    ElMessage( {
      message : err || '数据请求出错！！！',
      type : 'error'
    } )
    dataObj.loading = false
  } )
}
onBeforeMount( () => {
  getDataList()
} )
</script>

<style lang="scss" scoped>
.bigSeller {
  width: 100%;
  height: 100%;

  &-condition {
    height: 50px;
  }

  &-cell {
    &-image {
      width: 90px;
      height: 90px;
    }
  }
}
</style>
