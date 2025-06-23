// controllers/productos.controller.js
import { db } from '../config/firestore.config.js';

const collection = db.collection('productos');

export const getAllProductos = async (req, res) => {
  try {
    const snapshot = await db.collection('productos').get();
    const productos = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        firestoreId: doc.id, // ID único de Firestore
        ...data              // resto de los campos del producto (incluye posible campo 'id' interno)
      };
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener productos', error: error.message });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const doc = await db.collection('productos').doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener el producto', error: error.message });
  }
};

export const createProducto = async (req, res) => {
  const data = req.body;
  const nuevo = await collection.add(data);
  res.status(201).json({ id: nuevo.id, ...data });
};

export const updateProducto = async (req, res) => {
  const id = req.params.id;

  try {
    const productoRef = db.collection('productos').doc(id);
    await productoRef.update(req.body);
    res.json({ msg: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar', error: error.message });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('productos').doc(id).delete();
    res.json({ msg: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar producto', error: error.message });
  }
};
