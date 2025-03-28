//My solution:
// const fs = require("fs");
// import fs from "fs";


// fs.writeFileSync("Table-5.txt", 'Hola');
// const header = `${'='.repeat(50)} \nTabla del 5 \n${'='.repeat(50)} \n`;
// let content = '';
// for (let i = 1; i <= 10; i++) {
//     if(i < 10)
//         content += `5 x ${i} = ${5 * i}\n`;
//     else
//     content += `5 x ${i} = ${5 * i}`;
// }

// fs.writeFileSync("Table-5.txt", header + content);
// console.log('Table-5.txt created, now reading it...');
// const data = fs.readFileSync("Table-5.txt", "utf8");
// console.log(data)


//Course solution:
import fs from "fs";

let outputMessage = '';
const base = 5;
const header = `
==================================================
                Tabla del ${ base }
==================================================\n
`;

for (let i = 1; i <= 10; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`; 
}

outputMessage = header + outputMessage;

//Para crear un directorio si no existe
const outputPath = `outputs`;
fs.mkdirSync(outputPath, { recursive: true }); //Crea el directorio (si quiero agregar subdirectorios, debo poner recursive: true)
fs.writeFileSync(`${outputPath}/table-${ base }.txt`, outputMessage); //No crea el directorio si no existe y da error

console.log('File created');