# Bank Account

Este microsserviço, desenvolvido em NodeJS e [NestJS](https://docs.nestjs.com/) como framework, tem como objetivo simular as transações bancárias de uma conta.
Possui as operações básicas de depósito, saque e transferência entre contas (de forma instantânea).
A seguir, darei o passo a passo de como clonar o repositório, intalar as dependências e rodar o projeto localmente.


## 🚀 Começando

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto, é imprescindível ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).
Optei pelo uso do [PostgreSQL](https://www.postgresql.org/) como banco relacional, então caso não tenha o mesmo instalado,
será necessário que utilize o [Docker](https://www.docker.com/products/docker-desktop/) ok?

### 📋 Pré-requisitos

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/) ({ node: 17.4.0, npm: 8.8.0 })
- [TypeScript](https://www.typescriptlang.org/) ({ tsc: 5.2.2 })

### 🔧 Instalação

```bash
# Clone este repositório
$ git clone git@github.com:gabrielhsantos/Bank_Account_Simulation.git

# Acesse a pasta do projeto no terminal/cmd
$ cd Bank_Account_Simulation

# Instale as dependências
$ npm ci
```

### 🎲 Banco de dados (servidor)

Caso utilize o PostgreSQL, basta executar os seguintes comandos:

```bash
# Execute as migrations
$ npm run migration:run
```
Isso fará com que as tabelas *accounts* e *transactions* sejam criadas no banco de dados.

```bash
# Popule a tabela accounts
$ npm run seed:run
```
Com isso, serão criados dois registros de exemplo na tabela accounts.

### 🐋 Container

Se a opção for o uso do Docker, existe na raiz do projeto um arquivo docker-compose,
que irá instalar o PostgreSQL em um conteiner.
Para isso, basta rodar esse comando:

```bash
# Subir o container Docker
$ npm run infra:up
```
Obs: ao subir a infra, o processo de migration e seed ocorrerá automaticamente.

Para derrubar o container e os volumes gerados, basta rodar:

```bash
# Remover o container Docker e volumes
$ npm run infra:down
```

# Execute a aplicação
```bash
$ npm start
```
O servidor inciará na porta:3000 (ou a porta que foi definida no arquivo .env.development).

### ⚙️ Executando os testes

Para rodar os testes, basta utilizar este comando via terminal/cmd:

```bash
# Irá rodar os testes de integração e unitários
$ npm t

# Irá rodar apenas os testes de integração
$ npm run test:integration

# Irá rodar apenas os testes unitários
$ npm run test:unit
```
Caso queira um registro com o coverage:

```bash
# Irá rodar os testes e gerar a % de cobertura
$ npm run test:cov
```

### 📦 Documentação

Um arquivo com extensão .json se encontra na pasta:
```src/shared/docs```

O mesmo pode ser importado dentro do [Postman](https://www.postman.com/), para facilitar o acesso aos endpoints.

A documentação com o swagger, pode ser acessada pela url [/doc](http://localhost:3000/doc/) com o servidor rodando.
