<template>
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
            <span to="/dashboard">数据总览</span>
        </a-menu-item>
        <a-menu-item key="/books">
            <template #icon>
                <BookOutlined />
            </template>
            <span to="/books">书籍管理</span>
        </a-menu-item>
        <a-menu-item key="/borrow">
            <template #icon>
                <LogoutOutlined />
            </template>
            <span to="/borrow">借阅管理</span>
        </a-menu-item>
        <a-menu-item key="/member">
            <template #icon>
                <CrownOutlined />
            </template>
            <span to="/member">会员管理</span>
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
const menuData = reactive({
    collapsed:false,
    selectedKeys: ['1'],
    openKeys: ['sub1'],
    preOpenKeys: ['sub1'],
}) 
</script>

<style scoped lang='scss'>
</style>