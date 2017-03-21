import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
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
      component: resolve => require(['../components/home.vue'], resolve),
      children: [
        {
          path: '',
          redirect: 'total'
        },
        {
          path: 'total',//全网跨境电商追溯系统
          component: resolve => require(['../components/total/total.vue'], resolve)
        },
        {
          path: 'crossborder',//跨境电商追溯系统
          component: resolve => require(['../components/crossborder/crossborder.vue'], resolve),
        },
        {
          path: 'fb_total',//用户反馈(全网)
          component: resolve => require(['../components/userfeedback/fb_total.vue'], resolve),
        },
       /* {
          path: 'fb_crossborder',//用户反馈(跨境电商)
          component: resolve => require(['../components/page/fb_crossborder.vue'], resolve),
        },*/
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
  ]
})
