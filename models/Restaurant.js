'use strict';
module.exports = (sequelize, DataTypes) => {
  var Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    webSite: DataTypes.STRING
    //priceRange: DataTypes.ARRAY(sequelize.DECIMAL)
  }, {});
  /* add a m-n rln bln Restaurant and Cusine
     through a RestaurantCusine join table
     -RestaurantId and CusineId, foreign keys referencing both tables (users and groups)
  */
  Restaurant.associate = function(models) {
    Restaurant.hasMany(models.Review )
    Restaurant.belongsToMany(models.User,{through: 'UserRestaurant',  foreignKey: 'RestaurantId',otherKey: 'UserId'})
    Restaurant.belongsToMany(models.Cusine, {
      through: 'RestaurantCusine',
      foreignKey: 'RestaurantId',
      otherKey: 'CusineId'
    });
    //Restaurant.hasOne(models.Location)
    Restaurant.belongsTo(models.Location)
  };
  return Restaurant;
};