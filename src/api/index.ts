import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 10000
});

/* 图书API */

// 增加图书
export const addBook = (bookData: any) => {
    return api.post('/books', bookData);
}

// 查询图书
export const queryBooks = (params: any) => {
    return api.get('/books', { params });
}

// 删除图书
export const deleteBook = (bookId: number) => {
    return api.delete(`/books/${bookId}`);
}

// 查询图书借阅次数
export const getBorrowCount = (bookId: number) => {
    return api.get(`/books/${bookId}/borrow-count`);
}

