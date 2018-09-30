'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    longitude: DataTypes.DOUBLE,
    lattitude: DataTypes.DOUBLE,
    relativeLocation: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    //Location.belongsTo(models.Restaurant)
    Location.hasOne(models.Restaurant)
  };
  return Location;
};