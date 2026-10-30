# JOVI IA — Câmera Inteligente para Estudantes

> Challenge JOVI Smartphone 2026 — FIAP | **Sprint 4** — Front-End Design + Web Development (entrega conjunta)

## Links

- **Deploy na Vercel:** https://modoia-jovi.vercel.app
- **Repositório Git:** https://github.com/enzobiagiotti/ModoIA_JOVI.git
- **Protótipo Figma:** https://www.figma.com/design/AQ9DinKnuI6V1tQcUPmyw9

---

## Sobre o projeto

O **Modo IA** é um modo nativo dentro da câmera do JOVI com um mini menu interativo de ações inteligentes. O usuário escolhe o que a IA vai fazer com a foto: resumir, extrair texto, explicar, traduzir ou gerar perguntas de revisão.

Esta Sprint 4 é a **evolução do projeto React da Sprint 3**, mantendo a mesma solução da Challenge e adicionando: Tailwind CSS, rotas públicas/privadas com autenticação, hooks customizados e consumo de API pública.

---

## Tecnologias utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18.2 | Framework principal (componentes funcionais) |
| React Router DOM | 6.22 | Rotas públicas e privadas |
| Tailwind CSS | 3.4 | Toda a estilização (utility-first) |
| Vite | 5.4 | Build tool e dev server |
| JSONPlaceholder | — | API pública de terceiros consumida no Dashboard |
| localStorage | — | Persistência: login, lixeira, mensagens, visitas |

---

## Como instalar as dependências

Pré-requisitos: **Node.js 18+** e **npm 9+**

```bash
git clone https://github.com/enzobiagiotti/React_ModoIA_JOVI.git
cd React_ModoIA_JOVI
npm install
```

---

## Como executar o projeto

```bash
npm run dev
```

Acesse em **http://localhost:5173**

```bash
npm run build     # gera a pasta dist/ para produção
npm run preview   # visualiza o build localmente
```

---

## Como executar os servidores (Back-end)

Este projeto **não possui back-end próprio**. Os dados são consumidos da API pública **JSONPlaceholder** (`https://jsonplaceholder.typicode.com/posts`) e a autenticação é mockada no front-end. Basta rodar `npm run dev` — nenhum servidor adicional é necessário.

---

## Usuários e senhas para teste

A autenticação é simulada (sem back-end). Use qualquer um dos usuários abaixo na página `/login`:

| Usuário | E-mail | Senha | Perfil |
|---|---|---|---|
| Aluno FIAP | `aluno@fiap.com.br` | `123456` | aluno |
| Admin JOVI | `admin@jovi.com` | `admin123` | admin |

Na tela de login há botões que preenchem os campos automaticamente.

---

## Rotas da aplicação

| Rota | Tipo | Descrição |
|---|---|---|
| `/` | Pública | Landing Page completa (Solução, Público, Galeria, Equipe, Contato) |
| `/login` | Pública | Tela de login com usuários de teste |
| `/dashboard` | **Privada** | Central de conteúdo: capturas da API, busca, filtro por matéria, excluir |
| `/historico` | **Privada** | Estatísticas por matéria/ação + lixeira com restauração |
| `/albuns` | **Privada** | Organização livre: álbuns criados pelo usuário, mover e reordenar itens (↑↓), renomear, excluir |
| `/notificacoes` | **Privada** | Avisos gerados (novidades, revisão pendente, álbuns vazios) + controle público/privado dos álbuns |
| `*` | Pública | Página 404 |

Rotas privadas redirecionam para `/login`se o usuário não estiver autenticado (`PrivateRoute`).

---

## Arquitetura — separação lógica × visual

