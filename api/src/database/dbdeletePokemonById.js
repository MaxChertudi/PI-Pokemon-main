const { Pokemon, Type } = require('../db.js');

const dbdeletePokemonById = async (id) => {
    try {
        const pokemon = await Pokemon.findOne( { where: { id: id} } );
        if (pokemon) {
            await pokemon.destroy({ where: { id: id} });
            return (pokemon.dataValues);
        } else
            return 'Pokemon not found';
    } catch(error) {
        console.log('\ndbdeletePokemonById:', error);
        return { error: error.message }
    }
}

module.exports = dbdeletePokemonById;