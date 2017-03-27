import axios from 'axios'
import store from '../store/store'
import * as types from '../store/types'
import router from '../router/route'
import {Loading} from 'element-ui';
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://10.12.0.96:8080/v2';
// axios.defaults.headers.common['Authorization'] = `token ${token}`;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
let loadingInstance,
  reqCount = 0,
  resCount = 0;
// http request 拦截器
axios.interceptors.request.use(
  config => {
    reqCount++;
    loadingInstance = Loading.service({fullscreen: true});
    /* if (store.state.token) {
     config.headers.Authorization = `token ${store.state.token}`;
     }*/
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    resCount++;
    if (resCount == reqCount) {
      setTimeout(function () {
        loadingInstance.close();
      }, 1500);
      resCount = 0;
      reqCount = 0
    }
    return response;
  },
  error => {
    /* if (error.response) {
     switch (error.response.status) {
     case 401:
     // 401 清除token信息并跳转到登录页面
     store.commit(types.USER_LOGOUT);
     router.replace({
     path: 'login',
     query: {redirect: router.currentRoute.fullPath}
     })
     }
     }*/
    return Promise.reject(error.response.data)
  });

export default axios;
