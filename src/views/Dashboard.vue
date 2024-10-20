<template>
    <a-row gutter="16">
      <!-- 图书总数统计 -->
      <a-col :span="8">
        <a-card>
          <a-statistic
            title="图书总数"
            :value="bookStats.totalBooks"
            suffix="本"
          />
          <a-statistic
            title="可用库存"
            :value="bookStats.availableBooks"
            prefix="📚"
            style="margin-top: 10px"
          />
        </a-card>
      </a-col>
  
      <!-- 会员总数统计 -->
      <a-col :span="8">
        <a-card>
          <a-statistic
            title="会员总数"
            :value="memberCount"
            prefix="👥"
          />
        </a-card>
      </a-col>
  
      <!-- 借阅统计 -->
      <a-col :span="8">
        <a-card>
          <a-statistic
            title="未归还图书"
            :value="borrowStats.unreturnedBooks"
            suffix="本"
          />
          <a-statistic
            title="热门书籍"
            :value="borrowStats.topBook"
            style="margin-top: 10px"
          />
        </a-card>
      </a-col>
  
      <!-- 借阅记录表 -->
      <a-col :span="24" style="margin-top: 20px;">
        <a-card title="借阅记录">
          <a-table
            :columns="borrowColumns"
            :dataSource="borrowRecords"
            rowKey="id"
            bordered
          />
        </a-card>
      </a-col>
    </a-row>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive, onMounted } from 'vue';
  
  export default defineComponent({
    name: 'Dashboard',
    setup() {
      // 仿造的统计数据
      const bookStats = reactive({
        totalBooks: 1200,
        availableBooks: 850,
      });
  
      const memberCount = 350;
  
      const borrowStats = reactive({
        unreturnedBooks: 45,
        topBook: '《JavaScript高级程序设计》',
      });
  
      const borrowRecords = reactive([
        { id: 1, book: 'Vue3权威指南', member: '张三', date: '2024-10-10' },
        { id: 2, book: 'TypeScript实战', member: '李四', date: '2024-10-12' },
        { id: 3, book: '算法导论', member: '王五', date: '2024-10-15' },
      ]);
  
      const borrowColumns = [
        { title: '书籍名称', dataIndex: 'book', key: 'book' },
        { title: '借阅人', dataIndex: 'member', key: 'member' },
        { title: '借阅日期', dataIndex: 'date', key: 'date' },
      ];
  
      // 模拟数据获取
      onMounted(() => {
        console.log('仪表盘加载完成');
      });
  
      return {
        bookStats,
        memberCount,
        borrowStats,
        borrowRecords,
        borrowColumns,
      };
    },
  });
  </script>
  
  <style scoped>
  a-card {
    min-height: 160px;
  }
  </style>
  