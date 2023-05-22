const getPokemonByName = require('./getPokemonByName');
const getAllpokemons = require('./getAllPokemons');

const getPokemons = async(req, res) => {
    pokemonName = req.query.name;
    if (pokemonName)
        getPokemonByName(req, res);
    else
        getAllpokemons(req, res);
} 
module.exports = getPokemons; 