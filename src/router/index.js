import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/itemMusic',
    name: 'itemMusic',
    component: () => import('../views/ItemMusicView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue')
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    // 路由守卫
    beforeEnter: (to,from,next) => {
      if (store.state.isLogin || store.state.token || localStorage.getItem('token')){ 
        next();
      }else{
        next('/userlogin')
      }
    }, 
    component: () => import('../views/InfoUserView.vue')
  },
  {
    path: '/userlogin',
    name: 'userlogin',
    component: () => import('../views/UserLoginView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局路由守卫控制底部组件是否显示
router.beforeEach((to,from) => {
  if(to.path === '/userlogin'){
    store.state.isFooterShow = false;
  }else{
    store.state.isFooterShow = true;
  }
})

export default router
