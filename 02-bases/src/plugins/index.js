/*
Como tenemos algunas importaciones del mismo directorio, 
podemos crear un archivo de barril: index.js 
en el directorio plugins y exportar todo lo que necesitamos desde aqui
*/
const { getUUID } = require('../plugins/get-id.plugin')
const { getAge } = require('../plugins/get-age.plugin')

module.exports = {
    getAge,
    getUUID
}