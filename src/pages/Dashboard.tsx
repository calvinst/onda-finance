import { ArrowLeftRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BalanceCard from "@/components/BalanceCard";
import TransactionList from "@/components/TransactionList";
import { useAccount } from "@/hooks/useTransactions";

export default function Dashboard() {
  const navigate = useNavigate();
  useAccount();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }}>
      <Header />

      <main className="max-w-md mx-auto px-4 py-6 space-y-4">
        <BalanceCard />

        <Button
          onClick={() => navigate("/transfer")}
          className="w-full font-semibold gap-2 transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#00C46A", color: "#0A0A0A" }}
        >
          <ArrowLeftRight size={16} />
          Nova Transferência
        </Button>

        <TransactionList />
      </main>
    </div>
  );
}
