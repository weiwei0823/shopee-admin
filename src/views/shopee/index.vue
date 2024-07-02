<template>
  <yu-layout title="虾皮" class="shopee-container">
    <template #body>
      <div class="shopee">
        <!--筛选区域-->
        <el-divider class="shopee-condition" content-position="left">
          <span class="shopee-condition-title">筛选区域</span>
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
        </el-divider>
        <div class="flex flex-wrap gap-4 items-center"></div>
        <el-divider content-position="right">
          <el-pagination
            v-model:current-page="pageObj.current"
            v-model:page-size="pageObj.size"
            :page-sizes="[10, 20, 50, 100, 200, 500, 1000]"
            :size="pageObj.size"
            layout="prev, pager, next, jumper, sizes, total"
            :total="shopObj.list?.length || 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-divider>
        <!--店铺表格-->
        <el-table
          ref="tableRef"
          v-loading="listLoading"
          :key="`${categoryObj.current}_${pageObj.current}`"
          :data="shopObj.pageList"
          border
          fit
          highlight-current-row
          class="shopTable"
        >
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
                  <div>
                    <span class="shopTable-tooltip-title">商品ID:</span>
                    <span>{{ row.product_id }}</span>
                  </div>
                  <div>
                    <span class="shopTable-tooltip-title">商品创建时间:</span>
                    <span>{{ getDate(row.ctime) }}</span>
                  </div>
                  <div>
                    <span class="shopTable-tooltip-title">产品分类ID:</span>
                    <span>{{ row.catid }}</span>
                  </div>
                  <div>
                    <span class="shopTable-tooltip-title">店铺ID:</span>
                    <span>{{ row.shop_id }}</span>
                  </div>
                </template>
              </el-tooltip>
            </template>
          </el-table-column>
          <!--商品名称-->
          <el-table-column align="center" label="商品名称" min-width="300">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <span class="shopTable-cell shopTable-cell-name">
                  {{ row.name }}
                </span>
                <template #content>
                  <div>
                    <span class="shopTable-tooltip-title">商品名称:</span>
                    <span>{{ row.name }}</span>
                  </div>
                  <div>
                    <span class="shopTable-tooltip-title">商品描述:</span>
                    <span>{{ row.description }}</span>
                  </div>
                </template>
              </el-tooltip>
            </template>
          </el-table-column>
          <!--价格-->
          <el-table-column align="center" label="价格" min-width="80">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <span class="shopTable-cell shopTable-cell-price">
                  {{
                    row.discount
                      ? Math.round(row.price * (1 - +row.discount?.replace('%', '') / 100) * 1000) / 1000
                      : row.price
                  }}
                </span>
                <template #content>
                  <div>
                    <span class="shopTable-tooltip-title">原价:</span>
                    <span>{{ row.price }}</span>
                  </div>
                  <div>
                    <span class="shopTable-tooltip-title">折扣:</span>
                    <span>{{ row.discount }}</span>
                  </div>
                  <div>
                    <span class="shopTable-tooltip-title">最低价:</span>
                    <span>{{ row.price_min }}</span>
                  </div>
                  <div>
                    <span class="shopTable-tooltip-title">最高价:</span>
                    <span>{{ row.price_max }}</span>
                  </div>
                </template>
              </el-tooltip>
            </template>
          </el-table-column>
          <!--库存-->
          <el-table-column align="center" label="库存" min-width="80">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <span class="shopTable-cell">
                  {{ row.stock }}
                </span>
                <template #content>
                  <div>
                    <span class="shopTable-tooltip-title">库存:</span>
                    <span>{{ row.stock }}</span>
                  </div>
                  <div>
                    <span class="shopTable-tooltip-title">已售出:</span>
                    <span>{{ row.sold }}</span>
                  </div>
                  <div>
                    <span class="shopTable-tooltip-title">历史已售出:</span>
                    <span>{{ row.historical_sold }}</span>
                  </div>
                </template>
              </el-tooltip>
            </template>
          </el-table-column>
          <!--品牌-->
          <el-table-column align="center" label="品牌" min-width="80">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <span class="shopTable-cell">
                  {{ row.brand }}
                </span>
                <template #content>
                  <div>
                    <span class="shopTable-tooltip-title">品牌:</span>
                    <span>{{ row.brand }}</span>
                  </div>
                </template>
              </el-tooltip>
            </template>
          </el-table-column>
          <!--评分-->
          <el-table-column align="center" label="评分" min-width="50">
            <template #default="{ row }">
              <el-tooltip placement="top">
                <span class="shopTable-cell">
                  {{ getRate(row.comment_info) }}
                </span>
                <template #content>
                  <div>共{{ row.comment_info?.comment_count || 0 }}人评分</div>
                  <div>
                    <span>
                      <el-rate :model-value="1" disabled />
                    </span>
                    <span class="shopTable-tooltip-title">{{ row.comment_info?.one_star_count }}</span>
                  </div>
                  <div>
                    <span>
                      <el-rate :model-value="2" disabled />
                    </span>
                    <span class="shopTable-tooltip-title">{{ row.comment_info?.two_star_count }}</span>
                  </div>
                  <div>
                    <span>
                      <el-rate :model-value="3" disabled />
                    </span>
                    <span class="shopTable-tooltip-title">{{ row.comment_info?.three_star_count }}</span>
                  </div>
                  <div>
                    <span>
                      <el-rate :model-value="4" disabled />
                    </span>
                    <span class="shopTable-tooltip-title">{{ row.comment_info?.four_star_count }}</span>
                  </div>
                  <div>
                    <span>
                      <el-rate :model-value="5" disabled />
                    </span>
                    <span class="shopTable-tooltip-title">{{ row.comment_info?.five_star_count }}</span>
                  </div>
                </template>
              </el-tooltip>
            </template>
          </el-table-column>
          <!--图片-->
          <el-table-column align="center" label="图片" min-width="125">
            <template #default="{ row }">
              <el-carousel
                v-if="row.main_image?.length"
                height="100px"
                motion-blur
                class="shopTable-cell-carousel"
                indicator-position="none"
                :autoplay="false"
                @change="(current, last) => changeCarousel(row, current, last)"
              >
                <el-carousel-item v-for="(imgItem, index) in row.main_image" :key="imgItem">
                  <el-image
                    v-if="row.mainImageCurrent === index"
                    class="shopTable-cell-carousel-img"
                    :src="imgItem"
                    fit="cover"
                    lazy
                  />
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-table-column>
          <!--规格-->
          <el-table-column align="center" label="规格型号" min-width="125">
            <template #default="{ row }">
              <div class="shopTable-cell">
                <el-image
                  class="shopTable-cell-img"
                  :src="row.attributes[row.attributeCurrent]?.selectorCurrentImg"
                  fit="cover"
                />
                <div v-for="attributeItem in row.attributes" :key="attributeItem">
                  <el-select
                    v-if="attributeItem?.options?.length"
                    :value="attributeItem.selectorCurrent"
                    placeholder="Select"
                    size="large"
                    style="width: 240px"
                  >
                    <el-option
                      v-for="attributeItemOptionItem in attributeItem?.options"
                      :key="attributeItemOptionItem"
                      :label="attributeItemOptionItem"
                      :value="attributeItemOptionItem"
                    />
                  </el-select>
                  <div v-else>
                    <div>{{ attributeItem?.options?.name }}</div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <!--店铺信息-->
          <el-table-column align="center" label="店铺信息" min-width="125">
            <template #default="{ row }">
              <div>
                <el-image class="shopTable-cell-img" :src="row?.store_info?.store_logo_url" fit="cover" />
              </div>
              <div>
                <el-tooltip placement="top">
                  <span class="shopTable-cell">
                    {{ row?.store_info?.store_name }}
                  </span>
                  <template #content>
                    <div>
                      <span class="shopTable-tooltip-title">店铺名称:</span>
                      <span>{{ row?.store_info?.store_name }}</span>
                    </div>
                    <div>
                      <span class="shopTable-tooltip-title">店铺商品数:</span>
                      <span>{{ row?.store_info?.item_count }}</span>
                    </div>
                    <div>
                      <span class="shopTable-tooltip-title">粉丝:</span>
                      <span>{{ row?.store_info?.follower_count }}</span>
                    </div>
                    <div>
                      <span class="shopTable-tooltip-title">官方店铺:</span>
                      <span>{{ row?.store_info?.is_official_shop ? '是' : '否' }}</span>
                    </div>
                    <div>
                      <span class="shopTable-tooltip-title">店铺评分:</span>
                      <span>{{ row?.store_info?.rating_star }}</span>
                    </div>
                    <div>
                      <span class="shopTable-tooltip-title">聊天回应率:</span>
                      <span>{{ row?.store_info?.response_rate }}%</span>
                    </div>
                    <div>
                      <span class="shopTable-tooltip-title">好评:</span>
                      <span>{{ row?.store_info?.rating_good }}</span>
                    </div>
                    <div>
                      <span class="shopTable-tooltip-title">一般:</span>
                      <span>{{ row?.store_info?.rating_normal }}</span>
                    </div>
                    <div>
                      <span class="shopTable-tooltip-title">差评:</span>
                      <span>{{ row?.store_info?.rating_bad }}</span>
                    </div>
                    <div>
                      <span class="shopTable-tooltip-title">创建时间:</span>
                      <span>{{ getDate(row?.store_info?.store_create_time) }}</span>
                    </div>
                    <div>
                      <span class="shopTable-tooltip-title">店铺地址:</span>
                      <span>{{ row?.store_info?.store_place || row?.store_place }}</span>
                    </div>
                  </template>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <!--操作-->
          <el-table-column align="center" label="操作" min-width="150">
            <!--            <template #default="{ row }">-->
            <!--              <div>上架</div>-->
            <!--              <div>下架</div>-->
            <!--            </template>-->
          </el-table-column>
        </el-table>
        <el-divider content-position="right">
          <el-pagination
            v-model:current-page="pageObj.current"
            v-model:page-size="pageObj.size"
            :page-sizes="[10, 20, 50, 100, 200, 500, 1000]"
            :size="pageObj.size"
            layout="prev, pager, next, jumper, sizes, total"
            :total="shopObj.list?.length || 0"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-divider>
      </div>
    </template>
  </yu-layout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import YuLayout from '@/components/YuLayout/index'

