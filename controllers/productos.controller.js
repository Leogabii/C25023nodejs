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
    console.log("Listado de productos.");
    
    res.json(productos);
  } catch (error) {
    console.log("Error al obtener productos.");

    res.status(500).json({ msg: 'Error al obtener productos', error: error.message });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const doc = await db.collection('productos').doc(req.params.id).get();
    if (!doc.exists) {
      console.log("Producto no encontrado.");
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    console.log("Producto encontrado, enviando datos:", { id: doc.id, ...doc.data() });
    res.json({ id: doc.id, ...doc.data() });

  } catch (error) {
    console.log("Error al obtener el producto:", error.message);
    res.status(500).json({ msg: 'Error al obtener el producto', error: error.message });
  }
};

export const createProducto = async (req, res) => {
  const data = req.body;
  const nuevo = await collection.add(data);
  console.log("Producto  agregado.");

  res.status(201).json({ id: nuevo.id, ...data });
};

export const updateProducto = async (req, res) => {
  const id = req.params.id;

  try {
    const productoRef = db.collection('productos').doc(id);
    await productoRef.update(req.body);
    console.log("Producto actualizado.");
    res.json({ msg: 'Producto actualizado' });
  } catch (error) {
    console.log("Error al actualizar.");
    res.status(500).json({ msg: 'Error al actualizar', error: error.message });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ msg: 'ID no proporcionado' });

    const docRef = db.collection('productos').doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      console.log("Producto no encontrado.");
      return res.status(404).json({ msg: 'Producto no encontrado' });
    }

    await docRef.delete();
    console.log("Producto eliminado correctamente.");

    res.json({ msg: 'Producto eliminado correctamente' });
  } catch (error) {
    console.log("Error al eliminar producto.");

    res.status(500).json({ msg: 'Error al eliminar producto', error: error.message });
  }
};
