import { createRouter, createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' // 使用 'type' 进行仅类型导入
import Layout from '@/layout/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Layout
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router