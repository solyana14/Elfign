'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    userName: DataTypes.STRING
  }, {});
  User.associate = (models)=> {
    // associations can be defined here
    User.hasMany(models.Review)//{as: 'MyReviews'}
    //User.hasMany(models.Comment)//{as: 'MyComments'}
    User.belongsToMany(models.Restaurant,{as:'Favourites',through: 'UserRestaurant', foreignKey: 'UserId',otherKey: 'RestaurantId'})
  };
  return User;
};