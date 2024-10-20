<template>
    <div class="books-container">
        <a-card>
            <div class="search-container">
                <a-input-search
                    placeholder="输入书名、作者或ISBN搜索"
                    style="width: 300px"
                    @search="handleSearch"
                />
                <a-button type="primary" class="add-button" @click="showAddBookModal">
                    新增图书
                </a-button>
            </div>
        </a-card>
        <a-card class="book-list-card">
            <BookList :books="books" @bookDeleted="fetchBooks" />
        </a-card>
        <BookDetail v-if="selectedBook" :book="selectedBook" @closeDetail="selectedBook = null" />
        <!-- 将footer属性设置为null来移除默认的按钮 -->
        <a-modal
            v-model:visible="isAddBookModalVisible"
            title="新增图书"
            @cancel="closeAddBookModal"
            :footer="null"  
        >
            <BookForm @bookAdded="fetchBooks" @closeModal="closeAddBookModal" />
        </a-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BookForm from '../components/books/BooksForm.vue';
import BookList from '../components/books/BooksList.vue';
import BookDetail from '../components/books/BooksDetail.vue';
import { queryBooks } from '@/api';

export default defineComponent({
    name: 'Books',
    components: {
        BookForm,
        BookList,
        BookDetail
    },
    setup() {
        const books = ref([]);
        const selectedBook = ref(null);
        const isAddBookModalVisible = ref(false);

        const fetchBooks = async (params = {}) => {
            const response = await queryBooks(params);
            books.value = response.data;
        };

        const handleSearch = (value: string) => {
            fetchBooks({ title: value });
        };

        const showAddBookModal = () => {
            isAddBookModalVisible.value = true;
        };

        const closeAddBookModal = () => {
            isAddBookModalVisible.value = false;
        };

        fetchBooks();

        return {
            books,
            selectedBook,
            fetchBooks,
            handleSearch,
            showAddBookModal,
            closeAddBookModal,
            isAddBookModalVisible
        };
    }
});
</script>

<style scoped lang='scss'>
.books-container {
    padding: 14px;
}

.title {
    margin-bottom: 24px;
    color: #333;
    font-size: 24px;
    font-weight: bold;
}

.search-container {
    margin-bottom: 16px;
    display: flex;
    align-items: center; /* 垂直居中对齐 */
}

.book-list-card {
    margin-top: 16px;
    background-color: #fff;
}

.add-button {
    margin-left: 16px; /* 右移新增按钮 */
}
</style>
