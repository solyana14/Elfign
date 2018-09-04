'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    body: DataTypes.STRING,
    title: DataTypes.STRING,
  }, {});
  Review.associate = (models) => {
    // associations can be defined here
    Review.hasMany(models.Comment)
    Review.belongsTo(models.Restaurant)
    Review.belongsTo(models.User,{as: 'Reviewer', foreignKey: 'UserId'})
  };
  return Review;
};