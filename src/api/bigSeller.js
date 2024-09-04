import httpBigSeller from '@/utils/bigsellerRequest'

const request = createAxiosByInterceptors( {
  baseURL : 'https://www.bigseller.com/api/v1'
} )

export function getDraftList( params ) {
  return httpBigSeller.request( {
    method : 'get',
    url : '/product/global/shopee/draft.json',
    params : {
      bsStatus : 1,
      shopId : '',
      pageNo : 1,
      pageSize : 50,
      inquireType : 0,
      searchType : '',
      searchContent : '',
      ...params
    }
  } )
}
