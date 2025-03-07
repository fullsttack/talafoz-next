FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install --force

COPY . .
RUN npm run build


FROM node:22-alpine


WORKDIR /app


COPY --from=builder /app ./

ENV NODE_ENV=production
EXPOSE 3000


CMD ["npm", "start"]
