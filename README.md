# 🩺 Prontuário+

O **Prontuário+** é uma aplicação web desenvolvida para auxiliar médicos no gerenciamento de seus pacientes e no registro de atendimentos.

A aplicação permite centralizar informações pessoais e clínicas dos pacientes, acompanhar seu histórico de atendimentos e gerar relatórios em PDF.

🚧 O projeto ainda está em fase de desenvolvimento.

## 🚀 Funcionalidades

### 🔐 Autenticação

> **Acesso protegido por autenticação JWT**

- Cadastro de médicos
- Login
- Autenticação utilizando JWT
- Rotas protegidas
- Associação dos pacientes ao médico autenticado

### 👤 Pacientes

> **Gerenciamento completo dos pacientes**

- Cadastro de pacientes
- Listagem
- Visualização dos dados
- Atualização
- Exclusão
- Busca de pacientes
- Associação entre **caso índice** e **familiares**

### 🩺 Atendimentos

> **Registro do histórico clínico do paciente**

Cada atendimento pode conter:

- Anamnese
- Diagnóstico
- Conduta
- Prescrição
- Observações
- Data e horário do atendimento

### 📄 Relatórios

> **Transforme um atendimento em um documento PDF**

O sistema permite gerar e baixar um relatório contendo:

- Dados pessoais do paciente
- Data do atendimento
- Anamnese
- Diagnóstico
- Conduta
- Prescrição
- Observações

## 🛠️ Tecnologias

- Node.js 
- TypeScript
- Fastify
- MongoDB
- JWT
- bcrypt
- PDFKit

---

## 🧩 Arquitetura

```text
src
├── config
├── modules
│   ├── patient
│   │   ├── interfaces
│   │   ├── repositories
│   │   ├── controllers
│   │   └── routes
│   │
│   ├── doctor
│   │   ├── interfaces
│   │   ├── repositories
│   │   ├── controllers
│   │   └── routes
│   │
│   └── attendance
│       ├── interfaces
│       ├── repositories
│       ├── controllers
│       ├── services
│       └── routes
│
├── plugins
├── middlewares
├── shared
└── types

```

## 🚀 Como executar

### Pré-requisitos
- Node.js
- npm
- MongoDB

Entre na pasta do projeto

Instale as dependências:

```
npm install
```

Crie um arquivo .env:

```
PORT=3003
MONGO_URL=mongodb://localhost:0000/Prontuario
JWT_SECRET=sua_chave_secreta
```

Inicie o servidor:

```
npm run dev
```