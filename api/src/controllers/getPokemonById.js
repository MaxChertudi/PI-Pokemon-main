const axios = require('axios');
const { Pokemon } = require('../db.js');

const getPokemonById = async(req, res) => {
    try {
        const p_id = req.params.id;
        // try first in local db
        const dbSearch = await Pokemon.findByPk(p_id);
        if (dbSearch) {
            // Find associated types in db
            const types = await dbSearch.getTypes();
            
            // extract type names from result
            const typeNames = types.map((type) => type.dataValues.name);
            const objTypeNames = { Types: typeNames};

            // Merge pokemon data with associated Types 
            const obj = {...dbSearch.dataValues, ...objTypeNames, Source: 'db'};
            res.status(200).json(obj);
        } else {
            const endpoint = "https://pokeapi.co/api/v2/pokemon/";
            const apiResult = await axios(endpoint+p_id);
            const obj = {
                id: apiResult.data.id,
                name: apiResult.data.name,
                image: apiResult.data.sprites.other.home.front_shiny,
                Types: apiResult.data.types.map((type) => type.type.name),
                health: apiResult.data.stats[0].base_stat,
                attack: apiResult.data.stats[1].base_stat,
                defense: apiResult.data.stats[2].base_stat,
                speed: apiResult.data.stats[5].base_stat,
                height: apiResult.data.height,
                weight: apiResult.data.weight,
                source: 'api'
            }   
            res.status(200).json(obj);
        }
    }
    catch(error) {
        res.status(401).send('Pokemon ID not found')
    }
} 
module.exports = getPokemonById; 