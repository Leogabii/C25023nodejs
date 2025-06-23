// script/migrar-a-firestore.js
import { db } from '../config/firestore.config.js';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Para resolver rutas correctamente en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateProducts() {
  try {
    const filePath = path.join(__dirname, '../config/products.json');
    const data = await readFile(filePath, 'utf-8');
    const products = JSON.parse(data);

    const productsRef = db.collection('productos');

    for (const product of products) {
      await productsRef.add(product);
      console.log(`✅ Producto "${product.nombre}" migrado con éxito.`);
    }

    console.log('\n🎉 Migración completada con éxito.');
  } catch (error) {
    console.error('❌ Error en la migración:', error.message);
  }
}

migrateProducts();
