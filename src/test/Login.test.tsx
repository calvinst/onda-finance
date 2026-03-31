import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "@/pages/Login";

// Mock do useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock do authStore
const mockLogin = vi.fn();
vi.mock("@/store/authStore", () => ({
  useAuthStore: () => ({
    login: mockLogin,
  }),
}));

function renderLogin() {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
}

describe("Página de Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar o formulário corretamente", () => {
    renderLogin();

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("deve exibir erros de validação ao submeter vazio", async () => {
    renderLogin();

    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/senha deve ter no mínimo 6 caracteres/i)).toBeInTheDocument();
    });
  });

  it("deve exibir erro ao usar credenciais inválidas", async () => {
    renderLogin();

    await userEvent.type(screen.getByLabelText(/e-mail/i), "errado@email.com");
    await userEvent.type(screen.getByLabelText(/senha/i), "senhaerrada");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(
      () => {
        expect(screen.getByText(/e-mail ou senha inválidos/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it("deve redirecionar ao dashboard com credenciais corretas", async () => {
    renderLogin();

    await userEvent.type(screen.getByLabelText(/e-mail/i), "calvin@onda.com");
    await userEvent.type(screen.getByLabelText(/senha/i), "teste123");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(
      () => {
        expect(mockLogin).toHaveBeenCalledOnce();
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
      },
      { timeout: 3000 },
    );
  });
});