const tableRef = ref( null )

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
  current : 1,
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
      modulesFiles = import.meta.glob( `@/datas/polymerization_products/products_cl/*.json`, { eager : true } )
      break
    case 'my':
      modulesFiles = import.meta.glob( `@/datas/polymerization_products/products_my/*.json`, { eager : true } )
      break
    case 'ph':
      modulesFiles = import.meta.glob( `@/datas/polymerization_products/products_ph/*.json`, { eager : true } )
      break
    case 'vn':
      modulesFiles = import.meta.glob( `@/datas/polymerization_products/products_vn/*.json`, { eager : true } )
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
  // 初始化
  shopObj.list = []
  shopObj.pageList = []
  shopObj.current = ''
  // console.log( tableRef, 'aaaaaaa' )
  // tableRef.value.bodyWrapper.scrollTop = 0
  // 获取数据
  listLoading.value = true
  shopObj.list = shopObj.all[categoryObj.current]?.map( item => {
    item.mainImageCurrent = 0 // 图片下标
    if ( item?.attributes?.length ) {
      item.attributeCurrent = 0
      item?.attributes?.forEach( attributeItem => {
        if ( attributeItem?.name && attributeItem?.options?.length ) {
          attributeItem.selectorCurrent = 0
          attributeItem.selectorCurrentImg = attributeItem?.images?.length ? attributeItem?.images[0] : ''
        }
      } )
    }
    return item
  } )
  shopObj.pageList = shopObj.list?.slice( ( pageObj?.current - 1 ) * pageObj?.size, pageObj?.current * pageObj?.size )
  listLoading.value = false
}

