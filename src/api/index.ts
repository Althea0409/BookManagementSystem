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

/* 会员API */

// 增加会员
export const addMember = (memberData: any) => {
    return api.post('/members', memberData);
};

// 查询会员
export const queryMembers = (params: any) => {
    return api.get('/members', { params });
};

// 删除会员
export const deleteMember = (memberId: number) => {
    return api.delete(`/members/${memberId}`);
};

// 查询会员详细信息
export const getMemberDetail = (memberId: number) => {
    return api.get(`/members/${memberId}`);
};

/* 借阅API */

// 借阅图书
export const borrowBook = (borrowData: any) => {
    return api.post('/borrow', borrowData);
}

// 归还图书
export const returnBook = (returnData: any) => {
    return api.post('/return', returnData);
}

// 查询会员借阅历史
export const getBorrowHistory = (memberId: number) => {
    return api.get(`/members/${memberId}/borrow-history`);
}

// 查询图书借阅次数
export const getBookBorrowCount = (bookId: number) => {
    return api.get(`/books/${bookId}/borrow-count`);
}