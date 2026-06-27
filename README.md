#📌 Projeto Final Uninter
  Este repositório contém o projeto final desenvolvido para a disciplina Desenvolvimento Back-end da Uninter, utilizando Node.js, TypeScript, Express e Prisma com banco de dados MariaDB.

##🚀 Tecnologias Utilizadas
  Node.js – Ambiente de execução JavaScript

  TypeScript – Tipagem estática e segurança no código

  Express – Framework web rápido e minimalista

  Prisma – ORM moderno para manipulação de banco de dados

  MariaDB – Banco de dados relacional

  Swagger – Documentação interativa da API

  bcryptjs – Hash e verificação de senhas

  dotenv-safe – Gerenciamento seguro de variáveis de ambiente

##📂 Estrutura do Projeto

  PROJETO_FINAL_UNINTER/
  │
  ├── generated/                # Código gerado automaticamente pelo Prisma
  ├── node_modules/             # Dependências instaladas
  │
  ├── prisma/                   # Configurações e schema do banco de dados
  │   ├── migrations/           # Histórico de migrações do banco
  │   └── schema.prisma         # Definição dos modelos e relacionamentos
  │
  ├── src/                      # Código-fonte principal
  │   ├── docs/                 # Documentação da API (Swagger)
  │   ├── libs/                 # Funções auxiliares e utilitários
  │   ├── routes/               # Definição das rotas da aplicação
  │   ├── services/             # Lógica de negócio e integração com o banco
  │   ├── types/                # Tipos e interfaces TypeScript
  │   ├── seed.ts               # Script para popular o banco de dados
  │   └── server.ts             # Ponto de entrada do servidor Express
  │
  ├── .env                      # Variáveis de ambiente (não versionado)
  ├── .env.example              # Modelo de variáveis de ambiente
  ├── .gitignore                # Arquivos ignorados pelo Git
  ├── package.json              # Configuração de dependências e scripts
  ├── package-lock.json         # Controle de versões das dependências
  ├── prisma.config.ts          # Configuração adicional do Prisma
  ├── README.md                 # Documentação principal do projeto
  └── tsconfig.json             # Configuração do compilador TypeScript

##🧩 Organização Lógica

  | Diretório	    | Função Principal
  | prisma/	      | Define o modelo de dados e gerencia migrações.
  | src/routes/	  | Define os endpoints da API e conecta com os serviços.
  | src/services/	| Implementa a lógica de negócio e comunicação com o banco.
  | src/types/	  | Define interfaces e tipos para garantir segurança de tipagem.
  | src/libs/	    | Funções auxiliares reutilizáveis.
  | src/docs/	    | Documentação Swagger e arquivos de referência.

##⚙️ Configuração do Ambiente

  1 Clone o repositório:

  ```bash
    git clone https://github.com/Eliel-Rodrigues/Projeto__final__uninter
    cd Projeto__final__uninter
  ```
  2 Instale as dependências:

  ```bash
    npm install
  ```

  3 Crie um banco de dados
    ex: db_raizes_do_nordeste

  4 Configure o arquivo .env baseado no .env.example:
    Env
    PORT=3000
    JWT_SECRET=minha_chave_super_secreta
    DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
    DATABASE_USER="usuario"
    DATABASE_PASSWORD="senha"
    DATABASE_NAME="nome_do_banco"
    DATABASE_HOST="localhost"
    DATABASE_PORT=3306
    
  5 Execute as migrações do Prisma:
    
  ```bash
    npx prisma db push   
    npx prisma migrate dev
  ```
    
    
  6 Popule o banco de dados (opcional):

  ```bash
    npm run seed
  ```

##▶️ Executando o Projeto
  Para rodar em modo desenvolvimento:
  ```bash
    npm run dev
  ```

A aplicação será iniciada em:

Código
http://localhost:3000

##📖 Documentação da API
A documentação interativa está disponível via Swagger em:

Código
http://localhost:3000/api-docs

##🛠 Scripts Disponíveis
npm run dev → Executa o servidor em modo desenvolvimento

npm run seed → Popula o banco de dados com dados iniciais

##👨‍💻 Autor
Eliel Rodrigues  
📌 GitHub (https://github.com/Eliel-Rodrigues)
