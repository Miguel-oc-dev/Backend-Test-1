
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
![image](https://github.com/user-attachments/assets/934e82b2-3617-4b07-b9e6-629d0f9382b7)


- `POST /api/users/login` → Login de usuario (retorna token JWT).
![image](https://github.com/user-attachments/assets/7b11369e-06d5-4b00-a9b3-c5e4f4fb267c)


### Trucks

- `POST /api/trucks/` → Crear una nueva unidad.
![image](https://github.com/user-attachments/assets/6fff7c8b-0961-45ba-bc26-59a14ae84acd)

- `GET /api/trucks/` → Listar las unidades del usuario.
![image](https://github.com/user-attachments/assets/273930f6-14fb-4066-8fa6-f9d06dafa1ee)

- `PUT /api/trucks/:id` → Actualizar unidad.
![image](https://github.com/user-attachments/assets/4db1fe76-2a3e-4335-b10c-311457b308be)

- `DELETE /api/trucks/:id` → Eliminar unidad.
![image](https://github.com/user-attachments/assets/f33d12c2-4d38-49a9-a88d-7d8669819ab8)



### Locations

- `POST /api/locations/` → Crear una nueva location desde `place_id` de Google Maps.
![image](https://github.com/user-attachments/assets/0c728bb1-8561-4754-9ab1-5ed63a8428d4)

  El error en consola muestra a que se debe de verificar el sistema de pago de Google Cloud
  
  En cuanto se libere la autenticación, subire las actualizaciones de las pruebas
![image](https://github.com/user-attachments/assets/5e700136-cedc-4277-83a6-40d70ce42c18)

- `GET /api/locations/` → Listar locations del usuario.
- `DELETE /api/locations/:id` → Eliminar location.

### Orders

- `POST /api/orders/` → Crear una nueva orden de envío.
![image](https://github.com/user-attachments/assets/82058534-4f3e-490a-a302-e1f4201e6e78)

- `GET /api/orders/` → Listar órdenes del usuario.
![image](https://github.com/user-attachments/assets/b64fad0d-b385-4dda-89da-11b18c90405b)

- `PUT /api/orders/:id/status` → Actualizar el estado de una orden (`created`, `in transit`, `completed`).
![image](https://github.com/user-attachments/assets/7739517a-df7d-4b4a-9e37-e7e212046fa4)


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
Authorization: Bearer <token>
```
Si utiliza una herramienta como Postman, es necesario llenar el token en el apartado de "Authorization"

Obtenido después de login.

## Notas importantes

- Se utilizó la estrategia de manejo de errores con `try/catch` en los controladores.
- Se manejan validaciones de tipos en los esquemas de Mongoose.
- JWT expira en 7 días.
- Para Location, el `place_id` es obligatorio y se resuelve usando la API de Google Places para obtener latitud, longitud y dirección.

# Autor

Miguel Contreras Ortiz
