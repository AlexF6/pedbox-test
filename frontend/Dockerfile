FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 5173

# Se añade --host para que Vite sea accesible fuera del contenedor
CMD ["pnpm", "run", "dev", "--", "--host"]