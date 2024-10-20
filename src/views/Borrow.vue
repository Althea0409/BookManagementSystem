<template>
    <div class="borrow-container">
        <a-card>
            <div class="search-container">
                <a-input-search
                    placeholder="输入会员ID或图书ID搜索"
                    style="width: 300px"
                    @search="handleSearch"
                />
                <a-button type="primary" class="add-button" @click="showBorrowBookModal">
                    借阅图书
                </a-button>
            </div>
        </a-card>
        <a-card class="borrow-list-card">
            <BorrowList 
                :borrows="borrows" 
                :memberId="selectedMemberId ?? 0" 
                @bookReturned="fetchBorrows" 
            />
        </a-card>
        <BorrowDetail 
            v-if="selectedBorrow" 
            :borrow="selectedBorrow" 
            :memberId="selectedMemberId ?? 0" 
            @closeDetail="selectedBorrow = null" 
        />
        <a-modal
            v-model:visible="isBorrowBookModalVisible"
            title="借阅图书"
            @cancel="closeBorrowBookModal"
            :footer="null"
        >
            <BorrowForm @bookBorrowed="fetchBorrows" @closeModal="closeBorrowBookModal" />
        </a-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BorrowForm from '../components/borrow/BorrowForm.vue';
import BorrowList from '../components/borrow/BorrowList.vue';
import BorrowDetail from '../components/borrow/BorrowDetail.vue';
import { getBorrowHistory } from '@/api';

export default defineComponent({
    name: 'Borrow',
    components: {
        BorrowForm,
        BorrowList,
        BorrowDetail,
    },
    setup() {
        const borrows = ref([]);
        const selectedBorrow = ref(null);
        const selectedMemberId = ref<number | null>(null);
        const isBorrowBookModalVisible = ref(false);

        const fetchBorrows = async (p0?: {
            search:
            string;
        }) => {
    if (selectedMemberId.value !== null) {
        const response = await getBorrowHistory(selectedMemberId.value);
        borrows.value = response.data;
    }
};


        const handleSearch = (value: string) => {
            const memberId = parseInt(value, 10);
            selectedMemberId.value = isNaN(memberId) ? 0 : memberId;
            fetchBorrows({ search: value });
        };

        const showBorrowBookModal = () => {
            isBorrowBookModalVisible.value = true;
        };

        const closeBorrowBookModal = () => {
            isBorrowBookModalVisible.value = false;
        };

        fetchBorrows();

        return {
            borrows,
            selectedBorrow,
            selectedMemberId,
            fetchBorrows,
            handleSearch,
            showBorrowBookModal,
            closeBorrowBookModal,
            isBorrowBookModalVisible,
        };
    },
});
</script>

<style scoped lang="scss">
.borrow-container {
    padding: 14px;
}

.search-container {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
}

.borrow-list-card {
    margin-top: 16px;
    background-color: #fff;
}

.add-button {
    margin-left: 16px;
}
</style>
