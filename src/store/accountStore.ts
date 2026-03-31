import { create } from "zustand";

interface AccountStore {
  balance: number;
  setBalance: (balance: number) => void;
  debit: (amount: number) => void;
}

export const useAccountStore = create<AccountStore>((set) => ({
  balance: 0,
  setBalance: (balance) => set({ balance }),
  debit: (amount) => set((state) => ({ balance: state.balance - amount })),
}));
