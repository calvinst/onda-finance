import axios from "axios";
import type { User } from "@/types/auth";

// Usuário mock — simula o retorno de uma API real
const MOCK_USER: User = {
  id: "1",
  name: "Calvin Trautwein",
  email: "calvin@onda.com",
};

const MOCK_PASSWORD = "teste123";
const MOCK_TOKEN = "mock-jwt-token-onda-finance";

export async function loginService(email: string, password: string): Promise<{ user: User; token: string }> {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (email === MOCK_USER.email && password === MOCK_PASSWORD) {
    return { user: MOCK_USER, token: MOCK_TOKEN };
  }

  // Simula erro 401 da API
  throw new axios.Cancel("Credenciais inválidas");
}
