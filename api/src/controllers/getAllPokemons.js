const axios = require('axios');
const dbGetAllPokemons = require('../database/dbGetAllPokemons');

const getAllPokemons = async(req, res) => {
    try {
        // Gather db data 
        const dbPokemons = await dbGetAllPokemons();
        // gather API data
        const endpointAll = "https://pokeapi.co/api/v2/pokemon/?limit=60";
        const apiResultAll =  await axios(endpointAll);
        const arrPokemons = apiResultAll.data.results;
        const arrResult = [];
        for (let i = 0; i < arrPokemons.length; i++) {
            const endpoint = "https://pokeapi.co/api/v2/pokemon/";
            const apiResult = await axios(endpoint + arrPokemons[i].name.toLowerCase());
            const obj = {
                id: apiResult.data.id,
                name: apiResult.data.name,
                image: apiResult.data.sprites.other.home.front_shiny,
                health: apiResult.data.stats[0].base_stat,
                attack: apiResult.data.stats[1].base_stat,
                defense: apiResult.data.stats[2].base_stat,
                speed: apiResult.data.stats[5].base_stat,
                height: apiResult.data.height,
                weight: apiResult.data.weight,
                Types: apiResult.data.types.map((type) => type.type.name),
                source: 'api'
            }
            arrResult.push(obj);
        }
        // Consolidate data from db and api
        const arrResultAll = [...dbPokemons.arrPokemons, ...arrResult];
        res.status(200).json(arrResultAll);
    } catch(error) {
        res.status(501).send(error.message);
    }
}  

module.exports = getAllPokemons; 