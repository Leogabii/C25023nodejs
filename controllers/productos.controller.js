// controllers/productos.controller.js
import { db } from '../config/firestore.config.js';

const collection = db.collection('productos');

export const getAllProductos = async (req, res) => {
  try {
    const { disponible, orden } = req.query;

    const snapshot = await db.collection('productos').get();

    let productos = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        firestoreId: doc.id,
        ...data
      };
    });

    // FILTRO por disponible (true o false)
    if (disponible !== undefined) {
      const disponibleBool = disponible === 'true';
      productos = productos.filter(p => p.disponible === disponibleBool);
    }

    // ORDENAMIENTO por precio
    if (orden === 'asc') {
      productos.sort((a, b) => a.precio - b.precio);
    } else if (orden === 'desc') {
      productos.sort((a, b) => b.precio - a.precio);
    }

    console.log("Productos filtrados:", productos.length);
    res.json(productos);

  } catch (error) {
    console.log("Error al obtener productos:", error.message);
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
  try {
    const {id, nombre, descripcion, precio, categoria, stock, disponible } = req.body;

    // Validación básica (podés ajustar los checks según necesidad)
    if (
      typeof id !== 'number' ||
      typeof nombre !== 'string' ||
      typeof descripcion !== 'string' ||
      typeof precio !== 'number' ||
      typeof categoria !== 'string' ||
      typeof stock !== 'number' ||
      typeof disponible !== 'boolean'
    ) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }

    // Crear objeto limpio con solo los campos esperados
    const producto = { id, nombre, descripcion, precio, categoria, stock, disponible };

    // Agregar a Firestore
    const nuevo = await collection.add(producto);
    console.log('Producto agregado.');

    // Responder con el nuevo ID + datos guardados
    res.status(201).json({...producto });
  } catch (error) {
    console.error('Error al crear producto:', error.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
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
