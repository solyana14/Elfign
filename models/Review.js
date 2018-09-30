'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    body: DataTypes.STRING,
    title: DataTypes.STRING,
    //** add  paranoid: true;a deleted record (table row) will not be returned in future queries  */
  }, {});
  Review.associate = (models) => {
    // associations can be defined here
    //Review.hasMany(models.Comment)
    //Customers.hasOne(Address, {foreignKey: 'fk_customerid', targetKey: 'uuid'});
   // Review.hasOne(models.Ratings);
    Review.belongsTo(models.Ratings)
    Review.belongsTo(models.Restaurant,{onDelete: 'CASCADE'})
    Review.belongsTo(models.User,{as: 'Reviewer', foreignKey: 'UserId',onDelete: 'CASCADE'})
  };
  return Review;
};