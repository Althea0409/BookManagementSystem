<template>
    <menu-logo></menu-logo>
    <a-menu
        v-model:openKeys="menuData.openKeys"
        v-model:selectedKeys="menuData.selectedKeys"
        mode="inline"
        theme="light"
        @openChange="onOpenChange"
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
import { routes } from '@/router/index';
import { reactive, onMounted, watch } from 'vue'

//当前路由
const route = useRoute()

const menuData = reactive({
    //所有一级菜单的path
    rootSubmenuKeys: ['/system', '/classroomRoot', '/courseRoot', '/teacherRoot', '/scheduleRoot'],
    collapsed: false,
    //选中的菜单的path，设置为当前路由的path
    selectedKeys: [''],
    openKeys: [''],
    preOpenKeys: [],
})

// 菜单展开/关闭的回调,解决一次只能打开一个菜单
const onOpenChange = (openKeys: string[]) => {
    console.log('44444')
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
        //循环【顶级菜单数组列表】 循环的数组下标用i表示
        if (result[i].children) {
            console.log(result[i])
            // 如果这个菜单没有【子菜单】 就不继续了（没有子菜单就是【点击可跳转页面但不会展开】的顶级菜单）
            for (let y = 0; y < result[i].children.length; y++) {
                // 循环【顶级菜单】的子菜单数组（二级菜单）数组下标用y表示
                if (result[i].children[y].path === route.path) {
                    // 如果子菜单的router数据和当前路由地址一样 则断定现在的页面就停留在这个数组对应的菜单中
                    menuData.openKeys = [result[i].path]
                    // 那么就把【顶级菜单（循环数组下标为i）的router属性】赋值给this.openKeys【data中当前展开的菜单】
                }
            }
        }
    }
};
//解决刷新之后，回显原来选中的菜单
const selectKey = () => {
    if (menuData.selectedKeys.some(item => item === route.path)) return;
    menuData.selectedKeys.push(route.path)
}
//监听当前路由
watch(() => route.path, () => {
    //清空一下之前的数据，防止出现多选的情况
    menuData.selectedKeys = [''];
    //重新设置选中的数据
    selectKey();
    //此行的作用，解决选项卡关闭，左侧菜单打开
    setMenuOpen(routes);
})
onMounted(() => {
    //首次进入获取当前路由
    selectKey();
    setMenuOpen(routes);
})

</script>

<style scoped lang='scss'>
</style>