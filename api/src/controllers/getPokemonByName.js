const axios = require('axios');
const { Pokemon } = require('../db.js');

const getPokemonByName = async(req, res) => {
    try {
        const p_name = req.query.name.toLowerCase();
        // try first in local db
        const dbSearch = await Pokemon.findOne( { where: { name: p_name} } );
        if (dbSearch) {
            // Find associated types in db
            const types = await dbSearch.getTypes();
            
            // extract type names from result
            const typeNames = types.map((type) => type.dataValues.name);
            const objTypeNames = { Type: typeNames};

            // Merge pokemon data with associated Types 
            const obj = {...dbSearch.dataValues, ...objTypeNames, Source: 'db'};
            res.status(200).json(obj);
        } else {
            const endpoint = "https://pokeapi.co/api/v2/pokemon/";
            const apiResult = await axios(endpoint+p_name);
            const obj = { 
                id: apiResult.data.id,
                name: apiResult.data.name,
                image: apiResult.data.sprites.front_default,
                type: apiResult.data.types.map((type) => type.type.name),
                health: apiResult.data.stats[0].base_stat,
                attack: apiResult.data.stats[1].base_stat,
                defense: apiResult.data.stats[2].base_stat,
                speed: apiResult.data.stats[5].base_stat, 
                height: apiResult.data.height,
                weight: apiResult.data.weight,
                Source: 'api'
            }
            res.status(200).json(obj);
        }
    }
    catch(error) {
        res.status(500).send(error.message);
    }
} 
module.exports = getPokemonByName; 