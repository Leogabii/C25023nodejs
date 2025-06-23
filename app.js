import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import productosRoutes from './routes/productos.routes.js';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './config/firestore.config.js';

dotenv.config();
initializeApp(firebaseConfig);

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));