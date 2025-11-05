# Blog Project

Este projeto é um sistema de blog simples, com **frontend em Next.js**, **backend em Node.js** e **banco de dados PostgreSQL** rodando em Docker.  

---

## 1. Tecnologias

- **Frontend:** Next.js (React)  
- **Backend:** Node.js + Express  
- **Banco de dados:** PostgreSQL  
- **Docker:** Para orquestração de backend, frontend e banco  
- **ORM:** Sequelize (ou ajuste conforme seu backend)  

---

## 2. Estrutura do projeto

meu-projeto/
│
├── frontend/ # Código do Next.js
│ └── Dockerfile
├── backend/ # Código Node.js/Express
│ └── Dockerfile
├── db-init/ # Scripts de inicialização do banco
│ └── schema.sql
├── docker-compose.yml
└── README.md


---

## 3. Pré-requisitos

- [Node.js](https://nodejs.org/) (para rodar localmente sem Docker)  
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)  
- NPM ou Yarn  

---

## 4. Rodando o projeto

### 1️⃣ Com Docker (recomendado)

O projeto já está configurado para rodar **frontend, backend e banco** com um único comando:

docker-compose up --build

- Frontend: http://localhost:3000

- Backend: http://localhost:5001

- Banco de dados: Porta 5431 (PostgreSQL)

O banco cria automaticamente as tabelas definidas em db-init/schema.sql na primeira vez que o container sobe.

2️⃣ Rodando localmente sem Docker
Banco de dados

Configure um PostgreSQL localmente com as mesmas credenciais do .env.example:

DB_HOST=localhost
DB_PORT=5431
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=blogdb

Crie as tabelas executando db-init/schema.sql manualmente.

-Backend
cd backend
npm install
npm run dev  # Para desenvolvimento
# ou npm run build && npm start  # Para produção

-Frontend
cd frontend
npm install
npm run dev  # Para desenvolvimento
# ou npm run build && npm start  # Para produção

Variáveis de ambiente(.env)
-Backend
DB_HOST=blog_db
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=blogdb
JWT_SECRET=algumsegredo

-Frontend
NEXT_PUBLIC_API_URL=http://localhost:5001
