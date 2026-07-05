import { create } from 'zustand';
import { Transaction, Category, TransactionCategory } from '../types';
import { mockTransactions, mockCategories } from '../mock/data';

interface TransactionState {
  transactions: Transaction[];
  categories: Category[];
  selectedCategory: TransactionCategory | '全部';
  searchQuery: string;
  isLoading: boolean;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setSelectedCategory: (category: TransactionCategory | '全部') => void;
  setSearchQuery: (query: string) => void;
  getFilteredTransactions: () => Transaction[];
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: mockTransactions,
  categories: mockCategories,
  selectedCategory: '全部',
  searchQuery: '',
  isLoading: false,

  setTransactions: (transactions) => set({ transactions }),

  addTransaction: (transaction) => set((state) => ({
    transactions: [transaction, ...state.transactions],
  })),

  updateTransaction: (id, updates) => set((state) => ({
    transactions: state.transactions.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    ),
  })),

  deleteTransaction: (id) => set((state) => ({
    transactions: state.transactions.filter((t) => t.id !== id),
  })),

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  getFilteredTransactions: () => {
    const { transactions, selectedCategory, searchQuery } = get();
    return transactions.filter((t) => {
      const matchCategory = selectedCategory === '全部' || t.category === selectedCategory;
      const matchSearch = searchQuery === '' || 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch && t.status === 'published';
    });
  },
}));
