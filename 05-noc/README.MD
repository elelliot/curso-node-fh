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

## domain


Son las reglas que rigen la aplicacion:
- Datasources -> El origen de la data

- Entidades -> se apegan a las bases de datos, definen eso mismo, entidades (tablas para BD, modelos de entidades)

- Repository -> Como quiero trabajar con los datasources

- Use Cases -> Codigo para una tarea especializada (Enviar Emails, verificar un servicio, crear logs, etc.)


## infrastructure

Aqui ya trabajamos la data, la procesamos y recuperamos

- Repositories -> Aqui solo cambiamos el datasource y trabajamos con el
(Inyectamos el datasource y lo usamos)

- Presentation -> Aqui es donde esta la aplicacion de consola, o el servidor de Express. Cosas que estan muy cerca de la consola.

### Nota :
Al crear una instancia `new EmailService()`  
pareciera que no hay dependencias ya que no le enviamos nada al constructor  
**PERO** dentro de la clase necesitamos las **variables de entorno** .  
```
    export class EmailService {
        private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        },
        });
        ...
    }
```
Podria resolverse si las recibimos por el `constructor`