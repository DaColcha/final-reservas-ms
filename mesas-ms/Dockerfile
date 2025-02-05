# 🔹 1️⃣ Instalar dependencias solamente cuando sea necesario
FROM node:20-alpine3.20 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=production

# 🔹 2️⃣ Construir la aplicación con cache de dependencias
FROM node:20-alpine3.20 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 🔹 3️⃣ Imagen de producción, copiar archivos y ejecutar NestJS
FROM node:20-alpine3.20 AS runner
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3004
CMD ["node", "dist/main"]
