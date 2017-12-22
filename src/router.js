import Vue from 'vue'
import VueRouter from 'vue-router'

// import component
import Login from '~/views/login.vue'
import Home from '~/views/home.vue'
import User from '~/views/user/user.vue'
import NotFound from '~/views/404.vue'

Vue.use(VueRouter)

const aside = [
  {
    path: '/',
    component: Home,
    redirect: {name: '用户管理'},
    icon: 'el-icon-info',
    children: [{
      path: '/user',
      name: '用户管理',
      component: User
    }]
  },
  {
    path: '/',
    component: Home,
    icon: 'el-icon-info',
    children: [{
      path: '/record',
      name: '记录管理',
      component: User
    }]
  },
  {
    path: '/',
    name: '管理',
    component: Home,
    icon: 'el-icon-info',
    children: [{
      path: '/123',
      name: '记录管理1',
      component: User
    },{
      path: '/233',
      name: '记录管理2',
      ignore: true,  // 如果子菜单不想显示
      component: User
    }]
  },
]

export default new VueRouter({
  mode: 'history',
  base: 'admin',
  routes: [
    ...aside.map(v => Object.assign({}, v, {aside: true})),
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '*',
      redirect: { path: '/404' }
    }
  ]
})
