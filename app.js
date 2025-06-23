import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import productosRoutes from './routes/productos.routes.js';
import './config/firestore.config.js'; // 🔥 Inicializa firebase-admin

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
