<template>
    <a-table :columns="columns" :data-source="borrows" row-key="bookId">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
                <a-button type="danger" @click="handleReturn(record.bookId)">归还</a-button>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getBorrowHistory, returnBook } from '@/api';

// 定义借阅记录的类型
interface BorrowRecord {
    memberId: string;
    bookId: string;
    borrowDate: string;
    returnDate: string;
}

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
        const borrows = ref<BorrowRecord[]>([]); // 使用 BorrowRecord 类型

        const columns = [
            { title: '会员ID', dataIndex: 'memberId', key: 'memberId' },
            { title: '图书ID', dataIndex: 'bookId', key: 'bookId' },
            { title: '借阅日期', dataIndex: 'borrowDate', key: 'borrowDate' },
            { title: '归还日期', dataIndex: 'returnDate', key: 'returnDate' },
            { title: '操作', key: 'action' }
        ];

        const fetchBorrows = async () => {
            const response = await getBorrowHistory(props.memberId);
            // 确保将返回的数据赋值给 borrows
            borrows.value = response.data; 
            // 模拟数据 - 可以替换为真实API返回的response.data
            borrows.value = [
                {
                    memberId: 'M001',
                    bookId: 'B001',
                    borrowDate: '2023-08-01',
                    returnDate: '2023-08-15'
                },
                {
                    memberId: 'M002',
                    bookId: 'B002',
                    borrowDate: '2023-08-05',
                    returnDate: '2023-08-20'
                },
                {
                    memberId: 'M003',
                    bookId: 'B003',
                    borrowDate: '2023-07-15',
                    returnDate: '2023-08-01'
                },
                {
                    memberId: 'M004',
                    bookId: 'B004',
                    borrowDate: '2023-08-10',
                    returnDate: '2023-08-25'
                },
                {
                    memberId: 'M005',
                    bookId: 'B005',
                    borrowDate: '2023-07-25',
                    returnDate: '2023-08-10'
                }
            ];
        };

        const handleReturn = async (bookId: string) => {
            await returnBook({ bookId });
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

<style scoped lang="scss"></style>
