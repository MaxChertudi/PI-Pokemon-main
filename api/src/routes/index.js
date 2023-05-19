const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get('/pokemons', null);
//router.get('/pokemons/:id', null)
//router.get('/pokemons/name', null);
//router.post('/pokemons', null);
//router.get('/types', null);

module.exports = router;
