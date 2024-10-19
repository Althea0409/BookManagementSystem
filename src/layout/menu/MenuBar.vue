<template>
    <menu-logo></menu-logo>
    <a-menu
        v-model:openKeys="menuData.openKeys"
        v-model:selectedKeys="menuData.selectedKeys"
        mode="inline"
        theme="light"
        :inline-collapsed="menuData.collapsed"
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
import { ref, reactive } from 'vue'
// 引入 MenuLogo 组件 
import MenuLogo from './MenuLogo.vue';

const menuData = reactive({
    collapsed:false,
    selectedKeys: ['1'],
    openKeys: ['sub1'],
    preOpenKeys: ['sub1'],
}) 
</script>

<style scoped lang='scss'>
</style>