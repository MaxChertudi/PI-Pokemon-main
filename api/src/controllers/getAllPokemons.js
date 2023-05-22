const axios = require('axios');

const getAllPokemons = async(req, res) => {
    try {
        const endpointAll = "https://pokeapi.co/api/v2/pokemon/";
        const apiResultAll =  await axios(endpointAll);
        const arrPokemons = apiResultAll.data.results;
        const arrResult = [];
        for (let i = 0; i < arrPokemons.length; i++) {
            const endpoint = "https://pokeapi.co/api/v2/pokemon/";
            const apiResult = await axios(endpoint + arrPokemons[i].name.toLowerCase());
            const obj = {
                id: apiResult.data.id,
                name: apiResult.data.name,
                image: apiResult.data.sprites.front_default,
                type: apiResult.data.types.map((type) => type.type.name),
                health: apiResult.data.stats[0].base_stat,
                attack: apiResult.data.stats[1].base_stat,
                defense: apiResult.data.stats[2].base_stat,
                speed: apiResult.data.stats[5].base_stat,
                height: apiResult.height,
                weight: apiResult.weight
            }
            arrResult.push(obj);
        }
        res.status(200).json(arrResult);
    } catch(error) {
        res.status(500).send(error.message);
    }
}  

module.exports = getAllPokemons; 