import { createAxiosByInterceptors } from '@/utils/bigsellerRequest'

const request = createAxiosByInterceptors({
  baseURL: 'https://www.bigseller.com/api/v1',
})

// lodaing配置
export const getDraftList = params => {
  return request.get('/product/global/shopee/draft.json', {
    params,
  })
}
