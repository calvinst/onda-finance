import { useState } from "react";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAccountStore } from "@/store/accountStore";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function BalanceCard() {
  const balance = useAccountStore((s) => s.balance);
  const [visible, setVisible] = useState(true);

  return (
    <Card style={{ backgroundColor: "#141414", borderColor: "#1F1F1F" }}>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium" style={{ color: "#6B7280" }}>
            Saldo disponível
          </p>
          <button onClick={() => setVisible(!visible)} className="transition-colors" style={{ color: "#6B7280" }}>
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div>
          <p className="text-3xl font-bold tracking-tight" style={{ color: "#FFFFFF" }}>
            {visible ? formatCurrency(balance) : "••••••"}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#00C46A" }}>
          <TrendingUp size={14} />
          <span>Conta corrente • 0001 2345-6</span>
        </div>
      </CardContent>
    </Card>
  );
}
