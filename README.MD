# PedBox Test — Fullstack Monorepo

Aplicación full-stack organizada como un **monorepo** que integra una API REST desarrollada con Express, TypeScript y Prisma junto con una aplicación web desarrollada con React, Vite, TypeScript y Tailwind CSS.

El proyecto está diseñado para ejecutarse como un ecosistema unificado mediante Docker Compose, incluyendo la aplicación frontend, la API backend, PostgreSQL y Prisma Studio.

---

## Tabla de contenidos

- [Descripción general](#descripción-general)
- [Arquitectura del monorepo](#arquitectura-del-monorepo)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Configuración de variables de entorno](#configuración-de-variables-de-entorno)
- [Inicio rápido con Docker](#inicio-rápido-con-docker)
- [Servicios y puertos](#servicios-y-puertos)
- [Desarrollo local sin Docker](#desarrollo-local-sin-docker)
- [Backend](#backend)
- [Frontend](#frontend)
- [Base de datos y Prisma](#base-de-datos-y-prisma)
- [API y funcionalidades](#api-y-funcionalidades)
- [Testing](#testing)
- [Linting y calidad de código](#linting-y-calidad-de-código)
- [Documentación de la API](#documentación-de-la-api)
- [Flujo de desarrollo](#flujo-de-desarrollo)
- [Notas sobre el monorepo](#notas-sobre-el-monorepo)

---

## Descripción general

PedBox Test es una aplicación full-stack compuesta por tres piezas principales:

1. **Frontend:** Single Page Application construida con React 19, TypeScript, Vite 8 y Tailwind CSS v4.
2. **Backend:** API REST construida con Express y TypeScript, con Prisma como ORM y PostgreSQL como base de datos.
3. **Infraestructura:** Docker Compose para coordinar frontend, backend, PostgreSQL y Prisma Studio.

El backend proporciona autenticación mediante JWT, validación de solicitudes con Zod, sincronización de datos externos y endpoints relacionados con personajes, episodios y ubicaciones.

El frontend consume la API mediante Axios y proporciona las vistas y flujos de autenticación y consulta de personajes.

---

## Arquitectura del monorepo

La raíz del repositorio contiene las aplicaciones y la infraestructura compartida:

```text
pedbox-test/
├── backend/                 # API REST, lógica de negocio y acceso a datos
├── frontend/                # Aplicación web React
├── docker-compose.yml       # Orquestación del entorno completo
├── README.MD                # Documentación principal del monorepo
├── .gitignore               # Archivos ignorados por Git
└── .git/                    # Historial Git único del monorepo
```

El monorepo permite trabajar con frontend y backend dentro del mismo repositorio sin mezclar sus responsabilidades internas.

Cada aplicación mantiene su propia configuración de Node.js, dependencias y scripts:

```text
pedbox-test/
├── backend/
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── prisma/
│   └── src/
│
└── frontend/
    ├── package.json
    ├── pnpm-lock.yaml
    ├── src/
    └── public/
```

Esto permite desarrollar cada aplicación de manera independiente y, al mismo tiempo, ejecutar el sistema completo mediante Docker Compose.

---

# Stack tecnológico

## Backend

| Tecnología | Uso |
|---|---|
| Node.js | Runtime |
| TypeScript | Lenguaje principal |
| Express | Framework HTTP |
| Prisma | ORM |
| PostgreSQL | Base de datos |
| PNPM | Gestor de paquetes |
| TSX | Ejecución en desarrollo |
| Zod | Validación de datos |
| JWT | Autenticación |
| Bcrypt | Hash de contraseñas |
| Jest | Testing |
| ts-jest | Integración de Jest con TypeScript |
| Swagger | Documentación interactiva de API |

El backend utiliza Node.js + TypeScript y ejecuta el código de desarrollo mediante `tsx`. La API utiliza Express, PostgreSQL con Prisma, Zod, JWT y Bcrypt. El proyecto también integra Jest y Swagger para testing y documentación. 

## Frontend

| Tecnología | Uso |
|---|---|
| React 19 | Librería de UI |
| Vite 8 | Build tool y servidor de desarrollo |
| TypeScript | Tipado |
| Tailwind CSS v4 | Estilos |
| React Router 7 | Enrutamiento |
| Axios | Peticiones HTTP |
| Lucide React | Iconografía |
| Oxlint | Linting |
| Vitest | Testing |
| React Testing Library | Testing de componentes |

## Infraestructura

| Tecnología | Uso |
|---|---|
| Docker | Contenedores |
| Docker Compose | Orquestación |
| PostgreSQL 16 | Persistencia |
| Prisma Studio | Inspección visual de datos |

---

# Estructura del proyecto

## Estructura general

```text
pedbox-test/
├── backend/
│   ├── Dockerfile
│   ├── README.md
│   ├── jest.config.js
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── prisma.config.ts
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── docs/
│   │   ├── generated/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── index.ts
│   └── tsconfig.json
│
├── frontend/
│   ├── Dockerfile
│   ├── README.md
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── docker-compose.yml
├── README.MD
└── .gitignore
```

---

# Requisitos previos

Para trabajar con el proyecto localmente se recomienda disponer de:

- Node.js 20 o superior.
- PNPM.
- Docker.
- Docker Compose.
- PostgreSQL si se desea ejecutar el backend sin Docker.

El backend documenta Node.js v20+ y PNPM como requisitos, además de una instancia de PostgreSQL para ejecución nativa. 

---

# Configuración de variables de entorno

El entorno Docker utiliza un archivo `.env` en la raíz del monorepo.

Ejemplo:

```env
# PostgreSQL
POSTGRES_USER=pedbox
POSTGRES_PASSWORD=pedbox_password
POSTGRES_DB=pedbox

# Backend
PORT=3000
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=15m
```

Para una ejecución del backend fuera de Docker también se necesita configurar la conexión a PostgreSQL:

```env
PORT=3000

DATABASE_URL=postgresql://username:password@localhost:5432/database_name?schema=public

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=15m
```


# Inicio rápido con Docker

La forma recomendada de ejecutar el ecosistema completo es Docker Compose.

Desde la raíz:

```bash
docker compose up --build
```

Esto permite levantar conjuntamente los servicios definidos en `docker-compose.yml`.

## Detener el entorno

```bash
docker compose down
```

## Reconstruir las imágenes

```bash
docker compose build
```

o:

```bash
docker compose up --build
```

## Ejecutar en segundo plano

```bash
docker compose up -d --build
```

## Ver logs

Todos los servicios:

```bash
docker compose logs -f
```

Un servicio concreto:

```bash
docker compose logs -f backend
```

---

# Servicios y puertos

Con el entorno Docker levantado, los servicios principales están disponibles en:

| Servicio | Dirección | Descripción |
|---|---|---|
| Frontend | `http://localhost:5173` | Aplicación web |
| Backend API | `http://localhost:3000` | API REST |
| Swagger | `http://localhost:3000/api/docs` | Documentación interactiva |
| Prisma Studio | `http://localhost:51212` | Exploración visual de PostgreSQL |
| PostgreSQL | `localhost:5432` | Base de datos |

> La ruta de Swagger documentada por el backend es `/api/docs`.

---

# Desarrollo local sin Docker

También es posible ejecutar frontend y backend por separado.

## 1. Base de datos

Primero debe existir una instancia de PostgreSQL accesible por el backend.

Configura:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name?schema=public
```

## 2. Backend

```bash
cd backend
pnpm install
```

Configura las variables de entorno y ejecuta las migraciones:

```bash
pnpm prisma migrate dev
```

Genera el cliente Prisma:

```bash
pnpm prisma generate
```

Ejecuta el seed:

```bash
pnpm prisma db seed
```

Inicia el servidor:

```bash
pnpm dev
```

La API se ejecutará normalmente en:

```text
http://localhost:3000
```

## 3. Frontend

En otra terminal:

```bash
cd frontend
pnpm install
```

Inicia Vite:

```bash
pnpm run dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:5173
```

Para una compilación de producción:

```bash
pnpm run build
```

---

# Backend

## Descripción

El backend es una API REST construida con Express y TypeScript.

Entre sus responsabilidades se encuentran:

- Autenticación de usuarios.
- Hash de contraseñas.
- Emisión y validación de JWT.
- Validación de requests.
- Acceso a PostgreSQL mediante Prisma.
- Sincronización de datos externos.
- Gestión de personajes.
- Gestión de episodios y ubicaciones.
- Documentación OpenAPI/Swagger.
- Pruebas automatizadas.

La estructura original del backend separa controladores, rutas, servicios, middlewares, documentación, utilidades y acceso a Prisma. 

## Estructura interna

```text
backend/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
└── src/
    ├── config/
    ├── controllers/
    ├── docs/
    │   └── schemas/
    ├── generated/
    │   └── prisma/
    ├── lib/
    ├── middlewares/
    ├── routes/
    ├── services/
    ├── utils/
    └── index.ts
```

### Controllers

Los controllers reciben las solicitudes HTTP y coordinan la respuesta de la API.

Incluyen módulos para:

- Autenticación.
- Personajes.
- Sincronización.

### Routes

Las rutas definen los endpoints HTTP y conectan los controllers con los middlewares correspondientes.

### Services

Los servicios contienen la lógica de negocio y operaciones relacionadas con la base de datos y sincronización.

### Middlewares

El proyecto incluye middleware para:

- Autenticación.
- Manejo global de errores.

### Validation

Zod se utiliza para validar los datos recibidos por los endpoints.

### Docs

La documentación OpenAPI/Swagger está integrada dentro del backend.

---

# Frontend

## Descripción

El frontend es una Single Page Application desarrollada con React 19, TypeScript, Vite 8 y Tailwind CSS v4.

La aplicación incluye:

- Pantalla de inicio de sesión.
- Registro.
- Protección de rutas.
- Contexto global de autenticación.
- Listado de personajes.
- Detalle de personajes.
- Consumo de la API mediante Axios.
- Componentes reutilizables.
- Testing con Vitest y React Testing Library.

## Estructura de `src`

```text
frontend/src/
├── assets/
├── components/
├── context/
├── hooks/
├── pages/
├── services/
├── types/
├── App.tsx
├── index.css
└── main.tsx
```

### `components/`

Componentes reutilizables de interfaz.

Ejemplos:

```text
components/
├── Layout.tsx
├── ProtectedRoute.tsx
└── ProtectedRoute.test.tsx
```

### `context/`

Contiene los contextos globales de React.

Actualmente incluye:

```text
AuthContext.tsx
```

Este contexto centraliza el estado relacionado con autenticación.

### `hooks/`

Contiene hooks personalizados.

Actualmente incluye:

```text
useAuth.ts
```

### `pages/`

Contiene las principales vistas de la aplicación:

```text
pages/
├── CharacterDetail.tsx
├── CharacterList.tsx
├── Login.tsx
├── Login.test.tsx
└── Register.tsx
```

### `services/`

Centraliza la comunicación HTTP con el backend:

```text
services/
└── api.ts
```

### `types/`

Contiene las interfaces y tipos TypeScript utilizados por la aplicación.

### `App.tsx`

Punto central para la configuración de rutas y composición de la aplicación.

### `main.tsx`

Punto de entrada de React.

---

# Base de datos y Prisma

El backend utiliza PostgreSQL como motor de base de datos y Prisma como ORM.

El modelo está diseñado para almacenar:

- Usuarios.
- Personajes.
- Ubicaciones.
- Episodios.
- Relaciones entre personajes y episodios.

## Modelo entidad-relación

```text
+------------------+          +----------------------+          +--------------------+
|     Location     |          |      Character       |          |      Episode       |
+------------------+          +----------------------+          +--------------------+
| id (PK)          |<---------| id (PK)              |          | id (PK)            |
| externalId       |     1:N  | externalId           |          | externalId        |
| name             |          | name                 |          | name              |
| type             |          | status               |          | airDate           |
| dimension        |          | species              |          | episodeCode       |
| createdAt        |          | type                 |          | createdAt         |
| updatedAt        |          | gender               |          | updatedAt         |
+------------------+          | image                |          | updatedAt         |
                              | locationId (FK)      |          +--------------------+
                              | createdAt            |                    |
                              | updatedAt            |                    |
                              +----------------------+                    |
                                       | 1                                | 1
                                       |                                  |
                                       v *                                | *
                              +-----------------------------------------------+
                              |             CharacterEpisode                 |
                              +-----------------------------------------------+
                              | characterId (PK, FK)                         |
                              | episodeId (PK, FK)                           |
                              +-----------------------------------------------+
```

## User

Representa los usuarios del sistema y sus credenciales.

| Campo | Descripción |
|---|---|
| `id` | Identificador único autoincremental |
| `email` | Correo electrónico único |
| `passwordHash` | Hash de la contraseña |
| `createdAt` | Fecha de creación |
| `updatedAt` | Fecha de actualización |

## Location

Representa las ubicaciones provenientes de la fuente externa.

| Campo | Descripción |
|---|---|
| `id` | Identificador interno |
| `externalId` | Identificador externo único |
| `name` | Nombre |
| `type` | Tipo de ubicación, opcional |
| `dimension` | Dimensión, opcional |
| `createdAt` | Fecha de creación |
| `updatedAt` | Fecha de actualización |

## Character

Almacena los personajes sincronizados desde la API externa.

| Campo | Descripción |
|---|---|
| `id` | Identificador interno |
| `externalId` | Identificador externo único |
| `name` | Nombre |
| `status` | Estado |
| `species` | Especie |
| `type` | Tipo, opcional |
| `gender` | Género |
| `image` | URL de imagen |
| `locationId` | FK hacia `Location`, opcional |
| `createdAt` | Fecha de creación |
| `updatedAt` | Fecha de actualización |

## Episode

Almacena información de episodios.

| Campo | Descripción |
|---|---|
| `id` | Identificador interno |
| `externalId` | Identificador externo único |
| `name` | Nombre |
| `airDate` | Fecha de emisión |
| `episodeCode` | Código del episodio |
| `createdAt` | Fecha de creación |
| `updatedAt` | Fecha de actualización |

## CharacterEpisode

Tabla intermedia explícita para la relación muchos a muchos entre personajes y episodios.

```prisma
@@id([characterId, episodeId])
```

La combinación de ambos identificadores evita duplicar relaciones.

---

# Relaciones de datos

## Location → Character

Relación uno a muchos:

```text
Location 1 ─────────── * Character
```

Una ubicación puede estar asociada a múltiples personajes.

Cada personaje puede tener una ubicación asociada y la relación puede ser opcional.

## Character ↔ Episode

Relación muchos a muchos:

```text
Character 1 ─── * CharacterEpisode * ─── 1 Episode
```

Un personaje puede aparecer en múltiples episodios y un episodio puede incluir múltiples personajes.

La relación se implementa mediante `CharacterEpisode`.

Las relaciones con esta tabla utilizan eliminación en cascada para mantener la integridad referencial.

---

# Integridad de datos

El modelo utiliza:

- Claves primarias internas.
- `externalId` único para evitar duplicados.
- `User.email` único.
- Clave primaria compuesta en `CharacterEpisode`.
- Claves foráneas.
- Eliminación en cascada en las relaciones con `CharacterEpisode`.
- Campos opcionales para datos que pueden no estar disponibles.

---

# Sincronización de datos externos

El backend dispone de un servicio de sincronización encargado de coordinar la importación de datos externos.

El proceso contempla entidades relacionadas con:

- Characters.
- Episodes.
- Locations.

El seed de Prisma permite ejecutar el poblado inicial de datos.

```bash
pnpm prisma db seed
```

La documentación del proyecto indica que la sincronización inicial obtiene datos de una API externa relacionada con personajes, episodios y ubicaciones.

---

# API y funcionalidades

## Autenticación

Módulo:

```text
/auth
```

Incluye:

- Registro.
- Login.
- Hash de contraseñas con Bcrypt.
- Autenticación stateless mediante JWT.

El backend utiliza JWT para la autenticación y Bcrypt para proteger las contraseñas almacenadas. 

## Sincronización

Módulo:

```text
/sync
```

Su objetivo es coordinar la importación y sincronización de información externa con la base de datos local.

## Characters

Módulo:

```text
/characters
```

Permite consultar y gestionar información relacionada con personajes, incluyendo estructuras relacionadas con episodios y ubicaciones.

---

# Documentación de la API

El backend integra Swagger/OpenAPI mediante:

- `swagger-jsdoc`
- `swagger-ui-express`

Con el backend ejecutándose, la documentación interactiva está disponible en:

```text
http://localhost:3000/api/docs
```

Desde Swagger es posible inspeccionar las especificaciones de los endpoints y realizar solicitudes directamente desde el navegador.

---

# Testing

El proyecto utiliza dos herramientas de testing según la aplicación.

## Backend

El backend utiliza:

- Jest.
- ts-jest.

Ejecutar todos los tests:

```bash
cd backend
pnpm test
```

Modo watch:

```bash
pnpm test --watch
```

Los tests del backend cubren componentes como:

- Middleware de autenticación.
- Servicios de autenticación.
- Servicios de personajes.
- Servicio de sincronización.

## Frontend

El frontend utiliza:

- Vitest.
- React Testing Library.
- jsdom.

Ejecutar las pruebas:

```bash
cd frontend
pnpm run test
```

Los tests están ubicados junto a los componentes o páginas correspondientes.

Ejemplos:

```text
components/ProtectedRoute.test.tsx
pages/Login.test.tsx
```

---

# Linting y calidad de código

El frontend utiliza Oxlint como herramienta de linting.

Para ejecutar el análisis:

```bash
cd frontend
pnpm run lint
```

Oxlint está diseñado como un linter de alto rendimiento escrito en Rust.

---

# Comandos principales

## Monorepo

Levantar todo:

```bash
docker compose up --build
```

Detener:

```bash
docker compose down
```

Logs:

```bash
docker compose logs -f
```

## Backend

```bash
cd backend
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm test
pnpm prisma migrate dev
pnpm prisma generate
pnpm prisma db seed
```

## Frontend

```bash
cd frontend
pnpm install
pnpm run dev
pnpm run build
pnpm run test
pnpm run lint
```

---

# Flujo de desarrollo recomendado

## Desarrollo completo con Docker

Para trabajar sobre el sistema completo:

```bash
docker compose up --build
```

Luego:

1. Abrir el frontend.
2. Utilizar la aplicación.
3. Consultar la API mediante Swagger.
4. Inspeccionar los datos mediante Prisma Studio.
5. Revisar logs si aparece algún error.

## Desarrollo separado

Cuando se trabaja principalmente sobre backend:

```bash
cd backend
pnpm install
pnpm dev
```

Cuando se trabaja principalmente sobre frontend:

```bash
cd frontend
pnpm install
pnpm run dev
```

En ambos casos debe existir una instancia de PostgreSQL accesible para el backend.

---

# Arquitectura de alto nivel

```text
                         ┌─────────────────────┐
                         │       Browser       │
                         └──────────┬──────────┘
                                    │
                                    │ HTTP
                                    ▼
                         ┌─────────────────────┐
                         │      Frontend       │
                         │ React + Vite + TS   │
                         │ Tailwind + Router   │
                         └──────────┬──────────┘
                                    │
                                    │ Axios / REST
                                    ▼
                         ┌─────────────────────┐
                         │       Backend       │
                         │ Express + TypeScript│
                         │ JWT + Zod + Swagger │
                         └──────────┬──────────┘
                                    │
                                    │ Prisma
                                    ▼
                         ┌─────────────────────┐
                         │     PostgreSQL      │
                         └─────────────────────┘
                                    ▲
                                    │
                              Prisma Studio
```

El backend también puede comunicarse con servicios externos para sincronizar personajes, episodios y ubicaciones.

---

# Responsabilidades por capa

## Frontend

Responsable de:

- Interfaz de usuario.
- Navegación.
- Gestión del estado de autenticación.
- Formularios.
- Visualización de personajes.
- Comunicación HTTP con el backend.

## Backend

Responsable de:

- API REST.
- Autenticación.
- Autorización mediante JWT.
- Validación.
- Lógica de negocio.
- Persistencia.
- Sincronización.
- Documentación de endpoints.

## Prisma

Responsable de:

- Acceso a PostgreSQL.
- Modelado de entidades.
- Migraciones.
- Generación del Prisma Client.
- Seed de datos.

## PostgreSQL

Responsable de la persistencia de:

- Usuarios.
- Characters.
- Locations.
- Episodes.
- Relaciones Character/Episode.

## Docker Compose

Responsable de integrar los diferentes servicios para proporcionar un entorno reproducible.

---

# Monorepo y control de versiones

Este proyecto utiliza un único repositorio Git en la raíz:

```text
pedbox-test/.git
```

El historial conserva los desarrollos originales del frontend y backend, integrados dentro de sus respectivas carpetas:

```text
pedbox-test/
├── backend/
└── frontend/
```

Esto permite mantener:

- Historial del backend.
- Historial del frontend.
- Commits de integración del monorepo.
- Un único punto de control de versiones para el proyecto full-stack.

Los archivos generados localmente, como `node_modules`, deben permanecer fuera del control de versiones mediante `.gitignore`.

---

# Buenas prácticas

## Dependencias

Cada aplicación mantiene sus propias dependencias:

```text
backend/package.json
frontend/package.json
```

Instalar dependencias del backend:

```bash
cd backend
pnpm install
```

Instalar dependencias del frontend:

```bash
cd frontend
pnpm install
```

## Variables sensibles

No subir:

```text
.env
```

ni secretos reales.

## Código generado

El cliente generado de Prisma se encuentra bajo:

```text
backend/src/generated/prisma
```

Su manejo debe respetar la configuración actual del proyecto y el flujo de generación definido por Prisma.

## Commits

Se recomienda mantener commits descriptivos y centrados en una responsabilidad concreta.

Ejemplos:

```text
feat: add character filtering
fix: handle expired JWT
test: add authentication service tests
docs: update API documentation
refactor: simplify sync service
chore: update dependencies
```

---

# Solución de problemas

## El puerto 3000 está ocupado

Comprueba qué proceso está utilizando el puerto:

```bash
lsof -i :3000
```

También puedes revisar los servicios Docker:

```bash
docker compose ps
```

## El puerto 5173 está ocupado

```bash
lsof -i :5173
```

## PostgreSQL no está disponible

Comprueba:

```bash
docker compose ps
```

y los logs:

```bash
docker compose logs -f postgres
```

Si ejecutas el backend fuera de Docker, verifica que `DATABASE_URL` apunte a una instancia accesible.

## Prisma Client no está generado

Desde `backend/`:

```bash
pnpm prisma generate
```

## La base de datos no tiene las tablas

Para desarrollo:

```bash
pnpm prisma migrate dev
```

o, dependiendo del flujo definido por el entorno:

```bash
pnpm prisma db push
```

Después puede ejecutarse el seed:

```bash
pnpm prisma db seed
```

---

# Resumen

PedBox Test es un proyecto full-stack organizado como monorepo:

```text
                     PEDBOX TEST
                         │
              ┌──────────┴──────────┐
              │                     │
          FRONTEND               BACKEND
              │                     │
       React 19               Express
       Vite 8                 TypeScript
       TypeScript             Prisma
       Tailwind v4            PostgreSQL
       React Router 7         JWT
       Axios                  Zod
       Vitest                 Jest
              │                     │
              └──────────┬──────────┘
                         │
                   Docker Compose
                         │
                    PostgreSQL
```

El resultado centraliza el desarrollo de la aplicación completa en un único repositorio, manteniendo una separación clara entre presentación, API, lógica de negocio y persistencia.

El frontend se comunica con el backend mediante HTTP/REST, mientras que el backend gestiona autenticación, validación, sincronización y persistencia mediante Prisma y PostgreSQL.

La documentación OpenAPI/Swagger permite explorar la API, Prisma Studio permite inspeccionar los datos y Docker Compose proporciona un entorno reproducible para ejecutar el ecosistema completo.
