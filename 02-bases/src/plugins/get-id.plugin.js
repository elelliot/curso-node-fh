//getUUID Adapter
const { v4: uuidv4 } = require('uuid'); //Destructured and renamed

const getUUID = () => {
    return uuidv4();
}

module.exports = {
    getUUID
}