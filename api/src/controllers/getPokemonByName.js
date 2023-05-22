const axios = require('axios');

const getPokemonByName = async(req, res) => {
    try {
        const endpoint = "https://pokeapi.co/api/v2/pokemon/";
        const p_name = req.query.name.toLowerCase();
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
            weight: apiResult.data.weight
        }
        res.status(200).json(obj);
    }
    catch(error) {
        res.status(500).send(error.message);
    }
} 
module.exports = getPokemonByName; 