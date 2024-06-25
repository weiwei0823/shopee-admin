<template>
  <yu-layout title="虾皮" class="shopee-container">
    <template #body>
      <div class="shopee">
        <!--筛选区域-->
        <el-divider content-position="left">筛选区域</el-divider>
        <div class="flex flex-wrap gap-4 items-center">
          <!--国家-->
          <el-select-v2
            v-model="countryObj.current"
            :options="countryObj.list"
            placeholder="选择国家"
            style="width: 240px"
            @change="changeCountry"
          />
          <!--商品类别-->
          <el-select-v2
            v-model="categoryObj.current"
            :options="categoryObj.list"
            placeholder="选择商品分类"
            style="width: 240px"
            @change="changeCategory"
          />
          <!--店铺-->
        </div>
        <el-divider content-position="left">店铺列表</el-divider>
        <el-table v-loading="listLoading"
                  :key="`${categoryObj.current}_${pageObj.index}`"
                  :data="shopObj.list"
                  border
                  fit
                  highlight-current-row
                  class="shopTable"
                  style="width: 100%">
          <!--名称-->
          <el-table-column align="center" label="名称" min-width="200">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <span class="shopTable-column">{{ row.name }}</span>
                <template #content>
                  {{ row.name }}
                </template>
              </el-tooltip>
            </template>
          </el-table-column>
          <!--价格-->
          <el-table-column align="center" label="价格" min-width="200">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <span class="shopTable-column">{{ row.price }}</span>
                <template #content>
                  <div class="shopTable-column">最低价：{{ row.price_min }}</div>
                  <div class="shopTable-column">最高价: {{ row.price_max }}</div>
                </template>
              </el-tooltip>
            </template>
          </el-table-column>
          <!--描述-->
          <el-table-column align="center" label="描述" min-width="200">
            <template #default="{ row }">
              <span class="shopTable-column">{{ row.description }}</span>
            </template>
          </el-table-column>
          <!--店铺地址-->
          <el-table-column align="center" label="店铺地址" min-width="200">
            <template #default="{ row }">
              <span class="shopTable-column">{{ row.store_place }}</span>
            </template>
          </el-table-column>
          <!--图片-->
          <el-table-column label="图片" min-width="200">
            <template #default="{ row }">
              <span class="shopTable-column">
                <img class="shopTable-column-img"
                     :src="row.main_image ? row.main_image[0] : ''"
                     alt=""/>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import YuLayout from '@/components/YuLayout'

const listLoading = ref( true )
// 国家
const countryObj = reactive( {
  list : [
    {
      value : 'my',
      label : '马来西亚'
    },
    {
      value : 'ph',
      label : '菲律宾'
    },
    {
      value : 'vn',
      label : '越南'
    },
    {
      value : 'cl',
      label : '智利'
    }
  ],
  current : 'my'
} )

// 商品分类
const categoryObj = reactive( {
  list : [],
  current : ''
} )
// 店铺列表
const shopObj = reactive( {
  all : {}, // 当前国家下的所有category对应的shop列表
  list : [],
  pageList : [],
  current : ''
} )

// 页码配置
const pageObj = reactive( {
  index : 1,
  size : 20
} )
// 获取商品类别列表
const getCategoryList = () => {
  categoryObj.list = []
  categoryObj.current = ''
  listLoading.value = true
  let modulesFiles = []
  switch ( countryObj.current ) {
    case 'cl':
      modulesFiles = import.meta.globEager( `@/datas/polymerization_products/products_cl/*.json` )
      break
    case 'my':
      modulesFiles = import.meta.globEager( `@/datas/polymerization_products/products_my/*.json` )
      break
    case 'ph':
      modulesFiles = import.meta.globEager( `@/datas/polymerization_products/products_ph/*.json` )
      break
    case 'vn':
      modulesFiles = import.meta.globEager( `@/datas/polymerization_products/products_vn/*.json` )
      break
    default:
      return
  }
  // 获取商品分类信息
  Object.keys( modulesFiles ).forEach( keyItem => {
    const tempStr = RegExp( `(?<=products_${countryObj.current}\/).+?(?=\\.json)` ).exec( keyItem )[0]
    categoryObj.list.push( {
      value : tempStr,
      label : tempStr,
      originalKey : keyItem
    } )
    shopObj.all[tempStr] = modulesFiles[keyItem]?.default || []
  } )
  categoryObj.current = categoryObj.list[0]?.value
  getShopList()
  listLoading.value = false
}

// 获取商品类别列表
const getShopList = () => {
  shopObj.list = []
  shopObj.pageList = []
  shopObj.current = ''
  listLoading.value = true
  shopObj.list = shopObj.all[categoryObj.current]
  shopObj.pageList = shopObj.list?.filter( ( item, index ) => {
    return +index >= ( pageObj?.index - 1 ) * pageObj?.size && +index < pageObj?.index * pageObj?.size
  } )
  listLoading.value = false
}

const changeCountry = () => {
  shopObj.all = {}
  getCategoryList()
}
const changeCategory = () => {
  pageObj.index = 1
  getShopList()
}
getCategoryList()
defineOptions( {
  name : 'shopee'
} )
</script>

<style lang="scss" scoped>
.shopee {
  .shopTable {
    width: 100%;

    &-column {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &-img {
        height: 100px;
        object-fit: contain;
      }
    }
  }
}
</style>
