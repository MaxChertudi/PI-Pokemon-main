const dbGetTypes = require('../database/dbGetTypes.js')

const getTypes =  async (req, res, next) => {
    try {
        const result = await dbGetTypes();
        res.status(200).json(result);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
}

module.exports = getTypes;