import httpBigSeller from '@/utils/bigsellerRequest'

export function getBigSellerDraftBox(params) {
  return httpBigSeller.request({
    method: 'get',
    url: '/getBigSellerDraftBox',
    data: {
      bsStatus: 1,
      shopId: '',
      pageNo: 1,
      pageSize: 50,
      inquireType: 0,
      searchType: '',
      searchContent: '',
      ...params,
    },
  })
}
