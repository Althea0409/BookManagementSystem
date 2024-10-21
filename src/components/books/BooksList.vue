<template>
    <a-table :columns="columns" :data-source="books" row-key="book_id">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
                <a-button danger @click="handleDelete(record.book_id)">删除</a-button>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { queryBooks, deleteBook } from '@/api';

export default defineComponent({
    name: 'BookList',
    emits: ['bookDeleted'],
    setup(props, { emit }) {
        const books = ref([]);

        const columns = [
            { title: '书名', dataIndex: 'title', key: 'title' },
            { title: '作者', dataIndex: 'author', key: 'author' },
            { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
            { title: '分类', dataIndex: 'category', key: 'category' },
            { title: '价格', dataIndex: 'price', key: 'price' },
            { title: '当前库存', dataIndex: 'current_stock', key: 'current_stock' },
            { title: '总库存', dataIndex: 'total_stock', key: 'total_stock' },
            { title: '操作', key: 'action' }
        ];

        const fetchBooks = async () => {
            const response = await queryBooks({});
            //  发送请求，获取数据
            // const books = ref([]); 

            // 模拟数据
            response.data = [
                {
                    title: '红楼梦',
                    author: '曹雪芹',
                    isbn: '978-7-1234-5678-9',
                    category: '小说',
                    price: 39.99,
                    current_stock: 20,
                    total_stock: 100,
                    action: '编辑' // 可根据需求添加具体操作，比如编辑、删除等
                },
                {
                    title: '三体',
                    author: '刘慈欣',
                    isbn: '978-7-5432-1098-7',
                    category: '科幻',
                    price: 45.00,
                    current_stock: 15,
                    total_stock: 80,
                    action: '编辑'
                },
                {
                    title: 'JavaScript权威指南',
                    author: 'David Flanagan',
                    isbn: '978-7-300-12345-6',
                    category: '技术',
                    price: 88.00,
                    current_stock: 25,
                    total_stock: 50,
                    action: '编辑'
                },
                {
                    title: '小王子',
                    author: '安东尼·德·圣埃克苏佩里',
                    isbn: '978-7-5678-5678-9',
                    category: '童书',
                    price: 30.00,
                    current_stock: 10,
                    total_stock: 40,
                    action: '编辑'
                },
                {
                    title: '追风筝的人',
                    author: '卡勒德·胡赛尼',
                    isbn: '978-7-222-5678-9',
                    category: '小说',
                    price: 49.99,
                    current_stock: 5,
                    total_stock: 25,
                    action: '编辑'
                }
            ];
            books.value = response.data;
        };

        const handleDelete = async (bookId: number) => {
            await deleteBook(bookId);
            emit('bookDeleted');
            fetchBooks();
        };

        onMounted(fetchBooks);

        return {
            books,
            columns,
            handleDelete
        };
    }
});
</script>

<style scoped lang="scss"></style>
