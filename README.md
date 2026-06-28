# 📌 Projeto Final Uninter  
  Este repositório contém o projeto final Uninter desenvolvido para a disciplina Desenvolvimento Back-end, utilizando Node.js, TypeScript, Express e Prisma com banco de dados MariaDB.

## 🚀 Tecnologias Utilizadas
  Node.js – Ambiente de execução JavaScript

  TypeScript – Tipagem estática e segurança no código

  Express – Framework web rápido e minimalista

  Prisma – ORM moderno para manipulação de banco de dados

  MariaDB – Banco de dados relacional

  Swagger – Documentação interativa da API

  bcryptjs – Hash e verificação de senhas

  dotenv-safe – Gerenciamento seguro de variáveis de ambiente

## 📂 Estrutura do Projeto

  PROJETO_FINAL_UNINTER/  
│  
├── generated/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Código gerado automaticamente pelo Prisma  
  ├── node_modules/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Dependências instaladas    
  │  
  ├── prisma/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Configurações e schema do banco de dados  
  │   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── migrations/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Histórico de migrações do banco  
  │   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── schema.prisma&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Definição dos modelos e relacionamentos  
  │  
  ├── src/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Código-fonte principal  
  │   &nbsp;&nbsp;&nbsp;&nbsp;├── docs/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Documentação da API (Swagger)  
  │   &nbsp;&nbsp;&nbsp;&nbsp;├── libs/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Funções auxiliares e utilitários  
  │   &nbsp;&nbsp;&nbsp;&nbsp;├── routes/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Definição das rotas da aplicação  
  │   &nbsp;&nbsp;&nbsp;&nbsp;├── services/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Lógica de negócio e integração com o banco  
  │   &nbsp;&nbsp;&nbsp;&nbsp;├── types/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Tipos e interfaces TypeScript  
  │   &nbsp;&nbsp;&nbsp;&nbsp;├── seed.ts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Script para popular o banco de dados  
  │   &nbsp;&nbsp;&nbsp;&nbsp;└── server.ts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Ponto de entrada do servidor Express  
  │  
  ├── .env&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Variáveis de ambiente (não versionado)  
  ├── .env.example&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Modelo de variáveis de ambiente  
  ├── .gitignore&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Arquivos ignorados pelo Git  
  ├── package.json&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Configuração de dependências e scripts  
  ├── package-lock.json&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Controle de versões das dependências  
  ├── prisma.config.ts&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Configuração adicional do Prisma  
  ├── README.md&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Documentação principal do projeto  
  └── tsconfig.json&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Configuração do compilador TypeScript  

## 🧩 Organização Lógica

  | Diretório	    | Função Principal\ |
  |---------------|-------------------|
  | prisma/	      | Define o modelo de dados e gerencia migrações.|
  | src/routes/	  | Define os endpoints da API e conecta com os serviços.|
  | src/services/	| Implementa a lógica de negócio e comunicação com o banco.|
  | src/types/	  | Define interfaces e tipos para garantir segurança de tipagem.|
  | src/libs/	    | Funções auxiliares reutilizáveis.|
  | src/docs/	    | Documentação Swagger e arquivos de referência.|

## ⚙️ Configuração do Ambiente

  1 Clone o repositório:

  ```bash
    git clone https://github.com/Eliel-Rodrigues/Projeto__final__uninter
  ```
  2 Instale as dependências:

  ```bash
    npm install
  ```

  3 Crie um banco de dados   

  ```bash 
    CREATE DATABASE raizes_db
  ```

  4 Configure o arquivo .env baseado no .env.example:  
    &nbsp;&nbsp;&nbsp;&nbsp;Env  

    PORT=3000
    JWT_SECRET=minha_chave_super_secreta
    DATABASE_USER="usuario"
    DATABASE_PASSWORD="senha"
    DATABASE_NAME="nome_do_banco"
    DATABASE_HOST="localhost"
    
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

### A aplicação será iniciada em:

Porta:
http://localhost:3000

## 📖 Documentação da API
### A documentação interativa está disponível via Swagger em:

Porta:
http://localhost:3000/api-docs

## 🛠 Scripts Disponíveis
#### npm run dev → Executa o servidor em modo desenvolvimento

#### npm run seed → Popula o banco de dados com dados iniciais

## 📌 Exemplos de Rotas da API
## 👤 Usuários

### Criar Usuário  
**Endpoint:**
```http  
POST /usuarios
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456",
  "role": "CLIENTE"
}
```
 **Resposta de sucesso(200):**

```json
{
  "massege": "Usuário criado com sucesso",
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "role": "CLIENTE"
}
```

## 🏢 Unidades

#### Criar Unidade

**Endpoint:**

```http
POST /unidades
```
**Headers:**

```http
Content-Type: application/json
Authorization: Bearer <seu_token>     # apenas se for ADMIN
```
**Body (JSON):**

```json
{
  "nome": "Unidade Centro",
  "cidade": "Recife",
  "cep": "50000-000"
}
```
**Resposta de sucesso(201):**

```json
{
  "id": 1,
  "nome": "Unidade Centro",
  "cidade": "Recife",
  "cep": "50000-000"
}
```
## 🍔 Produtos

### Criar Produto

**Endpoint:**

```http
POST /produtos
```
**Headers:**

```http
Content-Type: application/json
Authorization: Bearer <seu_token>     # apenas se for ADMIN
```
**Body (JSON):**

```json
{
  "nome": "Peixada Nordestina",
  "preco": 25,
  "estoque": 0,
  "unidadeId": 1
}
```
**Resposta de sucesso(201):**

```json
{
	"massage": "Produto criado com sucesso",
	"produto": {
		"id": 1,
		"nome": "Fejoada",
		"preco": 25,
		"estoque": 0,
		"unidadeId": 1
	}
}
```

## 📦 Pedidos

### Criar Pedido

**Endpoint:**

```http
POST /pedidos
```
**Headers:**

```http
Content-Type: application/json
Authorization: Bearer <seu_token>    
```
**Body (JSON):**

```json
{ 
	"clienteId": 1,
	"canal": "APP",
	"itens": [
		{
			"produtoId": 2,
			"quantidade": 4
		}
	]
}
``` 

**Resposta de sucesso(201):**

```json
{
	"massage": "Pedido criado com sucesso",
	"pedido": {
		"id": 31,
		"canalPedido": "BALCAO",
		"clienteId": 64,
		"status": "AGUADANDO_PAGAMENTO",
		"valorTotal": 82,
		"itens": [
			{
				"id": 38,
				"pedidoId": 31,
				"produtoId": 2,
				"quantidade": 4
			}
		]
	}
}
```

## 👨‍💻 Autor
### Eliel Rodrigues  
#### 📌 GitHub (https://github.com/Eliel-Rodrigues)