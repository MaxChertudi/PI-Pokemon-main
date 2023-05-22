const { Router } = require('express');
const getTypes = require('../controllers/getTypes');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//router.get('/', );
//router.get('/:id', null) 
//router.get('/name', null);
//router.post('/', null);
router.get('/types', getTypes);

module.exports = router;
