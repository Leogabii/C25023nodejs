# Proyecto Final 

Este proyecto es una **API RESTful** desarrollada con **Node.js** y **Express.js** que permite gestionar productos de una tienda en línea. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los productos, manejar autenticación de usuarios con JWT y guardar los datos en archivo JSON local y en la nube usando Firebase Firestore.

---

## 🛠 Tecnologías utilizadas

- Node.js
- Express.js
- Firebase / Firestore
- JSON como base local
- JWT (JSON Web Tokens)
- CORS
- Dotenv

---

## 📁 Estructura del Proyecto

```
/controllers   --> Lógica de negocio
/models        --> Modelos de datos
/routes        --> Endpoints de la API
/script
/services      --> Acceso a Firestore y JSON
/middlewares   --> Middleware de autenticación y errores
/utils         --> Funciones auxiliares
/config        --> Configuración general (Firebase, entorno, etc.)
```

---

## 🔐 Autenticación

La API usa **JWT** para autenticar usuarios. Solo los usuarios logueados pueden realizar acciones sobre los productos protegidos.

Actualmente, se encuentra implementado un endpoint de login que verifica el `username` y `password` directamente desde Firestore.

### Ruta disponible:
- `POST /login` → Login y obtención del token JWT


## 🔄 Funcionalidades

### Productos
- `GET /api/products` → Listar todos los productos
- `GET /api/products/:id` → Obtener un producto por ID
- `POST /api/products` → Crear producto (requiere login)
- `PUT /api/products/:id` → Reemplazar un producto (requiere login)
- `PATCH /api/products/:id` → Editar parcialmente (requiere login)
- `DELETE /api/products/:id` → Eliminar producto (requiere login)

---

## 🧪 Ejecución del proyecto

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/proyecto-final-tu-nombre.git
cd proyecto-final-tu-nombre
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear el archivo `.env` con tus variables:
```env
PORT=3000
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
JWT_SECRET=una_clave_secreta
```

4. Ejecutar en desarrollo:
```bash
npm run dev
```

5. Ejecutar en producción:
```bash
npm start
```

---

## ☁️ Base de datos

- En modo local: usa un archivo `products.json`
- En producción: conecta con **Firebase Firestore**

---

## 🌐 Despliegue

[🔗 Ver la API en producción](https://nombre-app.railway.app)  
_(Reemplazar con tu URL real)_

---

## 📄 Licencia

Este proyecto fue realizado como parte del curso de Backend con Node.js.

---
