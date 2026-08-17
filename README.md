

***

# Frontend Application

Esta es la aplicación web (Single Page Application). Está construida utilizando **React 19**, **Vite**, **TypeScript** y **Tailwind CSS v4**. 

---

##  Tecnologías Principales

* **Framework/Librería:** [React 19](https://react.dev/)
* **Herramienta de Construcción:** [Vite 8](https://vite.dev/)
* **Tipado:** [TypeScript](https://www.typescriptlang.org/)
* **Enrutamiento:** [React Router 7](https://reactrouter.com/)
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (con integración nativa para Vite)
* **Peticiones HTTP:** [Axios](https://axios-http.com/)
* **Iconos:** [Lucide React](https://lucide.dev/)
* **Linter:** [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) (linter de alto rendimiento en Rust)
* **Pruebas:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)

---

## Estructura del Directorio

A continuación se detalla la organización de las carpetas bajo el directorio `src/`:

```text
src/
├── assets/          # Imágenes, recursos estáticos y logos de la aplicación.
├── components/      # Componentes de UI reutilizables (Layout, ProtectedRoute, etc.).
├── context/         # Contextos globales de React (ej. AuthContext para inicio de sesión).
├── hooks/           # Custom hooks personalizados (ej. useAuth).
├── pages/           # Vistas/Páginas principales de la aplicación (Login, Register, Listados).
├── services/        # Configuración de clientes HTTP y llamadas a la API (api.ts).
├── types/           # Definiciones de tipos e interfaces de TypeScript.
├── App.tsx          # Configuración de rutas y envoltura de contextos globales.
├── index.css        # Importaciones globales de estilos y configuración de Tailwind CSS.
└── main.tsx         # Punto de entrada de la aplicación para el DOM.
```

---



##  Desarrollo Local

### Requisitos Previos

Asegúrate de tener instalado:
* **Node.js** (Versión 20 o superior recomendada)
* **pnpm** (Gestor de paquetes utilizado en el repositorio)

### Instrucciones de Inicio

1. Instala las dependencias del proyecto:
   ```bash
   pnpm install
   ```

2. Inicia el servidor de desarrollo local:
   ```bash
   pnpm run dev
   ```
   La aplicación se levantará por defecto en `http://localhost:5173`.

3. Construye el proyecto optimizado para producción:
   ```bash
   pnpm run build
   ```

---

##  Ejecución con Docker

Si utilizas el entorno unificado con Docker Compose en la raíz del proyecto global, no necesitas configurar el frontend manualmente. Sin embargo, si deseas levantar solo el contenedor del frontend de forma aislada, el proyecto cuenta con su propio `Dockerfile`.

El `Dockerfile` expone el puerto `5173` y ejecuta el servidor de desarrollo de Vite con la bandera `--host` para permitir la comunicación hacia el exterior del contenedor.

### Comandos de Docker Compose (Raíz del proyecto)

Para iniciar todos los servicios del ecosistema:
```bash
docker compose up --build
```

---

##  Pruebas (Testing)

El proyecto utiliza **Vitest** como motor de pruebas y **React Testing Library** para simular las interacciones de los componentes en un entorno DOM virtual (`jsdom`).

Los archivos de pruebas están ubicados junto a los componentes que evalúan (ej. `ProtectedRoute.test.tsx`, `Login.test.tsx`).

Para ejecutar el set de pruebas unitarias:

```bash
pnpm run test
```

---

##  Calidad del Código (Linting)

Para asegurar la calidad y estilo de código, el proyecto utiliza **Oxlint**, una alternativa de alto rendimiento escrita en Rust que analiza el código de forma significativamente más rápida que las herramientas tradicionales.

Para analizar el código en busca de problemas o malas prácticas:

```bash
pnpm run lint
```