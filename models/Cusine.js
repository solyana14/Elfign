'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cusine = sequelize.define('Cusine', {
    name: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {});
  Cusine.associate = function(models) {
    // associations can be defined here
    //Cusine.belongsToMany(models.Restaurant,{through:'RestaurantCusine', foreignKey:''})
    //Restaurant.belongsToMany(models.User,{through: 'UserRestaurant',  foreignKey: 'RestaurantId'})
    Cusine.belongsToMany(models.Restaurant, {
      through: 'RestaurantCusine',
      foreignKey: 'CusineId',
      otherKey: 'RestaurantId'
    });
  };
  return Cusine;
};