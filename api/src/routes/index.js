const { Router } = require('express');
const getTypes = require('../controllers/getTypes');
const getPokemonById = require('../controllers/getPokemonById');
const getPokemons = require('../controllers/getPokemons');

const router = Router();

router.get('/pokemons/', getPokemons);
router.get('/pokemons/:id', getPokemonById) 
//router.post('/', null);
router.get('/types', getTypes);

module.exports = router;
