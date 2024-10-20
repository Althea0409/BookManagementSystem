<template>
    <a-table :columns="columns" :data-source="members" row-key="member_id">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
                <a-button type="danger" @click="handleDelete(record.member_id)">删除</a-button>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { queryMembers, deleteMember } from '@/api';

export default defineComponent({
    name: 'MemberList',
    emits: ['memberDeleted'],
    setup(props, { emit }) {
        const members = ref([]);

        const columns = [
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '联系方式', dataIndex: 'contact', key: 'contact' },
            { title: '注册日期', dataIndex: 'registrationDate', key: 'registrationDate' },
            { title: '借阅中的图书数量', dataIndex: 'borrowCount', key: 'borrowCount' },
            { title: '操作', key: 'action' }
        ];

        const fetchMembers = async () => {
            const response = await queryMembers({});
            members.value = response.data;
        };

        const handleDelete = async (memberId: number) => {
            await deleteMember(memberId);
            emit('memberDeleted');
            fetchMembers();
        };

        onMounted(fetchMembers);

        return {
            members,
            columns,
            handleDelete
        };
    }
});
</script>

<style scoped lang="scss">

</style>
