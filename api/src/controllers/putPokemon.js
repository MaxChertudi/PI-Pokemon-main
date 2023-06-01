const deletePokemonByid = require('./deletePokemonById');
const postPokemon = require('./postPokemon');
const axios = require('axios');

const putPokemon = async(req, res) => {
    //await deletePokemonByid(req, res);
    //await postPokemon(req, res);
    try {
        //const aDelete = await axios.delete('http://localhost:3001/pokemons/' + req.body.id );
        //const aPost = await axios.post('http://localhost:3001/pokemons', req.body);
        return res.status(200);
    } catch(error) {
        return res.status(502).send('Error trying to update pokemon: ', error.message);
    }
} 

module.exports = putPokemon; 