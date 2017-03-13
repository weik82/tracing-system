import axios from 'axios'
import store from '../store/store'
import * as types from '../store/types'
import router from '../router/route'

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'https://api.douban.com/v2';
// axios.defaults.baseURL = 'http://500px.me';
// let token='45d3aa452e6d64b4b6d554302626dd7d2dc4ab36'
axios.defaults.baseURL = 'http://localhost:8080';
 // axios.defaults.headers.common['Authorization'] = `token ${token}`;
 // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// http request 拦截器
axios.interceptors.request.use(
  config => {
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
