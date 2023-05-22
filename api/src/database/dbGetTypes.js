const { Type } = require('../db.js');

const dbGetTypes = async () => {
    const allTypes = await Type.findAll();
    const result = allTypes.map(objType => objType.name);
    return result;
}

module.exports = dbGetTypes;