import httpBigSeller from '@/utils/bigsellerRequest'

export function getDraftList( params ) {
  return httpBigSeller.request( {
    method : 'get',
    url : '/product/global/shopee/draft.json',
    data : {
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
