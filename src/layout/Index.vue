<template>
    <a-layout class="layout">
      <a-layout-sider class="asside">Sider</a-layout-sider>
      <a-layout>
        <a-layout-header class="header">Header</a-layout-header>
        <a-layout-content class="main">Content</a-layout-content>
      </a-layout>
    </a-layout>
  </template>
  <script setup lang='ts'>
  import { ref, reactive } from 'vue'
  </script>
  <style scoped lang='scss'>
  .layout {
    height: 100%;
    .asside {
       background-color: rgb(50, 182, 205);
      border-right: 1px solid #f0f0f0 !important;
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
      padding: 20px !important;
      background-color: #F1F5FE;
    }
  }
  </style>