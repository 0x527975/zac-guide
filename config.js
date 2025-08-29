import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

export default {
  // MongoDB Atlas - String de conexão
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/zac-guide',
  
  // JWT Secret
  JWT_SECRET: process.env.JWT_SECRET || 'zac-guide-secret-key-change-in-production',
  
  // Server Configuration
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Admin User Configuration
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
  
  // Security
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  
  // Database Configuration
  DB_NAME: process.env.DB_NAME || 'zac-guide',
  DB_COLLECTION_PREFIX: process.env.DB_COLLECTION_PREFIX || 'zac'
};
