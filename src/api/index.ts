import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 图书API
export const bookAPI = {
  addBook: (data: object) => api.post('/books', data),
  deleteBook: (bookId: number) => api.delete(`/books/${bookId}`),
  searchBooks: (params: object) => api.get('/books', { params }),
  getBorrowCount: (bookId: number) => api.get(`/books/${bookId}/borrow-count`),
};

// 会员API
export const memberAPI = {
  addMember: (data: object) => api.post('/members', data),
  deleteMember: (memberId: number) => api.delete(`/members/${memberId}`),
  searchMembers: (params: object) => api.get('/members', { params }),
  getBorrowHistory: (memberId: number) =>
    api.get(`/members/${memberId}/borrow-history`),
};

// 借阅管理API
export const borrowAPI = {
  borrowBook: (data: object) => api.post('/borrow', data),
  returnBook: (data: object) => api.post('/return', data),
};
