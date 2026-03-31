import { z } from "zod";

export const transferSchema = z.object({
  recipientName: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  recipientAccount: z.string().min(6, "Número de conta inválido"),
  amount: z
    .string()
    .min(1, "Valor é obrigatório")
    .refine((val) => {
      const num = parseFloat(val.replace(",", "."));
      return !isNaN(num) && num > 0;
    }, "Valor deve ser maior que zero"),
  description: z.string().optional(),
});

export type TransferFormData = z.infer<typeof transferSchema>;
