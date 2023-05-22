const { Pokemon, Type } = require('../db.js');

const dbInit = async () => {
    await Type.destroy({ truncate: true });
    await Pokemon.destroy({ truncate: true });
}

module.exports = dbInit;