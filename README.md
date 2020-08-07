Proyecto FRONTEND para ingreso a Alliot

## Inicio de la aplicación

Se requiere tener instalado NodeJS y NPM

Para levantar el sistema de debe ejecutar
```sh
$ npm install && npm start
```


### Docker
```sh
$ docker build -t alliot/frontend .
$ docker run --rm -it  -p 5000:5000/tcp alliot/frontend:latest
```

### APP

Para consultar la APP  en local
```sh
localhost:3000 (puede variar si se corre el back en paralelo)
```
