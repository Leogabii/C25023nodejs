import { db } from './services/firestore.service.js';
import { readFile } from 'fs/promises';
import { collection, addDoc } from 'firebase/firestore';

async function migrateProducts() {
  try {
    const data = await readFile('./products.json', 'utf-8');
    const products = JSON.parse(data);
    const productsRef = collection(db, 'productos');

    for (const product of products) {
      await addDoc(productsRef, product);
      console.log(`Producto "${product.nombre}" migrado con éxito.`);
    }

    console.log('✅ Migración completada.');
  } catch (error) {
    console.error('❌ Error en la migración:', error);
  }
}

migrateProducts();
