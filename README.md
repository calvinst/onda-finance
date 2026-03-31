# Onda Finance — Desafio Front-End

Aplicação web simulando um app bancário simples, desenvolvida como solução para o desafio técnico da Onda Finance.

🔗 **[Acesse a aplicação](https://SEU-LINK-AQUI.vercel.app)**

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js 18+
- npm 9+

### Instalação
```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/onda-finance.git
cd onda-finance

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:5173`

### Credenciais de teste
| Campo | Valor |
|-------|-------|
| E-mail | calvin@onda.com |
| Senha | teste123 |

### Scripts disponíveis
```bash
npm run dev       # Servidor de desenvolvimento
npm run build     # Build de produção
npm run preview   # Preview do build
npm run test      # Rodar testes
```

---

## 🏗️ Decisões técnicas

### Stack
| Tecnologia | Decisão |
|---|---|
| **React + TypeScript** | Type safety em todo o projeto, reduzindo bugs em tempo de compilação |
| **Vite** | Build tool moderno com HMR instantâneo e builds otimizados |
| **Tailwind CSS + CVA** | Estilização utilitária com variantes tipadas para componentes consistentes |
| **shadcn/ui + Radix** | Componentes acessíveis (WAI-ARIA) sem overhead de uma lib de UI fechada |
| **React Router v6** | Roteamento declarativo com proteção de rotas via wrapper `ProtectedRoute` |
| **React Query** | Cache e sincronização de estado servidor, com loading/error states automáticos |
| **Zustand** | Estado global leve e sem boilerplate; `persist` middleware para sessão no localStorage |
| **React Hook Form + Zod** | Formulários performáticos com validação tipada e mensagens de erro precisas |
| **Axios** | Cliente HTTP com interceptors prontos para autenticação em produção |
| **Vitest** | Integração nativa com Vite, sem config extra; API compatível com Jest |

### Arquitetura
```
src/
├── components/     # Componentes reutilizáveis (Header, BalanceCard, etc.)
├── pages/          # Páginas da aplicação (Login, Dashboard, Transfer)
├── store/          # Estado global Zustand (auth, account)
├── services/       # Camada de serviços / chamadas de API
├── hooks/          # React Query hooks customizados
├── schemas/        # Schemas de validação Zod
├── types/          # Interfaces e tipos TypeScript
└── test/           # Setup e arquivos de teste
```

### Autenticação e persistência de sessão
A sessão é gerenciada pelo Zustand com o middleware `persist`, que serializa o estado (`user`, `token`, `isAuthenticated`) no `localStorage` sob a chave `onda-auth`. Rotas protegidas são controladas pelo componente `ProtectedRoute`, que redireciona para `/login` caso o usuário não esteja autenticado.

### Fluxo de dados
- **React Query** busca e cacheia dados do servidor (transações, conta)
- **Zustand** mantém estado global de UI (saldo atual, usuário logado)
- Ao realizar uma transferência, o saldo é debitado imediatamente no store (`debit()`), garantindo atualização reativa em toda a aplicação sem nova requisição

---

## 🔒 Segurança (como o app seria protegido em produção)

### Engenharia reversa

**Ofuscação de código**
O bundle gerado pelo Vite em produção já aplica minificação. Em produção real, ferramentas como `javascript-obfuscator` seriam adicionadas ao pipeline de build para dificultar leitura do código-fonte.

**Variáveis de ambiente**
Chaves de API, tokens e URLs sensíveis nunca ficam no código-fonte. São injetadas via `.env` e prefixadas com `VITE_` apenas quando necessário expor ao cliente — dados realmente sensíveis ficam exclusivamente no backend.

**Build com source maps desabilitados**
Em produção, `sourcemap: false` no `vite.config.ts` impede que o código original seja reconstruído a partir do bundle.

**Autenticação real com JWT**
Em produção, o mock seria substituído por um endpoint real. O token JWT seria armazenado em cookie `HttpOnly` (não acessível via JavaScript), eliminando o risco de roubo por XSS. O `localStorage` usado aqui é apenas para fins de demonstração.

---

### Vazamento de dados

**HTTPS obrigatório**
Toda comunicação entre cliente e servidor ocorreria via HTTPS com TLS 1.2+, impedindo interceptação de dados em trânsito (ataques man-in-the-middle).

**Interceptors Axios para autenticação**
O Axios seria configurado com interceptors que injetam o token em cada requisição e tratam respostas 401 redirecionando para logout automático:
```ts
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) logout()
    return Promise.reject(err)
  }
)
```

**Proteção contra XSS**
React escapa automaticamente conteúdo dinâmico renderizado via JSX. `dangerouslySetInnerHTML` seria evitado. Headers de segurança como `Content-Security-Policy` seriam configurados no servidor.

**Proteção contra CSRF**
Utilizando cookies `HttpOnly` + `SameSite=Strict` e tokens CSRF nos endpoints de mutação.

**Rate limiting e validação no backend**
Todas as validações Zod do frontend seriam replicadas no backend. Rate limiting protegeria endpoints de login contra ataques de força bruta.

**Logs e monitoramento**
Integração com ferramentas como Sentry para rastreamento de erros sem expor dados sensíveis nos logs.

---

## 🔮 Melhorias futuras

- [ ] **Autenticação real** com JWT via cookie HttpOnly + refresh token
- [ ] **2FA** (autenticação em dois fatores) por SMS ou TOTP
- [ ] **Paginação** na listagem de transações
- [ ] **Filtros** por data, categoria e tipo na listagem
- [ ] **Comprovante de transferência** em PDF para download
- [ ] **Gráficos** de gastos por categoria com Recharts
- [ ] **PWA** com suporte offline e notificações push
- [ ] **Testes E2E** com Playwright cobrindo os fluxos críticos
- [ ] **i18n** com suporte a múltiplos idiomas (PT/EN)
- [ ] **Dark/Light mode** com persistência de preferência
- [ ] **CI/CD** com GitHub Actions rodando lint, testes e deploy automático