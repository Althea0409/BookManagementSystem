<template>
    <a-table :columns="columns" :data-source="members" row-key="member_id">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
                <a-button danger @click="handleDelete(record.member_id)">删除</a-button>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { queryMembers, deleteMember } from '@/api';

// 定义成员记录的类型
interface MemberRecord {
    member_id: number;
    name: string;
    contact: string;
    registrationDate: string;
    borrowCount: number;
}

export default defineComponent({
    name: 'MemberList',
    emits: ['memberDeleted'],
    setup(props, { emit }) {
        const members = ref<MemberRecord[]>([]); // 使用 MemberRecord 类型

        const columns = [
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '联系方式', dataIndex: 'contact', key: 'contact' },
            { title: '注册日期', dataIndex: 'registrationDate', key: 'registrationDate' },
            { title: '借阅中的图书数量', dataIndex: 'borrowCount', key: 'borrowCount' },
            { title: '操作', key: 'action' }
        ];

        const fetchMembers = async () => {
            // 模拟数据 - 在实际应用中可替换为API请求
            members.value = [
                {
                    member_id: 1,
                    name: '张三',
                    contact: '123456789',
                    registrationDate: '2023-01-15',
                    borrowCount: 3
                },
                {
                    member_id: 2,
                    name: '李四',
                    contact: '987654321',
                    registrationDate: '2023-02-20',
                    borrowCount: 1
                },
                {
                    member_id: 3,
                    name: '王五',
                    contact: '456123789',
                    registrationDate: '2023-03-10',
                    borrowCount: 2
                },
                {
                    member_id: 4,
                    name: '赵六',
                    contact: '321654987',
                    registrationDate: '2023-04-05',
                    borrowCount: 0
                },
                {
                    member_id: 5,
                    name: '钱七',
                    contact: '654321987',
                    registrationDate: '2023-05-15',
                    borrowCount: 5
                }
            ];
            // 如果使用 API，取消以下注释并替换为实际获取
            // const response = await queryMembers({});
            // members.value = response.data;
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

<style scoped lang="scss"></style>
