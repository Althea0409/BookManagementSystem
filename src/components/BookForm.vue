<template>
    <a-form @submit.prevent="handleSubmit" class="book-form">
        <a-form-item label="书名">
            <a-input v-model:value="form.title" />
        </a-form-item>
        <a-form-item label="作者">
            <a-input v-model:value="form.author" />
        </a-form-item>
        <a-form-item label="ISBN">
            <a-input v-model:value="form.isbn" />
        </a-form-item>
        <a-form-item label="分类">
            <a-input v-model:value="form.category" />
        </a-form-item>
        <a-form-item label="价格">
            <a-input-number v-model:value="form.price" />
        </a-form-item>
        <a-form-item label="库存数量">
            <a-input-number v-model:value="form.total_stock" />
        </a-form-item>
        <a-form-item class="form-actions">
            <a-button @click="$emit('closeModal')" >取消</a-button>
            <a-button type="primary" html-type="submit" style="margin-left: 10px;">确定</a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { addBook } from '../api';

export default defineComponent({
    name: 'BookForm',
    emits: ['bookAdded', 'closeModal'], // 关闭弹窗的事件emit
    setup(props, { emit }) {
        const form = ref({
            title: '',
            author: '',
            isbn: '',
            category: '',
            price: 0,
            total_stock: 0
        });

        const handleSubmit = async () => {
            await addBook(form.value);
            emit('bookAdded');
            emit('closeModal'); // 提交后关闭弹窗
            form.value = { title: '', author: '', isbn: '', category: '', price: 0, total_stock: 0 }; // Reset form
        };

        return {
            form,
            handleSubmit
        };
    }
});
</script>

<style scoped lang="scss">
.book-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%; /* 确保高度充满 */
}

.form-actions {
    display: flex;
    justify-content: flex-end; /* 将按钮放到右下角 */
}
</style>
