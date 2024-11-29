// useModalStore.js
import { create } from 'zustand';

const useModalStore = create((set) => ({
  isOpen: false,

  // 모달 열기
  openModal: () => set({ isOpen: true }),

  // 모달 닫기
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
