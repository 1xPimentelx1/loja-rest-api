# Loja REST API — bd_dsapi

Projeto acadêmico de API REST para loja online usando **JavaScript, Node.js, Express e MySQL**. Implementa cadastro e login de clientes, catálogo, pedidos com controle transacional de estoque e rotas administrativas. O esquema SQL segue as seis entidades do diagrama ER fornecido: `cidades`, `clientes`, `categorias`, `produtos`, `pedidos` e `pedidos_produtos`. As colunas `email`, `senha_hash`, `papel` e `status` são extensões necessárias para autenticação, autorização e acompanhamento de pedidos.

## Requisitos
- Node.js 20 ou superior
- MySQL 8 (pode usar o MySQL do XAMPP, se disponível)
- Postman ou Insomnia para testar

## Como executar

1. Execute `database/schema.sql` no MySQL Workbench ou phpMyAdmin. Isso cria o banco **bd_dsapi**, tabelas e registros iniciais de cidades e categorias.
2. No terminal, dentro da pasta do projeto:

```bash
npm install
```

3. Copie `.env.example` para `.env` e ajuste os dados do MySQL e uma chave `JWT_SECRET` forte. Nunca envie o `.env` para o GitHub.
4. Para criar o administrador inicial, defina `ADMIN_EMAIL` e `ADMIN_PASSWORD` no `.env` e execute:

```bash
npm run seed:admin
```

5. Inicie a aplicação:

```bash
npm run dev
```

A API estará em `http://localhost:3000`. A rota `GET /api` mostra os endpoints.

## Endpoints

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/api/auth/cadastro` | Público | Cadastrar cliente |
| POST | `/api/auth/login` | Público | Login e obtenção do JWT |
| GET | `/api/cidades` | Público | Listar cidades |
| GET | `/api/categorias` | Público | Listar categorias |
| GET | `/api/produtos` | Público | Listar produtos (filtros `?disponiveis=true` e `?categoria_id=1`) |
| GET | `/api/produtos/:id` | Público | Consultar produto |
| POST | `/api/pedidos` | Cliente autenticado | Realizar pedido |
| GET | `/api/pedidos` | Cliente autenticado | Listar os próprios pedidos |
| GET | `/api/pedidos/:id` | Cliente autenticado | Consultar pedido próprio e itens |
| POST | `/api/admin/produtos` | Admin | Criar produto |
| PUT | `/api/admin/produtos/:id` | Admin | Atualizar produto |
| DELETE | `/api/admin/produtos/:id` | Admin | Excluir produto sem histórico de pedidos |
| GET | `/api/admin/pedidos` | Admin | Listar todos os pedidos |
| PUT | `/api/admin/pedidos/:id` | Admin | Atualizar status do pedido |

Nas rotas autenticadas, envie o cabeçalho `Authorization: Bearer SEU_TOKEN`.

## Exemplos de requisições no Postman

Escolha o método, informe a URL, abra **Body > raw > JSON** e use os corpos abaixo.

**1. Cadastro — POST `/api/auth/cadastro`**
```json
{"nome":"Maria Silva","email":"maria@example.com","senha":"senhaSegura123","nascimento":"2001-05-10","altura":1.68,"cidade_id":1}
```

**2. Login — POST `/api/auth/login`**
```json
{"email":"maria@example.com","senha":"senhaSegura123"}
```
Copie o `token` da resposta e configure **Authorization > Bearer Token** nas requisições protegidas.

**3. Criar produto (admin) — POST `/api/admin/produtos`**
```json
{"nome":"Mouse sem fio","preco":89.90,"quantidade":20,"categoria_id":2}
```

**4. Consultar produtos — GET `/api/produtos?disponiveis=true`**

**5. Realizar pedido (cliente) — POST `/api/pedidos`**
```json
{"endereco":"Rua Exemplo, 123","itens":[{"produto_id":1,"quantidade":2}]}
```

**6. Consultar pedidos — GET `/api/pedidos`**

**7. Atualizar produto (admin) — PUT `/api/admin/produtos/1`**
```json
{"nome":"Mouse sem fio atualizado","preco":79.90,"quantidade":15,"categoria_id":2}
```

**8. Atualizar pedido (admin) — PUT `/api/admin/pedidos/1`**
```json
{"status":"enviado"}
```
Status possíveis: `recebido`, `preparando`, `enviado`, `entregue`, `cancelado`. Cancelamento devolve o estoque; pedidos entregues não podem ser cancelados.

**9. Excluir produto (admin) — DELETE `/api/admin/produtos/1`**

Produtos já associados a pedidos não podem ser excluídos, preservando o histórico; a API retorna HTTP 409.

## Códigos de resposta
- `200` sucesso em consulta/atualização
- `201` recurso criado
- `204` exclusão concluída
- `400` dados inválidos
- `401` autenticação ausente ou inválida
- `403` permissão insuficiente
- `404` recurso inexistente
- `409` conflito (estoque, duplicidade ou vínculo existente)
- `500` erro interno

## Observações
- Senhas armazenadas com hash bcrypt, nunca em texto puro.
- Clientes só acessam os próprios pedidos; administradores possuem rotas específicas.
- A criação de pedidos utiliza transação e bloqueio de linhas para evitar vendas acima do estoque.
- Preços são armazenados como `DOUBLE` para acompanhar o diagrama acadêmico; em aplicações financeiras reais recomenda-se `DECIMAL(10,2)`.
- O projeto requer MySQL configurado para executar as rotas de dados.

## Publicar no GitHub

```bash
git init
git add .
git commit -m "API REST de loja online com Node.js e MySQL"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/loja-rest-api.git
git push -u origin main
```

Crie antes um repositório vazio chamado `loja-rest-api` no GitHub e substitua `SEU_USUARIO` pelo seu usuário. Não marque a opção de criar README no GitHub, pois o projeto já contém um.
