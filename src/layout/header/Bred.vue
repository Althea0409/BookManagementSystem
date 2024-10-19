<template>
    <a-breadcrumb class="bred">
        <a-breadcrumb-item v-for="item in tabs" class="item">{{ item.meta.title }}</a-breadcrumb-item>
    </a-breadcrumb>
</template>
<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { useRoute, type RouteLocationMatched } from 'vue-router'
//面包屑导航数据
const tabs: Ref<RouteLocationMatched[]> = ref([]);
//当前路由
const route = useRoute()
//获取面包屑导航
const getBred = () => {
    console.log('监听到')
    console.log(route.matched)
    //获取所有有meta和title
    let mached = route.matched.filter(item => item.meta && item.meta.title);
    // //判断第一个是否是首页,如果不是，构造一个
    // const first = mached[0];
    // if (first && first.path !== '/dashboard') {
    //     //构造一个
    //     mached = [{ path: '/dashboard', meta: { title: '首页' } } as any].concat(mached);
    // }
    //设置面包屑导航数据
    tabs.value = mached;
}
//首次加载
getBred();
//监听当前路由
watch(() => route.path, () => getBred())
</script>
<style scoped lang='scss'>
.bred {
    margin-left: 15px;
    .item {
        color: #fff;
    }
}
:deep(.ant-breadcrumb-separator) {
    color: #fff !important;
}
</style>