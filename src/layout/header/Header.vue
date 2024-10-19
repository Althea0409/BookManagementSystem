<template>
    <div class="header-bg">
        <Collapse></Collapse>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
// 引入折叠组件
import Collapse from './Collapse.vue';
</script>

<style scoped lang='scss'>
.header-bg {
  color: #fff;
  display: flex;
  align-items: center;
}
</style>