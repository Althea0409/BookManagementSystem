<template>
    <a-form @submit.prevent="handleSubmit" class="borrow-form">
        <a-form-item label="会员ID">
            <a-input v-model:value="form.memberId" />
        </a-form-item>
        <a-form-item label="图书ID">
            <a-input v-model:value="form.bookId" />
        </a-form-item>
        <a-form-item label="借阅日期">
            <a-input v-model:value="form.borrowDate" />
        </a-form-item>
        <a-form-item label="归还日期">
            <a-input v-model:value="form.returnDate" />
        </a-form-item>
        <a-form-item class="form-actions">
            <a-button @click="$emit('closeModal')" >取消</a-button>
            <a-button type="primary" html-type="submit" style="margin-left: 10px;">确定</a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { borrowBook } from '@/api';

export default defineComponent({
    name: 'BorrowForm',
    emits: ['bookBorrowed', 'closeModal'],
    setup(props, { emit }) {
        const form = ref({
            memberId: '',
            bookId: '',
            borrowDate: '',
            returnDate: ''
        });

        const handleSubmit = async () => {
            await borrowBook(form.value);
            emit('bookBorrowed');
            emit('closeModal');
            form.value = { memberId: '', bookId: '', borrowDate: '', returnDate: '' }; // Reset form
        };

        return {
            form,
            handleSubmit
        };
    }
});
</script>

<style scoped lang="scss">
.borrow-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
}
</style>
