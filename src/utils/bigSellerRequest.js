import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getEnvs } from './envs'
import router from '@/router'
import { useUserStore } from '@/store'

import { GLOBAL_DATA, LOGIN_ERROR_CODE, WHITE_CODE_LIST } from '@/config/constant'

// import qs from 'qs'
class BigSellerHttpRequest {
  // #baseUrl
  constructor() {
    this.baseUrl = this.getBaseUrl()
    this.withCredentials = true
    this.timeout = 60 * 60 * 24 * 1000
  }

  getBaseUrl() {
    const { envStr } = getEnvs()
    return envStr === 'dev' ? import.meta.env.VITE_PROXY_DOMAIN : GLOBAL_DATA[envStr].baseUrl
  }

  getConfig() {
    return {
      baseURL : 'http://127.0.0.1:9980/',
      timeout : this.timeout,
      withCredentials : this.withCredentials,
      headers : {
        'Content-Type' : 'application/json;charset=UTF-8',
        'Accept' : '/',
        'Cache-Control' : 'no-cache',
      },
      credentials : 'same-origin'
    }
  }

  getParams( payload ) {
    const { method, data } = payload
    if ( ['post', 'put', 'patch', 'delete'].indexOf( method ) >= 0 ) {
      payload.data = data
    } else {
      payload.params = data
      delete payload.data
    }
    return payload
  }

  checkStatus( status ) {
    let errMessage = ''
    switch ( status ) {
      case 400:
        errMessage = '错误请求'
        break
      case 401:
        errMessage = '未授权，请重新登录'
        break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误,未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = '连接错误'
    }
    return errMessage
  }

  // 拦截处理
  setInterceptors( instance ) {
    const that = this

    // 请求拦截
    instance.interceptors.request.use(
      config => {
        if ( !navigator.onLine ) {
          ElMessage( {
            message : '请检查您的网络是否正常',
            type : 'error',
            duration : 3 * 1000
          } )
          return Promise.reject( new Error( '请检查您的网络是否正常' ) )
        }
        // const token = cookies.get( bigSellerToken )
        // if ( token ) {
        //   config.headers.Authorization = token
        // }
        // config.data = qs.stringify( config.data )
        return config
      },
      error => {
        return Promise.reject( new Error( error ) )
      }
    )
  }

  request( options ) {
    const instance = axios.create()
    const baseOpt = this.getConfig()
    const params = Object.assign( {}, baseOpt, this.getParams( options ) )
    this.setInterceptors( instance )
    return instance( params )
  }
}

const httpBigSeller = new BigSellerHttpRequest()
export default httpBigSeller
