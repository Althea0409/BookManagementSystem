<template>
    <div class="logo">
        <img src="@/assets/logos.png" alt="logo" />
        <span class="title">图书管理系统</span>
    </div>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
</script>

<style lang="scss" scoped>
.logo {
    background-color: #2465ec;
    height: 50px;
    border: none;
    line-height: 50px;
    display: flex;
    align-items: center;
    padding-left: 12px;
    color: #fff;
img {
        width: 43px;
        height: 43px;
        margin-right: 12px;
    }
.title {
        height: 50px;
        background-color: #2465ec;
        text-align: center;
        color: #fff;
        box-sizing: border-box;
        font-weight: 600;
        line-height: 50px;
        font-size: 20px;
        vertical-align: middle;
    }
}
</style>