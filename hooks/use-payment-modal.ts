import { create } from "zustand";

interface PaymentModalProps {
  isOpen: boolean;
  total: number;
  onOpen: (data: number) => void;
  onClose: () => void;
}

const usePaymentModal = create<PaymentModalProps>((set) => ({
  isOpen: false,
  total: 0,
  onOpen: (total: number) => set({ total, isOpen: true }),
  onClose: () => set({ total: 0, isOpen: false }),
}));
export default usePaymentModal;
