const { Router } = require('express');
const getTypes = require('../controllers/getTypes');
const getPokemonById = require('../controllers/getPokemonById');
const getPokemons = require('../controllers/getPokemons');
const postPokemon = require('../controllers/postPokemon');
const deletePokemonById = require('../controllers/deletePokemonById');
const putPokemon = require('../controllers/putPokemon');
const router = Router();

router.get('/pokemons/', getPokemons);
router.get('/pokemons/:id', getPokemonById) 
router.post('/pokemons/', postPokemon);
router.put('/pokemons/', putPokemon);
router.delete('/pokemons/:id', deletePokemonById);
router.get('/types', getTypes);

module.exports = router;
