<template>
    <a-table :columns="columns" :data-source="borrows" row-key="borrowId">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
                <a-button type="danger" @click="handleReturn(record.borrowId)">归还</a-button>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getBorrowHistory, returnBook } from '@/api';

export default defineComponent({
    name: 'BorrowList',
    emits: ['bookReturned'],
    props: {
        memberId: {
            type: Number,
            required: true
        }
    },
    setup(props, { emit }) {
        const borrows = ref([]);

        const columns = [
            { title: '会员ID', dataIndex: 'memberId', key: 'memberId' },
            { title: '图书ID', dataIndex: 'bookId', key: 'bookId' },
            { title: '借阅日期', dataIndex: 'borrowDate', key: 'borrowDate' },
            { title: '归还日期', dataIndex: 'returnDate', key: 'returnDate' },
            { title: '操作', key: 'action' }
        ];

        const fetchBorrows = async () => {
            const response = await getBorrowHistory(props.memberId);
            borrows.value = response.data;
        };

        const handleReturn = async (borrowId: number) => {
            await returnBook({ borrowId });
            emit('bookReturned');
            fetchBorrows();
        };

        onMounted(fetchBorrows);

        return {
            borrows,
            columns,
            handleReturn
        };
    }
});
</script>

<style scoped lang="scss">

</style>
