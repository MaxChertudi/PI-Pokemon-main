const { Pokemon } = require('../db.js');

const dbGetPokemon = async (p_id, p_name) => {
    try {
        let obj = null;
        if (!p_id && !p_name)
            return 'Paramters missing';
        else {
            if (p_id !== null) { // was ID passed as parameter?
                //let bd = await Pokemon.findByPk(p_id);
                let db = await Pokemon.findByPk(p_id);
                if (db) {
                    obj = { 
                        id: db.dataValues.id,
                        name: db.dataValues.name,
                        image: db.dataValues.image,
                        health: db.dataValues.health,
                        attack: db.dataValues.attack,
                        defense: db.dataValues.defense,
                        speed: db.dataValues.speed, 
                        height: db.dataValues.height,
                        weight: db.dataValues.weight
                    }
                }
            }

            if (p_name !== null) { // search by name
                let SearchName = async (p_name) =>{ 
                    db = await Pokemon.findOne( { where: { name: p_name} } );
                    return db.dataValues;
                }
                let dbSearch = SearchName(p_name);
            }

            console.log("antes del if", obj);
            if (obj) {
                console.log("dentro del if:", obj);
                // Find associated types in db
                const types = await dbSearch.getTypes();
                
                // extract type names from result
                const typeNames = types.map((type) => type.dataValues.name);
                const objTypeNames = { Type: typeNames};
                
                // Merge pokemon data with associated Types 
                const obj = {...dbSearch.dataValues, ...objTypeNames};
                
                return obj;
            } else {
                return 'Not found';
            }
        }
    } catch (error) {
        throw new Error (error.message);
    }
}

const SearchId = async(p_id) =>{
    try {
        db = await Pokemon.findByPk(p_id);
        return db.dataValues;
    } catch (error) {
        return error;
    } 
}
module.exports = dbGetPokemon;