FROM node:21-alpine AS node-dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node-dependencies AS build
COPY ./ ./
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine AS server
ENV PORT=8080
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
WORKDIR /var/www/html
COPY --chown=nginx:nginx --from=build /app/dist ./

