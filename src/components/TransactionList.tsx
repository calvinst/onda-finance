import { ArrowDownLeft, ArrowUpRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTransactions } from "@/hooks/useTransactions";
import type { Transaction } from "@/types/transaction";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const isCredit = transaction.type === "credit";

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="p-2 rounded-full" style={{ backgroundColor: "#1F1F1F" }}>
        {isCredit ? (
          <ArrowDownLeft size={16} style={{ color: "#00C46A" }} />
        ) : (
          <ArrowUpRight size={16} style={{ color: "#F87171" }} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: "#FFFFFF" }}>
          {transaction.description}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs" style={{ color: "#6B7280" }}>
            {formatDate(transaction.date)}
          </span>
          <Badge
            variant="secondary"
            className="text-xs px-1.5 py-0 h-4"
            style={{ backgroundColor: "#1F1F1F", color: "#9CA3AF", border: "none" }}
          >
            {transaction.category}
          </Badge>
        </div>
      </div>

      <p className="text-sm font-semibold tabular-nums" style={{ color: isCredit ? "#00C46A" : "#FFFFFF" }}>
        {isCredit ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </p>
    </div>
  );
}

export default function TransactionList() {
  const { data: transactions, isLoading, isError } = useTransactions();

  return (
    <Card style={{ backgroundColor: "#141414", borderColor: "#1F1F1F" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base" style={{ color: "#FFFFFF" }}>
          Extrato
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="animate-spin" style={{ color: "#00C46A" }} />
          </div>
        )}

        {isError && (
          <p className="text-sm text-center py-8" style={{ color: "#F87171" }}>
            Erro ao carregar transações.
          </p>
        )}

        {transactions &&
          transactions.map((t, i) => (
            <div key={t.id}>
              <TransactionItem transaction={t} />
              {i < transactions.length - 1 && <Separator style={{ backgroundColor: "#1F1F1F" }} />}
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
