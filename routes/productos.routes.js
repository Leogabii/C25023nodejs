import express from 'express';
import { obtenerProductos, agregarProducto, actualizarProducto, eliminarProducto } from '../controllers/productos.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', obtenerProductos);
router.post('/', verificarToken, agregarProducto);
router.put('/:id', verificarToken, actualizarProducto);
router.delete('/:id', verificarToken, eliminarProducto);

export default router;