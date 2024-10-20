<template>
    <a-modal v-model:visible="visible" title="会员详情" @cancel="closeDetail">
        <p><strong>姓名:</strong> {{ member.name }}</p>
        <p><strong>联系方式:</strong> {{ member.contact }}</p>
        <p><strong>注册日期:</strong> {{ member.registrationDate }}</p>
        <p><strong>借阅中的图书数量:</strong> {{ borrowCount }}</p>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getMemberDetail } from '@/api';

export default defineComponent({
    name: 'MemberDetail',
    props: {
        member: {
            type: Object,
            required: true
        }
    },
    emits: ['closeDetail'],
    setup(props, { emit }) {
        const visible = ref(true);
        const borrowCount = ref(0);

        const fetchMemberDetail = async () => {
            const response = await getMemberDetail(props.member.member_id);
            borrowCount.value = response.data.borrow_count;
        };

        const closeDetail = () => {
            visible.value = false;
            emit('closeDetail');
        };

        onMounted(() => {
            fetchMemberDetail();
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
