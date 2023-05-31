const { Pokemon, Type } = require('../db.js');

const postPokemon = async (req, res) => {
    try {
        let { name, image, health, attack, defense, speed, height, weight, Types } = req.body;
        name = name.toLowerCase();

        if (name && image && health && attack && defense && speed && height && weight && Types) {
            // Does a pokemon name exists already?
            const dbSearch = await Pokemon.findOne( { where: { name: name} } );
            if (!dbSearch) {
                const pokemonCreated = await Pokemon.create({ name, image, health, attack, defense, speed, height, weight });

                // Add the relation to its Types
                for (let index = 0; index < Types.length; index++) {
                    let typeObj = await Type.findOne({ where: {name: Types[index]} });
                    if (!typeObj)
                        console.log("post pokemon : type not found", Types[index], typeObj, { where: {name: Types[index]} });
                    await pokemonCreated.addType(typeObj);
                }
                return res.status(200).json(pokemonCreated);
            } else {
                return res.status(401).send('Pokemon already exists');        
            }
        } else
            return res.status(400).send('Missing parameters');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = postPokemon;
