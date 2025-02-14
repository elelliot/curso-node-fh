const heroes = [
    { id:1 , name : 'Ironman', owner: 'Marvel'},
    { id:2 , name : 'Spiderman', owner: 'Marvel'},
    { id:3 , name : 'Batman', owner: 'Marvel'},
]

const findHeroById = (id: number) => {
    return heroes.find( hero => hero.id === id);
}

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

*/
const hero = findHeroById(4);
console.log(hero?.name ?? 'Hero not found!!');