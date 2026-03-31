import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/loginSchema";
import { loginService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      setServerError("");
      const { user, token } = await loginService(data.email, data.password);
      login(user, token);
      navigate("/dashboard");
    } catch {
      setServerError("E-mail ou senha inválidos. Tente: calvin@onda.com / teste123");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#0A0A0A" }}>
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: "#FFFFFF" }}>
            OndaFinance
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Seu banco digital simples e seguro
          </p>
        </div>

        {/* Card */}
        <Card style={{ backgroundColor: "#141414", borderColor: "#1F1F1F" }}>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg" style={{ color: "#FFFFFF" }}>
              Entrar na sua conta
            </CardTitle>
            <CardDescription style={{ color: "#6B7280" }}>Use suas credenciais para acessar</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" style={{ color: "#D1D5DB" }}>
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  style={{
                    backgroundColor: "#1F1F1F",
                    borderColor: "#2D2D2D",
                    color: "#FFFFFF",
                  }}
                  className="placeholder:text-gray-600"
                />
                {errors.email && (
                  <p className="text-xs" style={{ color: "#F87171" }}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" style={{ color: "#D1D5DB" }}>
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  style={{
                    backgroundColor: "#1F1F1F",
                    borderColor: "#2D2D2D",
                    color: "#FFFFFF",
                  }}
                  className="placeholder:text-gray-600"
                />
                {errors.password && (
                  <p className="text-xs" style={{ color: "#F87171" }}>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {serverError && (
                <div
                  className="rounded-md p-3"
                  style={{ backgroundColor: "#2D1515", borderColor: "#7F1D1D", border: "1px solid" }}
                >
                  <p className="text-xs" style={{ color: "#F87171" }}>
                    {serverError}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full font-semibold transition-opacity hover:opacity-90"
                disabled={isSubmitting}
                style={{ backgroundColor: "#00C46A", color: "#0A0A0A" }}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Credenciais de teste */}
            <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: "#1A1A1A", border: "1px solid #2D2D2D" }}>
              <p className="text-xs font-medium mb-1" style={{ color: "#6B7280" }}>
                Credenciais de teste:
              </p>
              <p className="text-xs" style={{ color: "#9CA3AF" }}>
                📧 calvin@onda.com
              </p>
              <p className="text-xs" style={{ color: "#9CA3AF" }}>
                🔑 teste123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
