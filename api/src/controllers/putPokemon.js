const deletePokemonByid = require('./deletePokemonById');
const postPokemon = require('./postPokemon');
const axios = require('axios');

const putPokemon = async(req, res) => {
    try {
        await deletePokemonByid(req, res);
        await postPokemon(req, res);
        return res.status(200);
    } catch(error) {
        return res.status(502).send('Error trying to update pokemon: ', error.message);
    }
} 

module.exports = putPokemon; 