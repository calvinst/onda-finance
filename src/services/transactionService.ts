import type { Transaction, AccountData } from "@/types/transaction";

export const mockAccount: AccountData = {
  balance: 4750.0,
  ownerName: "Calvin Trautwein",
  accountNumber: "0001 2345-6",
};

export const mockTransactions: Transaction[] = [
  { id: "1", description: "Salário", amount: 5000, type: "credit", date: "2025-03-01", category: "Renda" },
  { id: "2", description: "Aluguel", amount: 1200, type: "debit", date: "2025-03-05", category: "Moradia" },
  { id: "3", description: "Supermercado", amount: 380, type: "debit", date: "2025-03-08", category: "Alimentação" },
  { id: "4", description: "Freelance Design", amount: 800, type: "credit", date: "2025-03-10", category: "Renda" },
  { id: "5", description: "Netflix", amount: 45, type: "debit", date: "2025-03-12", category: "Entretenimento" },
  { id: "6", description: "Farmácia", amount: 95, type: "debit", date: "2025-03-14", category: "Saúde" },
  {
    id: "7",
    description: "Transferência recebida",
    amount: 250,
    type: "credit",
    date: "2025-03-15",
    category: "Transferência",
  },
  { id: "8", description: "Conta de luz", amount: 180, type: "debit", date: "2025-03-18", category: "Moradia" },
];

// Simula delay de rede
export async function fetchTransactions(): Promise<Transaction[]> {
  await new Promise((r) => setTimeout(r, 600));
  return mockTransactions;
}

export async function fetchAccount(): Promise<AccountData> {
  await new Promise((r) => setTimeout(r, 400));
  return mockAccount;
}
