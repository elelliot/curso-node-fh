//getUUID Adapter
//const { v4: uuidv4 } = require('uuid'); //Destructured and renamed

//New way to import (no me pide instalar @types/uuid)
import { v4 as uuidv4 } from 'uuid'


export const getUUID = () => {
    return uuidv4();
}

// Bye old export way
// module.exports = {
//     getUUID
// }