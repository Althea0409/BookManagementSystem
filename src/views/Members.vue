<template>
    <div class="members-container">
        <a-card>
            <div class="search-container">
                <a-input-search
                    placeholder="输入会员姓名搜索"
                    style="width: 300px"
                    @search="handleSearch"
                />
                <a-button type="primary" class="add-button" @click="showAddMemberModal">新增会员</a-button>
            </div>
        </a-card>
        <a-card class="member-list-card">
            <MemberList :members="members" @memberDeleted="fetchMembers" />
        </a-card>
        <MemberDetail v-if="selectedMember" :member="selectedMember" @closeDetail="selectedMember = null" />
        <a-modal
            v-model:visible="isAddMemberModalVisible"
            title="新增会员"
            @cancel="closeAddMemberModal"
            :footer="null"  
        >
            <MemberForm @memberAdded="fetchMembers" @closeModal="closeAddMemberModal" />
        </a-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MemberForm from '../components/members/MembersForm.vue';
import MemberList from '../components/members/MembersList.vue';
import MemberDetail from '../components/members/MembersDetail.vue';
import { queryMembers } from '@/api';

export default defineComponent({
    name: 'Members',
    components: {
        MemberForm,
        MemberList,
        MemberDetail
    },
    setup() {
        const members = ref([]);
        const selectedMember = ref(null);
        const isAddMemberModalVisible = ref(false);

        const fetchMembers = async (params = {}) => {
            const response = await queryMembers(params);
            members.value = response.data;
        };

        const handleSearch = (value: string) => {
            fetchMembers({ name: value });
        };

        const showAddMemberModal = () => {
            isAddMemberModalVisible.value = true;
        };

        const closeAddMemberModal = () => {
            isAddMemberModalVisible.value = false;
        };

        fetchMembers();

        return {
            members,
            selectedMember,
            fetchMembers,
            handleSearch,
            showAddMemberModal,
            closeAddMemberModal,
            isAddMemberModalVisible
        };
    }
});
</script>

<style scoped lang='scss'>
.members-container {
    padding: 14px;
}

.search-container {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
}

.member-list-card {
    margin-top: 16px;
    background-color: #fff;
}

.add-button {
    margin-left: 16px;
}
</style>
