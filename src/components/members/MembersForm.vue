<template>
    <a-form @submit.prevent="handleSubmit" class="member-form">
        <a-form-item label="姓名">
            <a-input v-model:value="form.name" />
        </a-form-item>
        <a-form-item label="联系方式">
            <a-input v-model:value="form.contact" />
        </a-form-item>
        <a-form-item class="form-actions">
            <a-button @click="$emit('closeModal')" >取消</a-button>
            <a-button type="primary" html-type="submit" style="margin-left: 10px;">确定</a-button>
        </a-form-item>
    </a-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { addMember } from '@/api';

export default defineComponent({
    name: 'MemberForm',
    emits: ['memberAdded', 'closeModal'],
    setup(props, { emit }) {
        const form = ref({
            name: '',
            contact: ''
        });

        const handleSubmit = async () => {
            await addMember(form.value);
            emit('memberAdded');
            emit('closeModal');
            form.value = { name: '', contact: '' }; // Reset form
        };

        return {
            form,
            handleSubmit
        };
    }
});
</script>

<style scoped lang="scss">
.member-form {
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
