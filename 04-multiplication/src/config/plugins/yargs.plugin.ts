import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/*
- Registramos un argumento para que pueda ser pasado por consola
- Le asignamos un alias (base)
- Le asignamos un tipo (number)
- Le asignamos una descripción (Multiplication table base)
- demandOption: true, significa que es obligatorio y la app tira un error si no se pasa

- Si imprimimos yarg, veremos 'b' y 'base' como propiedades con el valor que le pasamos por consola (en este caso 10 cuando ejecutamos el script de 'dev')

- Si no pasamos el argumento, nos tira una ayuda para saber que argumentos podemos pasarle y nos dice que 'b' es obligatorio

- podemos ver la ayuda con npx ts-node src/app --help o ya en produccion con node dist/app.js --help

- Si no pasamos -l, al ejecutar el script, nos asigna el valor por defecto de 10 y podemos acceder a el

- Con los booleanos, el solo pasar la bandera, nos asigna true y si no la pasamos, nos asigna false

El estandar es que los alias que son las palabras largas sean con -- y las abreviaciones con - (por ejemplo, --base y -b)


--------------------
check() es para hacer validaciones con los argumentos que pasamos por consola


New args for yargs:
- n: nombre del archivo
- d: destino del archivo
*/
 export const yarg = yargs(hideBin(process.argv))
 .option('b',{
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Multiplication table base'
 })
 .option('l',{
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Multiplication table limit'
 })
 .option('s',{
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show multiplication table'
 })
 .option('n',{
    alias: 'name',
    type: 'string',
    default: 'multiplication-table',
    describe: 'File name'
 })
 .option('d',{
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    describe: 'File destination'
 })
 .check(( argv, options )=>{

    //Validamos que 'b' o 'base' sean positivos
    if (argv.b < 1) throw 'Error: base must be greater than 0'
    return true
 })
 .parseSync()