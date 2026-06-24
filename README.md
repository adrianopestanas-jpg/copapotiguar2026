# Copa Potiguar 2026 — piloto comercial

Aplicação responsiva da campanha **Leu, Palpitou, Vendeu**.

## Escopo do piloto

Esta primeira publicação roda como piloto controlado somente com a loja **Imperatriz**.

Participam somente:

- vendedores gerais e vendedores especialistas, tratados igualmente como **Vendedor**;
- gerentes e subgerentes, identificados como **Liderança** e pontuados conforme o resultado dos vendedores da respectiva loja;
- administradores da campanha.

Os demais cargos ficam cadastrados como `future_phase` e não conseguem acessar o piloto.

## Loja ativa na primeira versão

Imperatriz.

## Acesso do piloto

O login usa os CPFs cadastrados dos participantes de Imperatriz e dos administradores.

Nesta primeira largada do piloto:

- usuário: CPF cadastrado;
- senha: o próprio CPF.

Em produção, autenticação, validação de CPF, hash de senha, JWT, sessões e bloqueio de tentativas devem ser realizados por uma API.

## Executar localmente

```bash
python3 -m http.server 4173
```

Acesse `http://localhost:4173`.

## Executar em VPS com Docker

Roteiro completo:

[DEPLOY_UBUNTU_VPS.md](./DEPLOY_UBUNTU_VPS.md)

```bash
cp .env.example .env
```

Altere obrigatoriamente `POSTGRES_PASSWORD` e execute:

```bash
docker compose up -d --build
```

A aplicação ficará em `http://IP-DA-VPS:8080`.

## Estrutura preparada

- `Dockerfile`: imagem Nginx para o frontend.
- `docker-compose.yml`: frontend e PostgreSQL 16.
- `nginx.conf`: SPA, cache, cabeçalhos e health check.
- `supabase-schema.sql`: usuários, sessões, acessos, comunicados, vídeos, produtos, metas, vendas, jogos, palpites, premiações, pontos, rodadas e auditoria.
- `.env.example`: variáveis necessárias para implantação.

## Administração demonstrável

- criar comunicados e inserir vídeos;
- cadastrar produtos;
- vincular um ou vários produtos foco por loja;
- definir metas por produto e por loja;
- lançar a quantidade vendida por vendedor e produto;
- cadastrar o código/SKU único utilizado internamente e no site;
- importar nome, marca, imagem, descrição e preço do catálogo;
- cadastrar colaboradores elegíveis;
- administrar premiações;
- acompanhar rankings;
- consultar, pesquisar e filtrar todos os usuários cadastrados;
- visualizar dashboards;
- controlar e encerrar rodadas.

## Próxima camada de produção

O PostgreSQL e o frontend estão preparados, mas ainda é necessário implementar a API autenticada responsável por:

- login e renovação de sessão;
- autorização por perfil;
- persistência dos formulários administrativos;
- cálculo transacional dos pontos;
- integração com ERP e vendas;
- serviço de consulta ao catálogo do site por código interno/SKU;
- auditoria das ações;
- proteção contra abuso e limitação de requisições.
# copapotiguar2026
