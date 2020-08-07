# Building de la aplicación
FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

# Copia y despliegue en el servidor
FROM nginx:1.15

EXPOSE 5000

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
