# Proyecto NOC

El objetivo es crear una serie de tareas usando Clean Architecture con TypeScript

# dev

1. Crearse un archivo .env con la siguiente estructura

```
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false
```

2. Correr el comando `npm run`

## Resumen:

Estructura de directorios

- config

```
Basicamente adapters para librerias de terceros, creamos plugins por ejemplo Axios.
```

- domain

```
Son las reglas que rigen la aplicacion:
- Datasources,

- Entidades -> se apegan a las bases de datos, definen eso mismo, entidades (tablas)

- Repository -> Como quiero trabajar con los datasources

-Use Cases -> Codigo para una tarea especializada.
```
