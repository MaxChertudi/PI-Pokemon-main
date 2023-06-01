const dbdeletePokemonById = require('../database/dbdeletePokemonById');

const deletePokemonById = async (req, res) => {
    try {
        let { id } = req.body;
        if (!id)
            id = req.params.id;
        if (id) {
            const obj = await dbdeletePokemonById(id);
            if (obj.id) {
                return res.status(200).json(obj);
            }else {
                return res.status(501).send(obj);
            }
        } else
            return res.status(401).send('dbdeletePokemonById: Pokemon with ID ' + id + ' not found');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = deletePokemonById ;