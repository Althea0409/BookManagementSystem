<template>
    <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @tabClick="tabClick" @edit="onEdit">
        <a-tab-pane 
            v-for="pane in panes" 
            :key="pane.path" 
            :tab="pane.title"
        ></a-tab-pane>
    </a-tabs>
</template>
<script setup lang='ts'>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { type Tabs } from '@/store/tabs/index'
import { tabsStore } from '@/store/tabs/index'
const route = useRoute();
const router = useRouter();

// 获取 store
const store = tabsStore();
// 选项卡的数据，从 store 里面获取
const panes = computed(() => {
    return store.getTabs
})

// 设置激活的选项卡数据，他跟当前激活的路由是一样的；
const activeKey = ref('');
const setActiveTab = () => {
    activeKey.value = route.path;
}

// 点击左侧，点击tabs数据 : 原理是监听路由的变化
const addTab = () => {
    // 从当前路由获取path和title
    const { path, meta } = route;
    // 组装数据
    const tab: Tabs = {
        path: path,
        title: meta.title as string
    }
    // 添加到选择框数据
    store.addTab(tab)
}

// 监听路由的变化
watch(() => route.path, () => {
    // 设置激活的选项卡
    setActiveTab();
    // 把当前路由添加到选项卡数据
    addTab();
})

// 关闭选项卡
const onEdit = (targetKey: string) => {
    console.log(targetKey)
    remove(targetKey);
}
const remove = (targetKey: string) => {
    if (targetKey === '/dashboard') return;
    let lastIndex = 0;
    store.tabsList.forEach((pane, i) => {
        if (pane.path === targetKey) {
            lastIndex = i - 1;
        }
    });
    store.tabsList = store.tabsList.filter(pane => pane.path !== targetKey);
    if (store.tabsList.length && activeKey.value === targetKey) {
        if (lastIndex >= 0) {
            activeKey.value = store.tabsList[lastIndex].path;
        } else {
            activeKey.value = store.tabsList[0].path;
        }
    }
    // 跳转路由
    router.push({ path: activeKey.value })
};

// 解决刷新数据丢失的问题
const beforeRefresh = () => {
    if (route.path != '/login') {
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('tabsView', JSON.stringify(store.tabsList))
        })
        let tabSesson = sessionStorage.getItem("tabsView");
        if (tabSesson) {
            let oldTabs = JSON.parse(tabSesson);
            if (oldTabs.length > 0) {
                store.tabsList = oldTabs;
            }
        }
    }
}
onMounted(() => {
    // 解决刷新选项卡数据丢失的问题
    beforeRefresh();
    // 设置激活的选项卡
    setActiveTab();
    // 把当前路由添加到选项卡数据
    addTab();
})

// 选项卡点击事件
const tabClick = (key:string) =>{
    // 跳转路由
    router.push({ path: key })
}
</script>

<style scoped lang='scss'>
</style>