# Deploy Copa Potiguar 2026 em VPS Ubuntu

Este roteiro publica a aplicação em uma VPS Ubuntu usando Docker Compose com:

- Nginx servindo a aplicação web;
- PostgreSQL 16 em container separado;
- código-fonte vindo do GitHub;
- porta HTTP exposta pela VPS.

Esta primeira versão está configurada como piloto controlado somente para a loja **Imperatriz**.

> Importante: troque a senha do usuário da VPS e nunca salve senhas reais no GitHub. Use senha forte no `.env`.

## 1. Acesso à VPS

No computador local:

```bash
ssh Potiguar@192.168.1.239
```

Se for o primeiro acesso, confirme a chave do servidor.

## 2. Atualizar Ubuntu e instalar Docker

Na VPS:

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y ca-certificates curl git ufw
```

Instalar Docker pelo repositório oficial:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Permitir que o usuário rode Docker:

```bash
sudo usermod -aG docker Potiguar
```

Depois saia e entre novamente no SSH:

```bash
exit
ssh Potiguar@192.168.1.239
```

Teste:

```bash
docker --version
docker compose version
```

## 3. Liberar firewall

Se a VPS estiver na rede interna e for acessada pelo IP `192.168.1.239`, libere HTTP e SSH:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw enable
sudo ufw status
```

## 4. Clonar o projeto do GitHub

Crie a pasta padrão:

```bash
mkdir -p ~/apps
cd ~/apps
```

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO_GITHUB copa-potiguar-2026
cd copa-potiguar-2026
```

Exemplo de URL:

```bash
git clone https://github.com/EMPRESA/copa-potiguar-2026.git copa-potiguar-2026
```

Para repositório privado, prefira autenticação por chave SSH ou token do GitHub.

## 5. Criar arquivo `.env`

Na pasta do projeto:

```bash
cp .env.vps.example .env
nano .env
```

Configure uma senha forte para o banco:

```env
APP_PORT=80
POSTGRES_DB=copa_potiguar
POSTGRES_USER=copa_admin
POSTGRES_PASSWORD=troque_por_uma_senha_forte_e_unica
```

Não suba o `.env` para o GitHub.

## 6. Subir aplicação e banco

Na pasta do projeto:

```bash
docker compose up -d --build
```

Verifique os containers:

```bash
docker compose ps
```

Ver logs:

```bash
docker compose logs -f
```

## 7. Acessar aplicação

No navegador:

```text
http://192.168.1.239
```

Com o DNS configurado:

```text
http://copa2026.apotiguar.com.br
```

Se usar outra porta no `.env`, por exemplo `APP_PORT=8080`, acesse:

```text
http://192.168.1.239:8080
```

## 8. Atualizar versão publicada

Quando houver atualização no GitHub:

```bash
cd ~/apps/copa-potiguar-2026
git pull
docker compose up -d --build
```

## 9. Backup do banco PostgreSQL

Gerar backup manual:

```bash
docker compose exec db pg_dump -U copa_admin -d copa_potiguar > backup_copa_potiguar_$(date +%Y%m%d_%H%M).sql
```

Restaurar backup:

```bash
cat backup.sql | docker compose exec -T db psql -U copa_admin -d copa_potiguar
```

## 10. Parar ou reiniciar

Reiniciar:

```bash
docker compose restart
```

Parar sem apagar dados:

```bash
docker compose down
```

Parar apagando dados do banco, somente em ambiente de teste:

```bash
docker compose down -v
```

## 11. Observações para produção

A versão atual já publica a interface via Nginx e sobe o PostgreSQL, mas a aplicação ainda está em modo piloto no frontend.

Para produção real, o TI deve implementar a API/backend para:

- autenticação por CPF e senha com hash seguro;
- sessões/JWT;
- persistência dos comunicados, produtos, metas, vendas e palpites;
- cálculo transacional da pontuação;
- auditoria das ações administrativas;
- integração com ERP/API de vendas;
- integração com API da Copa;
- consulta de produtos por SKU no site ou ERP;
- política de backup automático do Postgres.

## 12. Checklist de validação

Após subir:

- acessar `http://192.168.1.239`;
- testar login com CPF cadastrado;
- confirmar comunicado obrigatório;
- salvar palpite do jogo teste;
- acessar painel admin;
- conferir lista de usuários;
- conferir produto foco de Imperatriz;
- conferir ranking por loja;
- verificar `docker compose ps`;
- verificar `docker compose logs`.

## 13. Ativar HTTPS com Let's Encrypt

Pré-requisitos:

- DNS `copa2026.apotiguar.com.br` apontando para a VPS;
- porta 80 liberada;
- aplicação respondendo em `http://copa2026.apotiguar.com.br`.

Na VPS, instale o Certbot:

```bash
sudo apt update
sudo apt install -y certbot
```

Pare temporariamente o container web para liberar a porta 80:

```bash
cd ~/apps/copapotiguar2026
docker compose stop web
```

Emita o certificado:

```bash
sudo certbot certonly --standalone -d copa2026.apotiguar.com.br
```

Suba a aplicação com HTTPS:

```bash
docker compose -f docker-compose.yml -f docker-compose.https.yml up -d --build --force-recreate
```

Acesse:

```text
https://copa2026.apotiguar.com.br
```

Renovação do certificado:

```bash
sudo certbot renew --dry-run
```

Quando o certificado renovar, recarregue o container web:

```bash
cd ~/apps/copapotiguar2026
docker compose -f docker-compose.yml -f docker-compose.https.yml restart web
```
