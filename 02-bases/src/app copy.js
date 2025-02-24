const { buildLogger } = require("./plugins/index");
const logger = buildLogger("app.js"); //app.js es el servicio (El archivo que loggea)

logger.log("Hola mundo"); //Al llamar a logger, se crean los logs en los archivos error.log y combined.log (si no existen, se crean)
logger.error('Esto es algo malo')

//Esto sera pasado a typescript
/*
-1
npm i -D typescript @types/node

2-
npx tsc --init --outDir dist/ --rootDir src

3-
npm install -D ts-node nodemon

4- Instalar rimraf y hacer los scripts de dev, build y start para el package.json

ntes (scripts previos):
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node src/app.js",
"dev": "nodemon src/app.js",
"start:dev": "echo 'Hello desde dev'"

Despues:
npm install -D rimraf

"dev": "nodemon"
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.js"

Finalmente:
renombra app.js a app.ts
*/