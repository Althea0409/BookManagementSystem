<template>
    <a-modal v-model:visible="visible" title="图书详情" @cancel="closeDetail">
        <p><strong>书名:</strong> {{ book.title }}</p>
        <p><strong>作者:</strong> {{ book.author }}</p>
        <p><strong>ISBN:</strong> {{ book.isbn }}</p>
        <p><strong>分类:</strong> {{ book.category }}</p>
        <p><strong>价格:</strong> {{ book.price }}</p>
        <p><strong>当前库存:</strong> {{ book.current_stock }}</p>
        <p><strong>总库存:</strong> {{ book.total_stock }}</p>
        <p><strong>借阅次数:</strong> {{ borrowCount }}</p>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getBorrowCount } from '@/api';

export default defineComponent({
    name: 'BookDetail',
    props: {
        book: {
            type: Object,
            required: true
        }
    },
    emits: ['closeDetail'],
    setup(props, { emit }) {
        const visible = ref(true);
        const borrowCount = ref(0);

        const fetchBorrowCount = async () => {
            const response = await getBorrowCount(props.book.book_id);
            borrowCount.value = response.data.borrow_count;
        };

        const closeDetail = () => {
            visible.value = false;
            emit('closeDetail');
        };

        onMounted(() => {
            fetchBorrowCount();
        });

        return {
            visible,
            borrowCount,
            closeDetail
        };
    }
});
</script>

<style scoped lang="scss">

</style>
