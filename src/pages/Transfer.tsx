import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { transferSchema, type TransferFormData } from "@/schemas/transferSchema";
import { transferService } from "@/services/transferService";
import { useAccountStore } from "@/store/accountStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Transfer() {
  const navigate = useNavigate();
  const { balance, debit } = useAccountStore();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const [transferredAmount, setTransferredAmount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
  });

  async function onSubmit(data: TransferFormData) {
    try {
      setServerError("");
      await transferService(data, balance);
      const amount = parseFloat(data.amount.replace(",", "."));
      debit(amount);
      setTransferredAmount(amount);
      setSuccess(true);
      reset();
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message);
      }
    }
  }

  function handleNewTransfer() {
    setSuccess(false);
    setTransferredAmount(0);
  }

  const inputStyle = {
    backgroundColor: "#1F1F1F",
    borderColor: "#2D2D2D",
    color: "#FFFFFF",
  };

  const labelStyle = { color: "#D1D5DB" };

  if (success) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }}>
        <Header />
        <main className="max-w-md mx-auto px-4 py-6">
          <Card style={{ backgroundColor: "#141414", borderColor: "#1F1F1F" }}>
            <CardContent className="py-10 flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-full" style={{ backgroundColor: "#0D2E1A" }}>
                <CheckCircle2 size={40} style={{ color: "#00C46A" }} />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold" style={{ color: "#FFFFFF" }}>
                  Transferência realizada!
                </h2>
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  {formatCurrency(transferredAmount)} enviados com sucesso
                </p>
              </div>
              <div className="w-full pt-2 space-y-2">
                <p className="text-sm" style={{ color: "#6B7280" }}>
                  Saldo atual:{" "}
                  <span className="font-semibold" style={{ color: "#00C46A" }}>
                    {formatCurrency(balance)}
                  </span>
                </p>
                <Separator style={{ backgroundColor: "#1F1F1F" }} />
              </div>
              <div className="flex flex-col w-full gap-2 pt-2">
                <Button
                  onClick={handleNewTransfer}
                  className="w-full font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#00C46A", color: "#0A0A0A" }}
                >
                  Nova transferência
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/dashboard")}
                  className="w-full"
                  style={{ color: "#6B7280" }}
                >
                  Voltar ao início
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0A" }}>
      <Header />

      <main className="max-w-md mx-auto px-4 py-6 space-y-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: "#6B7280" }}
        >
          <ArrowLeft size={15} />
          Voltar
        </button>

        {/* Saldo */}
        <div className="rounded-lg px-4 py-3" style={{ backgroundColor: "#141414", border: "1px solid #1F1F1F" }}>
          <p className="text-xs font-medium" style={{ color: "#6B7280" }}>
            Saldo disponível
          </p>
          <p className="text-lg font-bold" style={{ color: "#00C46A" }}>
            {formatCurrency(balance)}
          </p>
        </div>

        {/* Formulário */}
        <Card style={{ backgroundColor: "#141414", borderColor: "#1F1F1F" }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base" style={{ color: "#FFFFFF" }}>
              Dados da transferência
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="recipientName" style={labelStyle}>
                  Nome do destinatário
                </Label>
                <Input
                  id="recipientName"
                  placeholder="Ex: Maria Souza"
                  {...register("recipientName")}
                  style={inputStyle}
                  className="placeholder:text-gray-600"
                />
                {errors.recipientName && (
                  <p className="text-xs" style={{ color: "#F87171" }}>
                    {errors.recipientName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="recipientAccount" style={labelStyle}>
                  Número da conta
                </Label>
                <Input
                  id="recipientAccount"
                  placeholder="Ex: 0001 9876-5"
                  {...register("recipientAccount")}
                  style={inputStyle}
                  className="placeholder:text-gray-600"
                />
                {errors.recipientAccount && (
                  <p className="text-xs" style={{ color: "#F87171" }}>
                    {errors.recipientAccount.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="amount" style={labelStyle}>
                  Valor (R$)
                </Label>
                <Input
                  id="amount"
                  placeholder="Ex: 150,00"
                  {...register("amount")}
                  style={inputStyle}
                  className="placeholder:text-gray-600"
                />
                {errors.amount && (
                  <p className="text-xs" style={{ color: "#F87171" }}>
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description" style={labelStyle}>
                  Descrição{" "}
                  <span style={{ color: "#6B7280" }} className="font-normal">
                    (opcional)
                  </span>
                </Label>
                <Input
                  id="description"
                  placeholder="Ex: Aluguel março"
                  {...register("description")}
                  style={inputStyle}
                  className="placeholder:text-gray-600"
                />
              </div>

              {serverError && (
                <div className="rounded-md p-3" style={{ backgroundColor: "#2D1515", border: "1px solid #7F1D1D" }}>
                  <p className="text-xs" style={{ color: "#F87171" }}>
                    {serverError}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full font-semibold hover:opacity-90 transition-opacity"
                disabled={isSubmitting}
                style={{ backgroundColor: "#00C46A", color: "#0A0A0A" }}
              >
                {isSubmitting ? "Processando..." : "Transferir"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
