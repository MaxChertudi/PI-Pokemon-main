const { Pokemon } = require('../db.js');

const deletePokemonById = async (req, res, idFromPut) => {
    try {
        let { id } = req.params;
        if (idFromPut) // if call comes form PUT, Id is parameter
            id = idFromPut;
        if (id) {
            const pokemon = await Pokemon.findOne( { where: { id: id} } );
            if (pokemon) {
                pokemon.destroy();
                await pokemon.destroy({ force: true });
                res.status(200).json(pokemon);
            } else
                return res.status(401).send('Pokemon with ID ' + id + ' not found');
        } else
            return res.status(401).send('Missing ID');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = deletePokemonById ;