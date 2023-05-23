const { Pokemon, Type } = require('../db.js');

const dbGetAllPokemons = async () => {
    //const dbRequest = await Pokemon.findAll();
    const dbRequest = await Pokemon.findAll({ include: [{ model : Type }] });
    if (dbRequest) {
        // Find associated types in db
        let obj = {};
        //console.log(dbRequest);
        //const types = await dbRequest.getTypes();
        
        // extract type names from result
        //const typeNames = types.map((type) => type.dataValues.name);
        //const objTypeNames = { Type: typeNames };

        // Merge pokemon data with associated Types 
        //const obj = {...dbRequest.dataValues, ...objTypeNames, Source: 'db'};
        
        //arrPokemons = dbRequest.map(pokemon => pokemon.dataValues);
        arrPokemons = dbRequest.map((pokemon) => {
               return {...pokemon.dataValues, 
                        Types: pokemon.dataValues.Types.map(type => type.name),
                        Source : 'db'};
            } );

        console.log("\n\narrPokemons :", arrPokemons);
        // delete arrPokemons['Types'];
        // arrPokemons.Types = arrPokemons.Types2;
        // delete arrPokemons['Types2'];
        
        //arrPokemons2 = arrPokemons.map(pok => pok.Types.map(type => type.name));
        //console.log("\n\narrPokemons 2:", arrPokemons);
        //obj = {...arrPokemons, ...source};
        console.log("obj:",obj);
        return {arrPokemons};
    } else  
        return null;
}

module.exports = dbGetAllPokemons;