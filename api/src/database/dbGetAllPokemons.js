const { Pokemon, Type } = require('../db.js');

const dbGetAllPokemons = async () => {
    const dbRequest = await Pokemon.findAll({ include: [{ model : Type }] });
    if (dbRequest) {
        arrPokemons = dbRequest.map((pokemon) => {
               return {...pokemon.dataValues, 
                        Types: pokemon.dataValues.Types.map(type => type.name),
                        source : 'db'};
            } );
        return {arrPokemons};
    } else  
        return null;
}

module.exports = dbGetAllPokemons;