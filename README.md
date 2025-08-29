# 🚀 Zac Guide - Guia Completo do Zac

Um guia moderno e interativo para o campeão Zac do League of Legends, com sistema de builds da comunidade.

## ⚡ **Setup Rápido**

### **1. Executar Setup Automático**
```bash
npm run setup
```

### **2. Configurar Credenciais**
Edite o arquivo `.env` criado:
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

## 🌐 **URLs**
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

## 🎯 **Funcionalidades**

### ✅ **Disponíveis**
- **Guia Zac** - Interface profissional estilo LoL
- **Comunidade** - Visualizar builds (sem login)
- **Sistema de Autenticação** - JWT + bcrypt
- **Backend Completo** - MongoDB + API REST
- **Design Moderno** - Animações e scroll suave
- **Responsivo** - Funciona em mobile e desktop

### 🚧 **Em Desenvolvimento**
- Modal de criação de builds
- Sistema de comentários
- Busca avançada
- Sistema de tags

## 🔧 **Scripts Disponíveis**

```bash
npm run setup      # Setup automático
npm run server     # Iniciar backend
npm run dev        # Iniciar frontend
npm run dev:server # Backend com auto-reload
npm run build      # Build para produção
```

## 📚 **Documentação**

- **QUICK-START.md** - Início rápido
- **SETUP-MONGODB.md** - Configuração detalhada do MongoDB

## 🛠️ **Tecnologias**

### **Frontend**
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router

### **Backend**
- Node.js
- Express
- MongoDB
- JWT
- bcrypt

## 🎨 **Design**

- **Paleta**: Emerald/Teal com fundo escuro
- **Tipografia**: Inter
- **Animações**: Framer Motion
- **Responsivo**: Mobile-first

## 🔐 **Segurança**

- Credenciais em variáveis de ambiente
- JWT para autenticação
- Senhas criptografadas com bcrypt
- CORS configurado

---

**🎉 Projeto configurado com sucesso!**