const changeCountry = () => {
  shopObj.all = {}
  getCategoryList()
}
const changeCategory = () => {
  pageObj.current = 1
  getShopList()
}
const changeCarousel = ( row, current, last ) => {
  row.mainImageCurrent = +current || 0
}
const handleSizeChange = val => {
  pageObj.size = val
  pageObj.current = 1
  getShopList()
}
const handleCurrentChange = val => {
  getShopList()
}
// 获取评分
const getRate = commentInfo => {
  if ( +commentInfo?.comment_count ) {
    return (
      Math.round(
        ( 100 *
          ( ( +commentInfo?.one_star_count || 0 ) +
            ( +commentInfo?.two_star_count || 0 ) * 2 +
            ( +commentInfo?.three_star_count || 0 ) * 3 +
            ( +commentInfo?.four_star_count || 0 ) * 4 +
            ( +commentInfo?.five_star_count || 0 ) * 5 ) ) /
          +commentInfo?.comment_count
      ) / 100
    )
  } else {
    return 0
  }
}
const getDateNum = num => {
  if ( +num >= 10 ) {
    return `${num}`
  } else if ( +num >= 0 ) {
    return `0${num}`
  }
}
// 获取日期
const getDate = dateTime => {
  const tempDate = new Date( dateTime * 1000 )
  return `${tempDate.getFullYear()}/${getDateNum( tempDate.getMonth() )}/${getDateNum( tempDate.getDate() )} ${getDateNum(
    tempDate.getHours()
  )}:${getDateNum( tempDate.getMinutes() )}:${getDateNum( tempDate.getSeconds() )}`
}
getCategoryList()
defineOptions( {
  name : 'shopee'
} )
</script>

<style lang="scss" scoped>
.shopee {
  &-container {
    ::v-deep .header {
      display: none;
    }
  }

  &-condition {
    &-title {
      margin-right: 20px;
    }
  }
  .shopTable {
    width: 100%;

    &-cell {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &-name {
        overflow: auto !important;
        text-overflow: initial !important;
        white-space: pre-wrap !important;
      }

      &-price {
        font-size: 16px;
        font-weight: bolder;
        color: #101010;
      }

      &-img {
        height: 100px;
        object-fit: contain;
      }
    }
  }
}

::v-deep {
  .shopTable-tooltip-title {
    font-weight: bolder;
    color: #4dd9d5;
    margin-right: 5px;
  }
}

::v-deep {
  .shopTable-cell-carousel-img {
    height: 100px;
    object-fit: contain;
  }
}
</style>
