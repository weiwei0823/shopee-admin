<template>
  <div v-loading="dataObj.loading" class="bigSeller">
    <!--筛选区域-->
    <el-affix :offset="0">
      <div class="bigSeller-condition">
        <!--账号-->
        <el-select-v2
          v-model="conditionObj.user.current"
          :options="conditionObj.user.list"
          placeholder="选择账号"
          style="width: 150px"
          @change="changeCondition('user')"
        />
        <!--类目-->
        <el-select-v2
          v-model="conditionObj.category.current"
          :options="conditionObj.category.list"
          placeholder="选择类目"
          style="width: 150px"
          @change="changeCondition('type')"
        />
        <!--二级类目-->
        <el-select-v2 v-if="conditionObj.category.current === 'collect'"
                      v-model="conditionObj.collectSub.current"
                      :options="conditionObj.collectSub.list"
                      placeholder="选择类目"
                      style="width: 150px"
                      @change="changeCondition('collectType')"
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
        :page-sizes="pageObj.list"
        :size="pageObj.size"
        layout="prev, pager, next, jumper, sizes, total"
        :total="pageObj.total || 0"
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
      />
    </el-divider>
    <!--店铺表格-->
    <el-table
      ref="tableRef"
      :data="dataObj.list"
      border
      fit
      highlight-current-row
      stripe
      class="bigSellerTable"
    >
      <!--选择框-->
      <el-table-column type="selection" width="55" />
      <!--编号-->
      <el-table-column align="center" label="编号" min-width="50" fixed>
        <template #default="{ row, $index }">
          <el-tooltip class="shopTable-tooltip" placement="top">
                <span class="shopTable-cell">
                  {{ pageObj.size * (pageObj.current - 1) + $index + 1 }}
                </span>
            <template #content>
              <div>
                <span class="shopTable-tooltip-title">编号:</span>
                <span>{{ pageObj.size * (pageObj.current - 1) + $index + 1 }}</span>
              </div>
            </template>
          </el-tooltip>
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
      <el-table-column align="center" label="价格" min-width="80" fixed>
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
                {{ sourceObj.list.find(item => row.sourceSite?.toLowerCase() === item.value)?.label || row.sourceSite }}
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
      <el-table-column fixed="right" align="center" label="操作" min-width="80">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleGoodsOper('edit', row)">修改</el-button>
          <el-button link type="primary" size="small" @click="handleGoodsOper('shelving', row)">上架</el-button>
          <el-button link type="primary" size="small" @click="handleGoodsOper('delete', row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider content-position="right">
      <el-pagination
          v-model:current-page="pageObj.current"
          v-model:page-size="pageObj.size"
          :page-sizes="pageObj.list"
          :size="pageObj.size"
          :total="pageObj.total || 0"
          layout="prev, pager, next, jumper, sizes, total"
          @size-change="handlePageSizeChange"
          @current-change="handlePageCurrentChange"
      />
    </el-divider>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import {
  getBigSellerCollectList,
  getBigSellerDraftBox,
  getBigSellerOnLineProduct,
  getBigSellerUserList
} from '@/api/bigSeller'
import { ElMessage } from 'element-plus'

// 筛选区域配置
const conditionObj = reactive( {
  user : {
    list : [],
    current : ''
  },
  category : {
    list : [
      {
        value : 'collect',
        label : '1、采集区'
      },
      {
        value : 'draft',
        label : '2、草稿箱'
      },
      {
        value : 'onLine',
        label : '3、在线产品'
      }
    ],
    current : 'draft'
  },
  collectSub : {
    list : [
      {
        value : -1,
        label : '全部'
      },
      {
        value : 0,
        label : '未认领'
      },
      {
        value : 1,
        label : '已认领'
      }
    ],
    current : 0
  }
} )

