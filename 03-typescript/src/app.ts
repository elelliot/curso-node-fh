import { findHeroById } from "./services/hero.service";

/*
Para trabajar con node y typescript:
1- Instalamos TS y los tipos de Node
npm i -D typescript @types/node

2- Creamos el tsconfig.json:
npx tsc --init --outDir dist/ --rootDir src
 `--init` --> seteamos el directorio de salida
 `--rootDir src` --> seteamos la carpeta a trackear (src, por que no nos interesa nada fuera de ahi, ya sea node_modules, etc.)
*/


/*
Para watchear los cambios y transpilar el TS con nodemon y TSC (sin script en package.json)
1- Creamos el archivo de salida de JS:
npx tsc --watch

2- Instalamos nodemon,
npm install -D ts-node nodemon

3- Trackeamos el archivo transpilado de typescript (dist/app.js, en este caso)
npx nodemon dist/app

--------------------------------------
El problema con esto es que ahora tendremos que usar al menos 2 terminales para trabajar, una para el watch de TS y otra para el watch de nodemon (QUE HUEVA LOCO)

npx nodemon dist/app 
y 
npx tsc --watch

-------Pero podemos configurar un script para los 2-------

1- instalamos nodemon y ts-node
npm install -D ts-node nodemon

2- Creamos y configuramos el archivo nodemon.json... (ver archivo)
3- Creamos el script en package.json 
"dev": "nodemon src/app.ts"


Extra Step: 
-Seteamos el build y el start en package.json
*/
const hero = findHeroById(2);
console.log(hero?.name ?? 'Hero not found!!');