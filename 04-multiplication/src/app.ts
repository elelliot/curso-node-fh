// console.log(process.env)

import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";

/*
---------------------------------------------------------------------------------------------------
Los podemos ver en el package.json en el script que se ejecuta, en este caso "dev":
[
'/home/elliot/cursos/curso-node-fh/04-multiplication/node_modules/.bin/ts-node',
'/home/elliot/cursos/curso-node-fh/04-multiplication/src/app.ts'
]


---------------------------------------------------------------------------------------------------
Si hacemos el build y ejecutamos el script compilado con:
node dist/app.js --base 10 -l=100 --file=hola.txt

, veremos que los argumentos son :

[
'/home/elliot/.nvm/versions/node/v22.13.1/bin/node',
'/home/elliot/cursos/curso-node-fh/04-multiplication/dist/app.js',
'--base',
'10',
'-l=100',
'--file=hola.txt'
]
        


---------------------------------------------------------------------------------------------------
Con 'yargs' podemos parsear estos argumentos y obtener un objeto con ellos, por ejemplo:
{
  _: [
    '/home/elliot/cursos/curso-node-fh/04-multiplication/node_modules/.bin/ts-node',
    '/home/elliot/cursos/curso-node-fh/04-multiplication/src/app.ts'
  ],
  b: 10,
  '$0': 'src/app.ts'
}

Donde:
- '_' es un arreglo con los argumentos que no tienen una bandera (por ejemplo, los paths de los archivos)
- 'b' es el valor de la bandera '--base' (en este caso, 10)
- '$0' es el path del archivo que se está ejecutando

'hideBin' oculta el arreglo de paths que se obtiene de process.argv
*/
       
       
// console.log(process.argv)
// console.log(yarg);

(async()=>{
  await main();
})();

async function main(){
  //Al imprimir los valores, me muestra ambos argumentos con su alias, por ejemplo: '--base' y '-b' o '--limit' y '-l'
  //console.log(yarg);
  const { b:base, l:limit, s:showTable, n:fileName, d:fileDestination } = yarg

  //Creamos un punto de entrada para la app usando clean architecture
  ServerApp.run({ base, limit, showTable, fileName, fileDestination });
}