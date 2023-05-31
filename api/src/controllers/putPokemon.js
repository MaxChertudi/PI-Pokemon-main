const deletePokemonByid = require('./deletePokemonById');
const postPokemon = require('./postPokemon');

const putPokemon = async(req, res) => {
    const { id } = req.body;

console.log('putPokemon', req.body);
    if (id) {
        deletePokemonByid(req, res, id);
        postPokemon(req, res);
        res.status(200).json(req.body);
    }
} 
module.exports = putPokemon; 