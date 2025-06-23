import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from '../services/firestore.service.js';

export async function obtenerProductos(req, res) {
  const productosRef = collection(db, 'productos');
  const snapshot = await getDocs(productosRef);
  const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(productos);
}

export async function agregarProducto(req, res) {
  const { descripcion, precio } = req.body;
  const productosRef = collection(db, 'productos');
  const nuevo = await addDoc(productosRef, { descripcion, precio });
  res.json({ id: nuevo.id });
}

export async function actualizarProducto(req, res) {
  const id = req.params.id;
  const productoRef = doc(db, 'productos', id);
  await updateDoc(productoRef, req.body);
  res.json({ mensaje: 'Producto actualizado' });
}

export async function eliminarProducto(req, res) {
  const id = req.params.id;
  const productoRef = doc(db, 'productos', id);
  await deleteDoc(productoRef);
  res.json({ mensaje: 'Producto eliminado' });
}