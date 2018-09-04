'use strict';
module.exports = (sequelize, DataTypes) => {
  var Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    webSite: DataTypes.STRING
    //priceRange: DataTypes.ARRAY(sequelize.DECIMAL)
  }, {});
  Restaurant.associate = function(models) {
    Restaurant.hasMany(models.Review ,{onDelete: 'CASCADE'})
    Restaurant.belongsToMany(models.User,{through: 'UserRestaurant',  foreignKey: 'RestaurantId'})
  };
  return Restaurant;
};