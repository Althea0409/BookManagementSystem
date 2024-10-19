import { createRouter, createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' // 使用 'type' 进行仅类型导入

import Layout from '@/layout/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/Dashboard.vue'),
        name: 'dashboard',
        meta: {
          title: '数据总览',
          icon: '#icondashboard'
        }
      },
      
    ]
  },
  {
    path: '/books',
    component: Layout,
    children: [
      {
        path: '/books',
        component: () => import('@/views/Books.vue'),
        name: 'books',
        meta: {
          title: '书籍管理',
          icon: '#iconbooks'
        }
      },    
    ]
  },
  {
    path: '/borrow',
    component: Layout,
    children: [
      {
        path: '/borrow',
        component: () => import('@/views/Borrow.vue'),
        name: 'borrow',
        meta: {
          title: '借阅管理',
          icon: '#iconborrow'
        }
      },    
    ]
  },
  {
    path: '/members',
    component: Layout,
    children: [
      {
        path: '/members',
        component: () => import('@/views/Members.vue'),
        name: 'members',
        meta: {
          title: '会员管理',
         icon: '#iconmembers'
        }
      },    
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router