```
src/
├── hooks/            ← LÓGICA (hooks customizados)
│   ├── useAuth.js         acesso ao contexto de autenticação
│   ├── useLocalStorage.js estado sincronizado com localStorage
│   ├── useFetch.js        consumo genérico de API (dados/loading/erro)
│   ├── useCapturas.js     regra de negócio: API → capturas, busca, filtro, lixeira
│   ├── useStats.js        estatísticas com Math.random/round + contador de visitas
│   ├── useAlbuns.js       álbuns do usuário: criar, renomear, mover/reordenar itens, privacidade
│   ├── useNotificacoes.js gera avisos a partir das capturas/álbuns e controla lidas
│   └── useScroll.js       detecção de scroll para o header
├── context/
│   └── AuthContext.jsx    provider de autenticação (login/logout)
├── services/
│   ├── api.js             URLs, constantes e usuários mockados
│   └── membros.js         dados da equipe
├── components/       ← VISUAL (componentes com Tailwind)
│   ├── PrivateRoute.jsx   guarda de rota privada
│   ├── Header.jsx, Hero.jsx, PhoneMockup.jsx, Stats.jsx, Solucao.jsx,
│   ├── Diferencial.jsx, Publico.jsx, Galeria.jsx, Equipe.jsx,
│   └── Contato.jsx, Footer.jsx, SectionHeader.jsx
└── pages/
    ├── Home.jsx, Login.jsx, Dashboard.jsx, Historico.jsx,
    └── Albuns.jsx, Notificacoes.jsx, NotFound.jsx
```

### Requisitos atendidos

| Requisito | Onde |
|---|---|
| Componentização | 13 componentes + 7 páginas |
| Uso de props | `Equipe`, `Contato`, `Footer`recebem `membros[]`; `CardCaptura`recebe `c`e `onExcluir` |
| Rotas públicas e privadas | `App.jsx` + `PrivateRoute.jsx` |
| Hooks nativos | `useState`, `useEffect`, `useMemo`, `useContext`, `useNavigate`, `useLocation` |
| Hooks customizados | 8 hooks em `src/hooks/` |
| Tailwind CSS | 100% da estilização (sem CSS externo além do `index.css`com `@tailwind`) |
| Responsividade | Breakpoints `sm` / `md` / `lg`em todas as seções |
| Consumo de API | `useFetch` → JSONPlaceholder no Dashboard e Histórico |
| Math | `Math.random`, `Math.round`, `Math.floor`em `useStats`, `useCapturas`, `Contato`, `Historico` |
| localStorage | `useLocalStorage`para usuário, lixeira, álbuns, notificações lidas, mensagens e visitas |
| Deploy | Git + Vercel (`vercel.json`com rewrite para SPA) |

---

## Uso de IA no projeto

A Inteligência Artificial foi utilizada em duas frentes:

**1. No desenvolvimento (Claude — Anthropic):** a IA auxiliou na migração dos estilos CSS para classes Tailwind, na estruturação dos hooks customizados (`useFetch`, `useCapturas`, `useLocalStorage`) separando lógica de visual, na implementação das rotas privadas com `React Router`e na transformação dos dados da API JSONPlaceholder em capturas do JOVI IA. Todo o código foi revisado, testado e adaptado pela equipe antes de ser integrado.

**2. No produto (conceito do Modo IA):** a própria solução apresentada é baseada em IA — o Modo IA usa a Gemini API para processar imagens capturadas pela câmera do JOVI e gerar resumos, extrair texto, explicar conteúdo e criar perguntas de revisão automaticamente.

---

## Integrantes

| Nome | RM |
|---|---|
| Leonardo Farias Novaes Aguiar | RM570991 |
| Enzo Dos Santos Galbiatti Biagiotti | RM568894 |
| Paulo Ricardo Siqueira de Carlos | RM569992 |
| Heitor Ortiz Nogueira | RM569762 |
| Maria Eduarda Santos Gomes Da Silva | RM573097 |

---

## Informações acadêmicas

- **Instituição:** FIAP — Faculdade de Informática e Administração Paulista
- **Curso:** Engenharia de Software · Turma 1ESPV
- **Disciplinas:** Front-End Design + Web Development — Sprint 4
- **Empresa parceira:** JOVI Smartphone (Vivo Mobile)
- **Ano:** 2026
