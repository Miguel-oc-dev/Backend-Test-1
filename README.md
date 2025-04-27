
# 📝 BackendTest1

## Tecnologías usadas

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- Axios (para consumo de Google Maps API)

## Descripción del proyecto

Este proyecto consiste en la creación de una API RESTful para la gestión de:

- Usuarios (`Users`)
- Camiones (`Trucks`)
- Órdenes de envío (`Orders`)
- Ubicaciones (`Locations`)

Cada entidad tiene su propio CRUD (Create, Read, Update, Delete).

La autenticación se maneja mediante **JWT**, protegiendo las rutas privadas.  
Además, se integra la API de Google Maps para obtener coordenadas y direcciones reales a partir de un `place_id`.

## Nota: 
Al crear una cuenta de Google API, se necesita una verificación, por lo cual tendré que esperar para poner a prueba el controlado de "Locations".

## Configuración inicial

### Requisitos previos

- Node.js instalado
- MongoDB Atlas o local
- Cuenta de Google Cloud Platform (GCP) para obtener API Key de Places API

### Variables de entorno (.env)

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

Se adjuntará el archivo .env, no es lo más optimo en cuestión en seguridad, pero es necesario para esta prueba
```
MONGODB_URI=
JWT_SECRET=
GOOGLE_API_KEY=
PORT=3000
```

## Instalación

```bash
npm install
```

## Ejecución del servidor

```bash
npm run dev
```

Servidor disponible en:

```
http://localhost:3000/
```

## Endpoints principales

https://.postman.co/workspace/My-Workspace~1ef78cff-2f4a-418f-8994-70a6a7c093c1/collection/40349866-041986fd-a25b-4e9f-bfd5-2b8fff44964b?action=share&creator=40349866&active-environment=40349866-64c168c6-648b-482b-ae4d-ff5f3aaa93ee

### Users

- `POST /api/users/register` → Registro de nuevo usuario.
  ![image](https://github.com/user-attachments/assets/77e2b309-d69a-4705-bf90-d04efd69f3a3)

- `POST /api/users/login` → Login de usuario (retorna token JWT).
  ![image](https://github.com/user-attachments/assets/8a5514a0-ac3a-44e8-af4e-b8e32350c747)


### Trucks

- `POST /api/trucks/` → Crear una nueva unidad.
  ![image](https://github.com/user-attachments/assets/4a842308-1f4e-4b85-b2af-b7935b8a5ab8)

- `GET /api/trucks/` → Listar las unidades del usuario.
  ![image](https://github.com/user-attachments/assets/56f11e51-296c-4635-92f0-4f84bc825222)

- `PUT /api/trucks/:id` → Actualizar unidad.
  ![image](https://github.com/user-attachments/assets/525eb74e-94f9-492e-9782-0dd8df676251)

- `DELETE /api/trucks/:id` → Eliminar unidad.
  ![image](https://github.com/user-attachments/assets/a63aa56d-3b70-4e71-a9f2-87e6569abd53)


### Locations

- `POST /api/locations/` → Crear una nueva location desde `place_id` de Google Maps.
  ![image](https://github.com/user-attachments/assets/636c8b5f-c12c-4df9-9fe2-cac7d24c431a)

  El error en consola muestra a que se debe de verificar el sistema de pago de Google Cloud
  En cuanto se libere la autenticación, subire las actualizaciones de las pruebas
  ![image](https://github.com/user-attachments/assets/d700e9a0-4f18-4575-9f50-be0bd058de81)

- `GET /api/locations/` → Listar locations del usuario.
- `DELETE /api/locations/:id` → Eliminar location.

### Orders

- `POST /api/orders/` → Crear una nueva orden de envío.
  ![image](https://github.com/user-attachments/assets/bf57764b-73ca-4ce2-a52c-b309024dbe47)

- `GET /api/orders/` → Listar órdenes del usuario.
  ![image](https://github.com/user-attachments/assets/da49d572-5bd7-4440-a7ae-ae08d6dcd005)

- `PUT /api/orders/:id/status` → Actualizar el estado de una orden (`created`, `in transit`, `completed`).
  ![image](https://github.com/user-attachments/assets/14e31dc2-8462-4cb3-99a8-350e1f06413d)


## Estructura del proyecto

```
/src
  /controllers    # Lógica de rutas
  /models         # Modelos de la BD
  /routes         # Definición de rutas
  /middlewares    # Middlewares (auth)
  /services       # Servicios externos (Google Maps)
  /types          # Tipos TypeScript personalizados
```

## Autenticación

Cada request privado debe llevar en headers:

```
Si utiliza una herramienta como Postman, es necesario llenar el token en el apartado de "Authorization"
Authorization: Bearer <token>
```

Obtenido después de login.

## Notas importantes

- Se utilizó la estrategia de manejo de errores con `try/catch` en los controladores.
- Se manejan validaciones de tipos en los esquemas de Mongoose.
- JWT expira en 7 días.
- Para Location, el `place_id` es obligatorio y se resuelve usando la API de Google Places para obtener latitud, longitud y dirección.

# Autor

Miguel Contreras Ortiz
