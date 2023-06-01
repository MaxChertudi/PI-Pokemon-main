const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement : true,
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING
    },
    health: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.FLOAT
    },
    weight: {
      type: DataTypes.FLOAT
    },
  },
  { timestamps: false }
  );
};
