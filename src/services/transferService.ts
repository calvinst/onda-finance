import type { TransferFormData } from "@/schemas/transferSchema";

export async function transferService(data: TransferFormData, currentBalance: number): Promise<void> {
  await new Promise((r) => setTimeout(r, 1000));

  const amount = parseFloat(data.amount.replace(",", "."));

  if (amount > currentBalance) {
    throw new Error("Saldo insuficiente");
  }
}
