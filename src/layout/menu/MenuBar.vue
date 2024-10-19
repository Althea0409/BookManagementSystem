<template>
    <menu-logo></menu-logo>
    <a-menu
        v-model:openKeys="menuData.openKeys"
        v-model:selectedKeys="menuData.selectedKeys"
        mode="inline"
        theme="light"
    >
        <a-menu-item key="/dashboard">
            <template #icon>
                <BarChartOutlined />
            </template>
            <router-link to="/dashboard">数据总览</router-link>
        </a-menu-item>
        <a-menu-item key="/books">
            <template #icon>
                <BookOutlined />
            </template>
            <router-link to="/books">书籍管理</router-link>
        </a-menu-item>
        <a-menu-item key="/borrow">
            <template #icon>
                <LogoutOutlined />
            </template>
            <router-link to="/borrow">借阅管理</router-link>
        </a-menu-item>
        <a-menu-item key="/members">
            <template #icon>
                <CrownOutlined />
            </template>
            <router-link to="/members">会员管理</router-link>
        </a-menu-item>

        <!-- <a-sub-menu key="sub1">
            <template #icon>
                <MailOutlined />
            </template>
            <template #title>Navigation One</template>
            <a-menu-item key="5">Option 5</a-menu-item>
            <a-menu-item key="6">Option 6</a-menu-item>
            <a-menu-item key="7">Option 7</a-menu-item>
            <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu> -->

    </a-menu>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';
import MenuLogo from './MenuLogo.vue';
import { routes } from '@/router';

import { reactive, onMounted, watch } from 'vue'
//当前路由
const route = useRoute()
const menuData = reactive({
    //当前选中的菜单的key  
    //当前路由的path设置为选中的菜单的key
    selectedKeys: [''],
    openKeys: [''],
    // preOpenKeys: ['sub1'],
})
//设置当前选中菜单的key
const selectkey = () => {
    menuData.selectedKeys.push(route.path)
}
// SubMenu 展开/关闭的回调,解决一次只能打开一个菜单
const onOpenChange = (openKeys: string[]) => {
    console.log(openKeys)
    if (openKeys.length !== 0) {
        menuData.openKeys = [openKeys[1]]
    } else {
        menuData.openKeys = ['']
    }
};
//解决刷新之后，选中菜单，有上级的时候，打开上级菜单
const setMenuOpen = (result: any) => {
    for (let i = 0; i < routes.length; i++) {
        if (result[i].children) {
            console.log(result[i])
            for (let y = 0; y < result[i].children.length; y++) {
                if (result[i].children[y].path === route.path) {
                    menuData.openKeys = [result[i].path]
                }
            }
        }
    }
};
//路由发生变化时也要设置
watch(() => route.path, () => {
    selectkey()
})
onMounted(() => {
    selectkey()
    setMenuOpen(routes)
})
</script>

<style scoped lang='scss'>
</style>