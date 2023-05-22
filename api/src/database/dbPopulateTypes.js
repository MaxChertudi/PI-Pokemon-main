const axios = require('axios');
const { Type } = require('../db.js');

const dbPopulateTypes = async () => {
    try {
        const endpoint = 'https://pokeapi.co/api/v2/type';
        const result =  await axios(endpoint);
        const { results } = result.data;

        // Load Type table with API results
        for(i=0; i<results.length; i++) {
            const addedType = await Type.create({name: results[i].name});
        }  
    } catch (error) { 
        throw new Error(error.message);
    }
 };
  
 module.exports = dbPopulateTypes;