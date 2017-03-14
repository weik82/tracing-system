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
      children:[
        {
          path: '',
          redirect: 'all'
        },
        {
          path: 'all',//全国
          component: resolve => require(['../components/all/all.vue'], resolve),
          children:[
            {
              path: '',
              redirect: 'tab1'
            },
            {
              path: 'tab1',//全国
              component: resolve => require(['../components/all/tab1.vue'], resolve),
            },
            {
              path: 'tab2',//全国
              component: resolve => require(['../components/all/tab2.vue'], resolve),
            }
          ]
        },
        {
          path: 'sub',//省
          component: resolve => require(['../components/sub/sub.vue'], resolve),
          children:[
            {
              path: '',
              redirect: 's_tab1'
            },
            {
              path: 's_tab1',//全国
              component: resolve => require(['../components/sub/tab1.vue'], resolve),
            },
            {
              path: 's_tab2',//全国
              component: resolve => require(['../components/sub/tab2.vue'], resolve),
            }
          ]
        },
        {
          path: 'other1',
          component: resolve => require(['../components/page/other1.vue'], resolve),
        },
        {
          path: 'other2',
          component: resolve => require(['../components/page/other2.vue'], resolve),
        }
      ]
    },
  ]
})
