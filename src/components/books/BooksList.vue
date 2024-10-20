<template>
    <a-table :columns="columns" :data-source="books" row-key="book_id">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
                <a-button type="danger" @click="handleDelete(record.book_id)">删除</a-button>
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

<style scoped lang="scss">

</style>
