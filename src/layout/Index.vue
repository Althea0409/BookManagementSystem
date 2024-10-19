<template>
    <a-layout class="layout">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" class="asside">
            <menu-bar></menu-bar>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="header">
                <Header></Header>
            </a-layout-header>
            <a-layout-content class="main">
                <Tabs></Tabs>
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
// 引入组件
import MenuBar from './menu/MenuBar.vue'
import Header from './header/Header.vue';
import { collapseStore } from '@/store/collapse';
import Tabs from './tabs/Tabs.vue';

// 获取 store
const store = collapseStore()
// collapsed
const collapsed = computed(() => {
    return store.getCollapse
})

</script>

<style scoped lang='scss'>
.layout {
    height: 100%;

    .asside {
        background-color: rgb(255, 255, 255);
        border-right: 1px solid #f0f0f0 !important;
        :deep(.ant-menu-inline){
            border-right: none !important;
        }
    }
    .header {
        height: 50px;
        padding: 0px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #2465ec;
    }

    .main {
        padding: 0px 20px !important;
        background-color: #F1F5FE !important;
    }
}
</style>