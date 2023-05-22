const { Pokemon, Type } = require('../db.js');
const dbPopulateTypes = require('./dbPopulateTypes.js');

const dbInit = async () => {
    await Type.destroy({ truncate: true });
    await Pokemon.destroy({ truncate: true });
    dbPopulateTypes();
}

module.exports = dbInit;