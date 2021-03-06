import Vue from 'vue'
import store from '../store/store'
import * as types from '../store/types'
import Router from 'vue-router'

Vue.use(Router);

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('ts_token')) {
  store.commit(types.USER_LOGIN, {token: window.localStorage.getItem('ts_token')})
}
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['../components/login.vue'], resolve)
    },
    {
      path: '/home',
      meta: {
        requireAuth: true,
      },
      component: resolve => require(['../components/home.vue'], resolve),
      children: [
        {
          path: '',
          redirect: 'trace'
        },
        {
          path: 'fb_crossborder',
          redirect: 'fb_crossborder/1'
        },
        {
          path: 'trace',//全网跨境电商追溯系统
          component: resolve => require(['../components/trace/trace.vue'], resolve)
        },
        {
          path: 'crossborder/:id',//跨境电商追溯系统
          component: resolve => require(['../components/trace/crossbordertrace.vue'], resolve),
        },
        {
          path: 'progressing',//跨境电商追溯系统
          component: resolve => require(['../components/progressing.vue'], resolve),
        },
        {
          path: 'fb_total',//用户反馈(全网)
          component: resolve => require(['../components/userfeedback/feedback_total.vue'], resolve),
        },
        {
          path: 'fb_crossborder/:id',//用户反馈(跨境电商)
          component: resolve => require(['../components/userfeedback/feedback_crossborder.vue'], resolve),
        },
        {
          path: 'releaserecall',//发布召回
          component: resolve => require(['../components/recall/releaserecall.vue'], resolve),
        },
        {
          path: 'recallhistory',//召回历史
          component: resolve => require(['../components/recall/recallhistory.vue'], resolve),
        }
      ]
    },
    {
      path: '*',
      component: resolve => require(['../components/notfound.vue'], resolve)
    }
  ]
});
router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
});
export default router
