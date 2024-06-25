<template>
  <yu-layout title="虾皮">
    <template #body>
      <div class="section-container">
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
        <el-table v-loading="listLoading" :data="shopObj.list" border fit highlight-current-row style="width: 100%">
          <el-table-column align="center" label="名称" width="100">
            <template #default="{ row }">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column width="180px" align="center" label="描述">
            <template #default="{ row }">
              <span>{{ row.description }}</span>
            </template>
          </el-table-column>

          <el-table-column width="110px" align="center" label="店铺地址">
            <template #default="{ row }">
              <span>{{ row.store_place }}</span>
            </template>
          </el-table-column>

          <el-table-column width="100px" label="图片">
            <template #default="{ row }">
              <span>
                <img :src="row.main_image[0]" alt="" />
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
  fileList : [],
  current : '',
  currentFile : ''
} )
// 店铺列表
const shopObj = reactive( {
  list : [],
  current : ''
} )

// 页码配置
const pageObj = reactive( {
  index : 1,
  size : 20
} )
// 获取商品类别列表
const getCategoryList = () => {
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
  Object.keys( modulesFiles ).forEach( item => {
    categoryObj.fileList.push( modulesFiles[item]?.default || [] )
    const tempStr = RegExp( `(?<=products_${countryObj.current}\/).+?(?=\\.json)` ).exec( item )[0]
    categoryObj.list.push( {
      value : tempStr,
      label : tempStr
    } )
  } )
  categoryObj.currentFile = categoryObj.fileList[0]
  categoryObj.current = categoryObj.list[0]?.value
  getShopList()
  listLoading.value = false
}

// 获取商品类别列表
const getShopList = () => {
  listLoading.value = true
  shopObj.list = categoryObj.fileList?.filter( ( item, index ) => {
    return +index >= ( pageObj?.index - 1 ) * pageObj?.size && +index < pageObj?.index * pageObj?.size
  } )
  listLoading.value = false
}

const changeCountry = value => {
  getCategoryList()
}
const changeCategory = value => {}
getCategoryList()
defineOptions( {
  name : 'shopee'
} )
</script>

<style lang="scss" scoped></style>
