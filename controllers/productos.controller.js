// controllers/productos.controller.js
import { db } from '../config/firestore.config.js';

const collection = db.collection('productos');

export const getAllProductos = async (req, res) => {
  const snapshot = await collection.get();
  const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(productos);
};

export const getProductoById = async (req, res) => {
  const doc = await collection.doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ msg: 'Producto no encontrado' });
  res.json({ id: doc.id, ...doc.data() });
};

export const createProducto = async (req, res) => {
  const data = req.body;
  const nuevo = await collection.add(data);
  res.status(201).json({ id: nuevo.id, ...data });
};

export const updateProducto = async (req, res) => {
  const id = req.params.id;
  await collection.doc(id).update(req.body);
  res.json({ msg: 'Producto actualizado' });
};

export const deleteProducto = async (req, res) => {
  const id = req.params.id;
  await collection.doc(id).delete();
  res.json({ msg: 'Producto eliminado' });
};
