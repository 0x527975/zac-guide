# 🗄️ Setup MongoDB - Zac Guide

## 🚀 **Setup Rápido**

### **1. Executar Setup Automático**
```bash
npm run setup
```

### **2. Configurar .env**
```bash
MONGODB_URI=mongodb+srv://ryuOPODEROSO:<db_password>@zac.hjgeism.mongodb.net/?retryWrites=true&w=majority&appName=Zac
JWT_SECRET=sua-chave-secreta-jwt
ADMIN_USERNAME=admin
ADMIN_PASSWORD=sua-senha-admin
```

### **3. Iniciar Projeto**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

## 🔧 **Opções de MongoDB**

### **Opção A - MongoDB Atlas (Recomendado)**
1. Acesse: https://www.mongodb.com/atlas
2. Crie uma conta gratuita
3. Crie um cluster gratuito
4. Configure a string de conexão no `.env`

### **Opção B - MongoDB Local**
1. Baixe: https://www.mongodb.com/try/download/community
2. Instale como serviço
3. Use: `mongodb://localhost:27017/zac-guide`

## 📊 **Endpoints da API**

### **Autenticação**
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil do usuário

### **Builds**
- `GET /api/builds` - Listar builds
- `POST /api/builds` - Criar build
- `POST /api/builds/:id/like` - Curtir/descurtir
- `DELETE /api/builds/:id` - Deletar build

### **Health Check**
- `GET /api/health` - Status da API

## 🧪 **Testar API**

```bash
# Verificar se está funcionando
curl http://localhost:5000/api/health

# Fazer login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@zac-guide.com",
    "password": "SUA_SENHA_ADMIN_DO_ENV"
  }'
```

## 🐛 **Solução de Problemas**

### **Erro de Conexão MongoDB**
- Verifique se o `.env` está configurado
- Teste a string de conexão
- Verifique se o MongoDB está rodando

### **Erro de Porta**
- Verifique se a porta 5000 está livre
- Mude a porta no `.env` se necessário

---

**🎉 MongoDB configurado com sucesso!**
