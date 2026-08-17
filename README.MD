
# Fullstack Monorepo Project




## Estructura del Workspace

El proyecto está organizado en una estructura monorepo para facilitar el desarrollo conjunto:

```text
pedbox-test/
├── backend/            # API en Express, modelos de Prisma y lógica de negocio.
├── frontend/           # Aplicación cliente construida con React, Vite y Tailwind CSS.
├── docker-compose.yml  # Orquestador de contenedores (Postgres, Backend, Frontend, Studio).
└── .env                # Configuración de variables de entorno globales (ignorado por Git).
```

---

## Stack Tecnológico

### Backend
* **Entorno de ejecución:** Node.js (TS) con `tsx` para desarrollo rápido.
* **Framework:** Express (con Swagger para documentación de endpoints).
* **ORM:** Prisma (PostgreSQL).
* **Autenticación:** JSON Web Tokens (JWT) y encriptación con Bcrypt.

### Frontend
* **Librería principal:** React 19 + Vite 8.
* **Estilos:** Tailwind CSS v4.
* **Enrutamiento:** React Router 7.
* **Pruebas:** Vitest + React Testing Library.

### DevOps y Base de Datos
* **Base de datos:** PostgreSQL 16.
* **Contenedores:** Docker y Docker Compose.
* **Visualizador:** Prisma Studio.

---

## Inicio Rápido con Docker (Recomendado)

La forma más rápida de levantar todo el ecosistema (Base de datos, Backend, Frontend y Prisma Studio) es utilizando Docker Compose.

### Requisitos Previos
* Tener instalado **Docker** y **Docker Compose**.

### Pasos para iniciar:

1. **Configurar las variables de entorno:**
   Crea un archivo `.env` en la carpeta raíz del proyecto (junto a `docker-compose.yml`) con las siguientes variables:

   ```env
   # Configuración de Postgres
   POSTGRES_USER=pedbox
   POSTGRES_PASSWORD=pedbox_password
   POSTGRES_DB=pedbox

   # Configuración del Backend
   JWT_SECRET=0VRtfXvorutprQ5U305c93sPQYBLK73uMvn71bSCqY4
   JWT_EXPIRES_IN=15m
   PORT=3000
   ```

2. **Levantar los servicios:**
   Ejecuta el siguiente comando en la raíz del proyecto:
   ```bash
   docker compose up --build
   ```

3. **Sincronización y Sembrado automático:**
   Al iniciar por primera vez, el backend realizará automáticamente:
   * El empuje del esquema de base de datos (`prisma db push`).
   * El sembrado de datos (`prisma db seed`), llamando a la API de Rick and Morty para sincronizar los primeros personajes, episodios y ubicaciones de forma autónoma.

---

## Puertos y Servicios Disponibles

Una vez levantado el proyecto mediante Docker, puedes acceder a los siguientes servicios desde tu máquina local:

| Servicio | URL Local | Descripción |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:5173](http://localhost:5173) | Aplicación web |
| **Backend API** | [http://localhost:3000](http://localhost:3000) | Servidor de desarrollo de la API REST. |
| **Documentación API** | [http://localhost:3000/api/docs](http://localhost:3000/api-docs) | Swagger interactivo con los endpoints de la API. |
| **Prisma Studio** | [http://localhost:51212](http://localhost:51212) | Herramienta visual para inspeccionar los datos en la DB. |
| **Base de Datos** | `localhost:5432` | Puerto expuesto de PostgreSQL para conexiones externas. |

---

## Desarrollo Local (Sin Docker)

Si prefieres ejecutar el backend y el frontend por separado de forma nativa en tu host, necesitarás instalar las dependencias con **pnpm**:

### 1. Levantar PostgreSQL
Necesitas tener una base de datos PostgreSQL en ejecución localmente. Asegúrate de configurar la cadena de conexión correspondiente en el archivo `.env` del backend.

### 2. Preparar el Backend
```bash
cd backend
pnpm install
npx prisma db push      # Sincroniza las tablas en tu base de datos
npx prisma db seed      # Ejecuta el poblado inicial de personajes
pnpm run dev            # Inicia el backend en http://localhost:3000
```

### 3. Preparar el Frontend
```bash
cd frontend
pnpm install
pnpm run dev            # Inicia el frontend en http://localhost:5173
```

---
