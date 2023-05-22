const { Pokemon, Type } = require('../db.js');

const postPokemon = async (req, res) => {
    try {
        const { name, image, health, attack, defense, speed, height, weight, type } = req.body;
        if (name && image && health && attack && defense && speed && height && weight) {
            const pokemonCreated = await Pokemon.create({ name, image, health, attack, defense, speed, height, weight });

            // Add the relation to its Types
            for (let index = 0; index < type.length; index++) {
                let typeObj = await Type.findOne({ where: {name: type[index]} });
                if (!typeObj)
                    console.log("post pokemon : type not found", type[index], typeObj, { where: {name: type[index]} });
                await pokemonCreated.addType(typeObj);
            }
            return res.status(200).json(pokemonCreated);
        } else
            return res.status(400).send('Faltan datos');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = postPokemon;
