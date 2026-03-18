import { create } from 'zustand';
import { User, Product } from '@/types';

interface StoreState {
  activeTab: 'users' | 'products';
  setActiveTab: (tab: 'users' | 'products') => void;
  viewMode: 'list' | 'grid';
  setViewMode: (mode: 'list' | 'grid') => void;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  activeTab: 'users',
  setActiveTab: (tab) => set({ activeTab: tab, selectedUser: null, selectedProduct: null }),
  viewMode: 'list',
  setViewMode: (mode) => set({ viewMode: mode }),
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));
