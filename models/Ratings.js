'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define('Ratings', {
    wifi: DataTypes.FLOAT,
    cleanliness: DataTypes.FLOAT,
    foodQuality: DataTypes.FLOAT,
    service: DataTypes.FLOAT,
    location: DataTypes.FLOAT,
    parking: DataTypes.FLOAT
  }, {});
  Ratings.associate = function(models) {
    // associations can be defined here
    //Review.belongsTo(models.Restaurant,{onDelete: 'CASCADE'})
   // Ratings.belongsTo(models.Review)
    Ratings.hasOne(models.Review)
    //Address.belongsTo(Customers, {foreignKey: 'fk_customerid', targetKey: 'uuid'});
  };
  return Ratings;
};