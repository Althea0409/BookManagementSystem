<template>
    <a-modal v-model:visible="visible" title="借阅详情" @cancel="closeDetail">
        <p><strong>会员ID:</strong> {{ borrowDetail.memberId }}</p>
        <p><strong>图书ID:</strong> {{ borrowDetail.bookId }}</p>
        <p><strong>借阅日期:</strong> {{ borrowDetail.borrowDate }}</p>
        <p><strong>归还日期:</strong> {{ borrowDetail.returnDate }}</p>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getBorrowHistory } from '@/api';

export default defineComponent({
    name: 'BorrowDetail',
    props: {
        memberId: {
            type: Number,
            required: true
        }
    },
    emits: ['closeDetail'],
    setup(props, { emit }) {
        const visible = ref(true);
        const borrowDetail = ref<any>(null);

        const fetchBorrowDetail = async () => {
            const response = await getBorrowHistory(props.memberId);
            borrowDetail.value = response.data;
        };

        const closeDetail = () => {
            visible.value = false;
            emit('closeDetail');
        };

        onMounted(() => {
            fetchBorrowDetail();
        });

        return {
            visible,
            borrowDetail,
            closeDetail
        };
    }
});
</script>

<style scoped lang="scss">

</style>
