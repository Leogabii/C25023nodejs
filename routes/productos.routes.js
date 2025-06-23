import express from 'express';
import { getAllProductos, createProducto, updateProducto, deleteProducto } from '../controllers/productos.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getAllProductos);
router.post('/', verificarToken, createProducto);
router.put('/:id', verificarToken, updateProducto);
router.delete('/:id', verificarToken, deleteProducto);

export default router;