<template>
  <div class="bigSeller">
    <!--筛选区域-->
    <el-affix :offset="0">
      <div class="bigSeller-condition">
        <!--账号-->
        <el-select-v2
          v-model="userObj.current"
          :options="userObj.list"
          placeholder="选择账号"
          style="width: 240px"
          @change="changeUser"
        />
        <!--类目-->
        <el-select-v2
          v-model="typeObj.current"
          :options="typeObj.list"
          placeholder="选择类目"
          style="width: 240px"
          @change="changeType"
        />
        <div class="bigSeller-condition-refresh">
          <el-button type="primary" size="small" width @click="handleRefresh">
            {{ `刷新页面` }}
          </el-button>
        </div>
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
      <el-table-column type="selection" width="55" />
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
                <el-button type="primary" size="small" link @click="e => handleGoodsOpenSourceUrl(e, row)">
                  {{ row.sourcePlatform }}
                </el-button>
              </div>
              <div class="bigSeller-cell">
                来源:
                {{ sourceObj.list.find(item => row.sourceSite?.toLocaleLowerCase() === item)?.label || row.sourceSite }}
              </div>
              <div class="bigSeller-cell">
                <el-button type="primary" size="small" link @click="e => handleGoodsOpenSourceSeeking(e, row)">
                  {{ `1688寻找货源` }}
                </el-button>
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
import { onBeforeMount, reactive, ref } from 'vue'
import { getBigSellerDraftBox, getBigSellerUserList } from '@/api/bigSeller'
import { ElMessage } from 'element-plus'

// 账号配置
const userObj = reactive( {
  list : [],
  current : ''
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

// 数据配置
const dataObj = reactive( {
  list : [],
  current : 0,
  loading : false
} )

// 来源配置
const sourceObj = ref( {
  list : [
    {
      label : '菲律宾',
      value : 'ph'
    }
  ]
} )

/**
 * 刷新页面
 * */
const handleRefresh = function() {
  window.location.reload()
}

/**
 * 改变账户
 * */
const changeUser = function() {
  localStorage.setItem( 'userCurrent', userObj.current )
  resetPage()
  getDataList()
}

/**
 * 改变类目
 * */
const changeType = function() {
  localStorage.setItem( 'typeCurrent', typeObj.current )
  resetPage()
  getDataList()
}

/**
 * 打开来源链接
 * */
const handleGoodsOpenSourceUrl = function( event, row ) {
  window.open( row.sourceUrl, '_blank' )
}

/**
 * 通过图片去1688搜索
 * */
const handleGoodsOpenSourceSeeking = function( event, row ) {
  window.open(
    `https://www.bigseller.com/web/crawl/sourceSeeking/1688.htm?imageUrl=${encodeURIComponent( row.image )}`,
    '_blank'
  )
}

/**
 * 商品修改事件处理
 * */
const handleGoodsEdit = function( event, res ) {
  console.log( event, res, 'handleGoodsEdit-------------' )
}

/**
 * 商品上架事件处理
 * */
const handleGoodsOnSale = function( event, res ) {
  console.log( event, res, 'handleGoodsOnSale-------------' )
}

/**
 * 最大显示页数改变事件处理
 * */
const handlePageSizeChange = function( val ) {
  pageObj.size = val
  pageObj.current = 0
  getDataList()
}

/**
 * 当前页码改变事件处理
 * */
const handlePageCurrentChange = function() {
  getDataList()
}

/**
 * 重置页面配置
 * */
const resetPage = function() {
  pageObj.current = 0
}

/**
 * 获取用户数据
 * */
const getUserList = function() {
  return new Promise( resolve => {
    let userList = []
    try {
      userList = JSON.parse( localStorage.getItem( 'userList' ) || '[]' )
    } catch ( e ) {
      localStorage.removeItem( 'userList' )
      userList = []
    }
    if ( userList && userList.length ) {
      getBigSellerUserList().then( res => {
        userList = res.data?.data || []
      } )
      resolve( userList )
    } else {
      if ( !Array.isArray( userList ) ) {
        localStorage.removeItem( 'userList' )
        userList = []
      }
      getBigSellerUserList().then( res => {
        userList = res.data?.data || []
        localStorage.setItem( 'userList', JSON.stringify( userList ) )
        resolve( userList )
      } )
    }
  } )
}

/**
 * 处理用户数据的返回结果
 * */
const handleUserListRes = function( userList ) {
  userObj.list =
    userList?.map( item => {
      return {
        ...item,
        value : item.id,
        label : item.name
      }
    } ) || []
  const userCurrent = localStorage.getItem( 'userCurrent' )
  if ( !userCurrent || !userObj.list.find( item => item.id === userCurrent ) ) {
    userObj.current = userObj.list[0]?.id
  } else {
    userObj.current = userCurrent
  }
}

/**
 * 获取商品数据
 * */
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
  getDataFun &&
    getDataFun( {
      pageNo : pageObj.current,
      pageSize : pageObj.size
    } )
      .then( res => {
        if ( +res.data.code === 200 ) {
          dataObj.list = res.data?.data?.page.rows || []
        } else {
          ElMessage( {
            message : res.data.msg || '数据请求出错！！！',
            type : 'error'
          } )
        }
        dataObj.loading = false
      } )
      .catch( err => {
        ElMessage( {
          message : err || '数据请求出错！！！',
          type : 'error'
        } )
        dataObj.loading = false
      } )
}

/**
 * 生命周期事件，渲染之前执行
 * */
onBeforeMount( () => {
  getUserList().then( res => {
    handleUserListRes( res )
    getDataList()
  } )
} )
</script>

<style lang="scss" scoped>
.bigSeller {
  width: 100%;
  height: 100%;

  &-condition {
    display: flex;
    align-items: center;
    height: 40px;
    margin: 0 20px;

    &-refresh {
      flex: 1;
      text-align: right;
    }
  }

  &-cell {
    &-image {
      width: 90px;
      height: 90px;
    }
  }
}
</style>
