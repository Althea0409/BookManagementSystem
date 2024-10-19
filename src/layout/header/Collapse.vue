<template>
    <component 
        @click="clickBtn" 
        :is="isCollapse ? MenuUnfoldOutlined : MenuFoldOutlined" 
        class="icons" 
    />
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons-vue';
import { collapseStore } from '@/store/collapse';
// 获取 store
const store = collapseStore();

// 获取 isCollapse
const isCollapse = computed(() => {
    return store.getCollapse
})

// 切换按钮点击事件
const clickBtn = ()=>{
    store.setCollapse()
}
</script>

<style scoped lang='scss'>
.icons {
    font-size: 21px;
}
</style>