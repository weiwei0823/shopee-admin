import httpBigSeller from '@/utils/bigsellerRequest'

export function getBigSellerUserList( params ) {
  return httpBigSeller.request( {
    method : 'get',
    url : '/getBigSellerUserList',
    data : {
      ...params
    }
  } )
}

export function getBigSellerDraftBox( params ) {
  return httpBigSeller.request( {
    method : 'post',
    url : '/getBigSellerDraftBox',
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

export function getBigSellerOnLineProduct( params ) {
  return httpBigSeller.request( {
    method : 'post',
    url : '/getBigSellerOnLineProduct',
    data : {
      bsStatus : 4,
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

export function getBigSellerCollectList( params ) {
  return httpBigSeller.request( {
    method : 'post',
    url : '/getBigSellerCollectList',
    data : {
      claimStatus : 0,
      crawlPlatform : '',
      desc : true,
      orderBy : '',
      pageNo : 1,
      pageSize : 50,
      inquireType : 0,
      searchType : 'productName',
      searchContent : '',
      site : '',
      ...params
    }
  } )
}