// 页码配置
const pageObj = reactive( {
  list : [10, 20, 50, 100, 200, 500, 1000],
  current : 1,
  size : 50,
  total : 0
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
 * 筛选区域改变事件
 * */
const changeCondition = function( type ) {
  switch ( type ) {
    case 'user':
      localStorage.setItem( 'userCurrent', conditionObj.user.current )
      resetPage()
      getDataList()
      break
    case 'type':
      localStorage.setItem( 'typeCurrent', conditionObj.category.current )
      if ( conditionObj.category.current === 'collect' ) {
        conditionObj.collectSub.current = 0
      }
      resetPage()
      getDataList()
      break
    case 'collectType':
      resetPage()
      getDataList()
      break
    default:
      ElMessage( {
        message : '筛选区域事件不存在!!!',
        type : 'error'
      } )
  }
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
 * 商品事件处理
 * @param {string} event 事件：1、edit-修改 2、shelving-上架 3、delete-删除
 * @param {Object} rowData 行数据
 * */
const handleGoodsOper = function( event, rowData ) {
  // todo
  switch ( event ) {
    case 'edit':
      break
    case 'shelving':
      break
    case 'delete':
      break
    default:
      ElMessage( {
        message : '商品事件不存在!!!',
        type : 'error'
      } )
  }
}

/**
 * 最大显示页数改变事件处理
 * */
const handlePageSizeChange = function( val ) {
  localStorage.setItem( 'pageSize', val )
  pageObj.size = val
  pageObj.current = 1
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
  pageObj.current = 1
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
  conditionObj.user.list =
    userList?.map( item => {
      return {
        ...item,
        value : item.id,
        label : item.name
      }
    } ) || []
}

/**
 * 获取默认数据及配置
 * */
const handleDefaultConfig = function() {
  // 获取当前用户
  const userCurrent = localStorage.getItem( 'userCurrent' )
  if ( !userCurrent || !conditionObj.user.list.find( item => item.value === userCurrent ) ) {
    conditionObj.user.current = conditionObj.user.list[0]?.id
  } else {
    conditionObj.user.current = userCurrent
  }
  // 获取当前类目
  const typeCurrent = localStorage.getItem( 'typeCurrent' )
  if ( !typeCurrent || !conditionObj.category.list.find( item => item.value === typeCurrent ) ) {
    conditionObj.category.current = conditionObj.category.list[0]?.value
  } else {
    conditionObj.category.current = typeCurrent
  }
  // 获取当前页面展示条数
  const pageSize = localStorage.getItem( 'pageSize' )
  if ( !pageSize || !pageObj.list.find( item => +item === +pageSize ) ) {
    // 默认50
    pageObj.size = +50
  } else {
    pageObj.size = +pageSize
  }
}

/**
 * 获取商品数据
 * */
const getDataList = function() {
  dataObj.loading = true
  let getDataFun
  let params = {
    userId : conditionObj.user.current,
    pageNo : pageObj.current,
    pageSize : pageObj.size
  }
  switch ( conditionObj.category.current ) {
    case 'collect':
      getDataFun = getBigSellerCollectList
      params = {
        ...params,
        claimStatus : conditionObj.collectSub.current
      }
      break
    case 'draft':
      getDataFun = getBigSellerDraftBox
      break
    case 'onLine':
      getDataFun = getBigSellerOnLineProduct
      break
    default:
      return
  }
  getDataFun && getDataFun( params ).then( res => {
    if ( +res.data.code === 200 && +res.data?.data.code !== 2001 ) {
      dataObj.list = res?.data?.data?.data?.page?.rows || []
      pageObj.total = +res?.data?.data?.data?.page?.totalSize || 0
    } else {
      ElMessage( {
        message : res.data?.data?.msg || '数据请求出错！！！',
        type : 'error'
      } )
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

/**
 * 生命周期事件，渲染之前执行
 * */
onBeforeMount( () => {
  getUserList().then( res => {
    handleUserListRes( res )
    handleDefaultConfig()
    getDataList()
  } )
} )
</script>

<style lang="scss" scoped>
.bigSeller {
  width: 100%;
  height: 100vh;

  &-condition {
    display: flex;
    align-items: center;
    height: 40px;
    margin: 0 20px;
    background: rgba(255, 255, 255, 0.8);

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
