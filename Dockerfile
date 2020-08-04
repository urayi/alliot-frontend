FROM node:12-alpine

# Crear Directorio de la APP
WORKDIR /usr/src/app

# Instalación de dependencias
COPY package*.json ./
RUN npm install

# Copia archivos
COPY . .
# Build para producción
RUN npm run-script build

RUN npm i serve --global

# Testing
# RUN npm test 

# Borrado de archivos innecesarios
# RUN rm -rf README.md generate-react-cli.json package-lock.json public src yarn.lock

EXPOSE 5000

# Inicia servidor de la APP
CMD [ "node", "server.js" ]