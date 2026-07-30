# 🚀 Guia de Deployment - Docka Seguros

## Visão Geral
- **Frontend**: Vercel (React + Vite)
- **Backend**: Railway (Express + PostgreSQL)
- **Domínio**: www.dockaseguros.com.br

---

## Passo 1: Deploy do Backend + Banco de Dados (Railway)

### 1.1 Criar conta no Railway
1. Acesse [railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique em "New Project"

### 1.2 Conectar seu repositório
1. Selecione "Deploy from GitHub repo"
2. Selecione este repositório (Docka)
3. Railway vai detectar automaticamente que é um monorepo

### 1.3 Configurar variáveis de ambiente
No painel do Railway, crie estas variáveis:

```
NODE_ENV=production
PORT=8082
DATABASE_URL=postgresql://[seu-usuario]:[sua-senha]@[seu-host]:5432/docka_seguros
JWT_SECRET=[gerar-senha-aleatória-forte-aqui]
```

⚠️ **Importante**: Gerar `JWT_SECRET` forte:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 1.4 Railway criará automaticamente:
- ✅ PostgreSQL Database
- ✅ Node.js backend
- ✅ URL pública do backend (ex: `api.dockaseguros.com.br`)

**Guarde esta URL**, você usará no frontend.

---

## Passo 2: Deploy do Frontend (Vercel)

### 2.1 Criar conta no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "Add New Project"

### 2.2 Importar repositório
1. Selecione este repositório
2. Vercel vai detectar que é um monorepo com Vite

### 2.3 Configurar Build
Na tela de configuração:

**Framework Preset**: Vite  
**Root Directory**: `artifacts/web`  
**Build Command**: `PORT=5175 BASE_PATH=/ pnpm build`

### 2.4 Variáveis de Ambiente
Adicione no Vercel:

```
VITE_API_URL=https://[url-railway-backend]
PORT=5175
BASE_PATH=/
```

*Substitua `[url-railway-backend]` pela URL que você guardou no Passo 1.4*

### 2.5 Deploy
Clique em "Deploy" - Vercel fará o build e colocará online automaticamente.

**Resultado**: Seu site estará em `https://docka-seguros.vercel.app`

---

## Passo 3: Apontar Domínio (DNS)

### 3.1 Configurar DNS no Vercel
1. No dashboard do Vercel, vá para "Domains"
2. Clique em "Add Domain"
3. Digite: `www.dockaseguros.com.br`
4. Vercel vai mostrar os registros DNS necessários

### 3.2 Configurar no seu registrador de domínio
Onde você registrou o domínio (ex: Hostinger, Namecheap, etc):

1. Acesse o painel de controle DNS
2. Copie os registros que o Vercel forneceu
3. Criar novo registro **CNAME**:
   - **Host**: `www`
   - **Valor**: `cname.vercel-dns.com.` (ou o que Vercel indicar)

4. Criar registro **A** para o domínio raiz (opcional):
   - **Host**: `@` ou deixar em branco
   - **Valor**: `76.76.19.165` (verificar com Vercel)

### 3.3 Aguardar propagação
DNS leva até 48h para propagar globalmente (geralmente 10-30min).

Verificar status em Vercel → continua mostrando em andamento até propagar.

---

## Passo 4: Configurações de Produção

### 4.1 Backend (Express)
Arquivo: `artifacts/api-server/src/index.ts`

Verificar CORS:
```typescript
cors({
  origin: [
    "https://www.dockaseguros.com.br",
    "https://docka-seguros.vercel.app" // fallback durante testes
  ],
  credentials: true
})
```

### 4.2 Frontend (Vite)
Verificar que as URLs de API estão usando a variável de ambiente:

```typescript
// Deve usar import.meta.env.VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8082";
```

---

## Passo 5: Testar em Produção

1. ✅ Acesse `https://www.dockaseguros.com.br`
2. ✅ Teste navegação entre páginas
3. ✅ Teste formulários (deve conectar à API do Railway)
4. ✅ Teste botão WhatsApp
5. ✅ Verifique console do navegador (F12) por erros

---

## Checklist Final

- [ ] Repositório está no GitHub
- [ ] Railway conectado ao repositório
- [ ] PostgreSQL criado no Railway
- [ ] Variáveis de ambiente configuradas (Railway)
- [ ] Vercel conectado ao repositório
- [ ] Build do frontend configurado
- [ ] Variáveis de ambiente configuradas (Vercel)
- [ ] DNS apontando para Vercel
- [ ] Domínio funcionando em produção
- [ ] API backend respondendo em `/api/health`
- [ ] Formulários salvando dados no banco

---

## URLs Importantes

**Seu site:** `https://www.dockaseguros.com.br`  
**Dashboard Vercel:** `vercel.com/[seu-usuario]/docka`  
**Dashboard Railway:** `railway.app/project/[seu-projeto]`

---

## Próximos Passos (Opcional)

- [ ] Configurar SSL/TLS (Vercel faz automaticamente)
- [ ] Configurar analytics (Vercel Analytics)
- [ ] Configurar CI/CD avançado
- [ ] Monitoramento de erros (Sentry)
- [ ] CDN para imagens pesadas

---

**Tempo estimado total**: 30-45 minutos  
**Custo mensal**: ~$15-20 (Railway $5-10 + Vercel free/pro)
