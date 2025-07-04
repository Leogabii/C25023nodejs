# 📦 API REST - Gestión de Productos con Firestore y JWT

Este proyecto es una **API RESTful** desarrollada en **Node.js** usando **Express** y **Firebase Firestore** como base de datos.

La API permite realizar operaciones CRUD sobre productos (crear, obtener, modificar, eliminar) y manejar autenticación de usuarios usando **JWT**. Pensada para ser usada desde herramientas como **Postman**.

## 🚀 ¿Qué hace esta API?

- 🔐 Autenticación con JWT (Inicio de sesión y verificación de token)  
- 📦 CRUD completo de productos: crear, listar, editar, eliminar  
- 📂 Base de datos Firestore (NoSQL)  
- 🔍 Filtros y ordenamiento por query string (`?disponible=true`, `?orden=asc`)  
- 🛡 CORS habilitado para permitir acceso desde otras apps  

## 📁 Estructura del proyecto

/controllers      → Lógica de negocio  
/routes           → Endpoints  
/config           → Conexión con Firestore  
/middlewares      → Middleware de JWT  

## 🧑‍💻 Cómo ejecutar el proyecto

```bash
git clone https://github.com/tuusuario/C25023nodejs-main.git
cd C25023nodejs-main
npm install
npm start
```

El servidor corre por defecto en http://localhost:3000.

---

🔐 Cómo generar el token JWT

1. En Postman, hacé una petición POST a:

```
POST /api/login
Content-Type: application/json
```

2. En el body (raw JSON) colocá:

```json
{
  "username": "admin",
  "password": "1234"
}
```

3. Si las credenciales son correctas, vas a recibir un token que debés copiar.

4. Luego, para usar endpoints protegidos, en Postman agregá en Headers:

```
Key: Authorization
Value: Bearer TU_TOKEN_AQUÍ
```

---

📄 Sobre los IDs en Firestore

Cuando se crea un producto, se generan dos identificadores distintos:

1. **id (manual)**: Es un campo que forma parte del producto, asignado por el usuario o el sistema:

```json
{
  "id": 1,
  "nombre": "Remera",
  ...
}
```

2. **firestoreId (automático)**: Es el ID que Firestore asigna como identificador del documento. La API lo agrega automáticamente en la respuesta para que puedas usarlo en rutas como:

```
GET /api/productos/:firestoreId
PUT /api/productos/:firestoreId
DELETE /api/productos/:firestoreId
```

> ⚠️ Importante: Para las operaciones de lectura, edición o eliminación, debés usar el **firestoreId**, no el campo **id**.

---

📦 Endpoints disponibles

📄 **Listar productos**

```
GET /api/productos
```

Filtros disponibles por query:

- `?disponible=true` → filtra por productos disponibles  
- `?disponible=false` → filtra por productos no disponibles  
- `?orden=asc` → ordena por precio ascendente  
- `?orden=desc` → ordena por precio descendente  

Ejemplos combinados:

```
GET /api/productos?disponible=true&orden=asc
GET /api/productos?orden=desc
```

---

📄 **Obtener un producto por ID**

```
GET /api/productos/:firestoreId
```

> Reemplazá `:firestoreId` por el ID que ves al listar productos (firestoreId).

---

➕ **Crear un producto**

```
POST /api/productos
Authorization: Bearer TU_TOKEN
Content-Type: application/json
```

```json
{
  "id": 1,
  "nombre": "Remera",
  "descripcion": "Remera negra",
  "precio": 1999,
  "categoria": "indumentaria",
  "stock": 10,
  "disponible": true
}
```

---

✏️ **Editar producto**

```
PUT /api/productos/:firestoreId
Authorization: Bearer TU_TOKEN
```

---

❌ **Eliminar producto**

```
DELETE /api/productos/:firestoreId
Authorization: Bearer TU_TOKEN
```

---

👤 **Autor**

Leonardo Suppa  
Curso Node.js C25023  
Proyecto desarrollado como ejercicio final Full Stack con Firestore + JWT

---

🛠 **Requisitos**

- Node.js >= 18.x  
- Cuenta de Firebase con Firestore configurado  
- Postman o Insomnia para hacer pruebas